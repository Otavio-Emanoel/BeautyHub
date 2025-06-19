import { Request, Response } from "express";
import admin from '../config/firebase';
import { create } from "domain";
import { getStorage } from "firebase-admin/storage";

export async function registerAdmin(req: Request, res: Response) {
    const { email, password, name, phone } = req.body;
    try {
        // Cria usuário no Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name,
            phoneNumber: phone
        })
        // Salva os dados do administrador no Firestore
        await admin.firestore().collection('users').doc(userRecord.uid).set({
            name,
            email,
            phone,
            role: 'admin',
            createdAt: new Date().toISOString()
        })

        res.status(201).json({ message: "Administrador cadastrado com sucesso", uid: userRecord.uid });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao cadastrar administrador", details: error.message });
    }
}

export async function createSalon(req: Request, res: Response) {
    const { uid, ...data } = req.body;

    if (!uid) {
        return res.status(400).json({ error: "UID do administrador não fornecido" });
    }

    try {
        // Cria o salão com todos os dados recebidos (inclusive categoria, capacidade, avatar, etc)
        const salonRef = await admin.firestore().collection('salons').add({
            ...data,
            uid,
            createdAt: new Date().toISOString()
        });

        // Atualiza o usuário administrador com o ID do salão
        await admin.firestore().collection('users').doc(uid).update({
            salonId: salonRef.id
        });

        res.status(201).json({ message: "Salão cadastrado com sucesso", salonId: salonRef.id });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao cadastrar salão", details: error.message });
    }
}

export async function registerProfessional(req: Request, res: Response) {
    const { name, email, password, phone, specialty, salonId } = req.body;

    if (!salonId) {
        return res.status(400).json({ error: "ID do salão não fornecido" });
    }

    try {
        // Cria o usuário profissional no Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name
        })

        await admin.firestore().collection('users').doc(userRecord.uid).set({
            uid: userRecord.uid,
            name,
            email,
            phone,
            role: 'professional',
            specialty,
            salonId,
            createdAt: new Date().toISOString()
        })

        // Adiciona referência na coleção professionals
        await admin.firestore().collection('professionals').doc(userRecord.uid).set({
            userId: userRecord.uid,
            salonId,
            name,
            email,
            phone,
            specialty,
            status: "active",
            joinDate: new Date().toISOString()
        });

        res.status(201).json({ message: "Profissional cadastrado com sucesso", uid: userRecord.uid });

    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao cadastrar profissional", details: error.message });
    }
}

export async function updateSalonProfile(req: Request, res: Response) {
    const { salonId, ...data } = req.body;
    if (!salonId) {
        return res.status(400).json({ error: "ID do salão não fornecido" });
    }
    try {
        await admin.firestore().collection('salons').doc(salonId).update(data);
        res.status(200).json({ message: "Perfil do salão atualizado com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao atualizar perfil do salão", details: error.message });
    }
}

export async function dismissProfessional(req: Request, res: Response) {
    const { professionalId } = req.params

    if (!professionalId) {
        return res.status(400).json({ error: "ID do profissional não fornecido" });
    }

    try {
        // Atualiza o status e remove o vínculo com o salão na coleção 'users'
        await admin.firestore().collection('users').doc(professionalId).update({
            status: 'inactive',
            salonId: admin.firestore.FieldValue.delete()
        })

        // Atualiza o status e remove o vínculo na coleção 'professionals'
        await admin.firestore().collection('professionals').doc(professionalId).update({
            status: "inactive",
            salonId: admin.firestore.FieldValue.delete()
        });

        res.status(200).json({ message: "Profissional dispensado com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao dispensar profissional", details: error.message });
    }
}

export async function hireProfessional(req: Request, res: Response) {
    const { salonId, name, email, phone, specialty } = req.body;
    const uid = req.params.professionalId;
    if (!uid) {
        return res.status(400).json({ error: "UID do profissional não fornecido" });
    }

    if (!salonId) {
        return res.status(400).json({ error: "ID do salão não fornecido" });
    }

    try {
        // Atualiza o usuário profissional
        await admin.firestore().collection('users').doc(uid).update({
            role: 'professional',
            name,
            email,
            phone,
            specialty,
            salonId,
            status: 'active',
            updatedAt: new Date().toISOString()
        })

        // Adiciona o profissional na coleção 'professionals'
        await admin.firestore().collection('professionals').doc(uid).set({
            userId: uid,
            salonId,
            name,
            email,
            phone,
            specialty,
            status: "active",
            joinDate: new Date().toISOString()
        });

        res.status(200).json({ message: "Profissional contratado com sucesso", uid });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao contratar profissional", details: error.message });
    }
}

export async function generateSalonReport(req: Request, res: Response) {
    try {
        const { salonId } = req.query;
        if (!salonId) {
            return res.status(400).json({ error: "ID do salão não fornecido" });
        }
        
        const db = admin.firestore();
        const schedulesSnap = await db.collection('schedules').where('salonId', '==', salonId).get();
        const servicesSnap = await db.collection('services').where('salonId', '==', salonId).get();
        const professionalsSnap = await db.collection('professionals').where('salonId', '==', salonId).get();
        const clientsSnap = await db.collection('users').where('role', '==', 'client').where('salonId', '==', salonId).get();
        
        res.status(200).json({
            totalAgendamentos: schedulesSnap.size,
            totalServicos: servicesSnap.size,
            totalProfissionais: professionalsSnap.size,
            totalClientes: clientsSnap.size
        })

    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao gerar relatório", details: error.message });
    }
}

// Pega o perfil do administrador logado
export async function getAdminProfile(req: Request, res: Response) {
    const uid = req.users?.uid;
    if (!uid) return res.status(401).json({ error: "Usuário não autenticado" });
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    if (!userDoc.exists) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.status(200).json({ uid, ...userDoc.data() });
}

export async function uploadAdminProfilePicture(req: any, res: any) {
  const uid = req.users?.uid;
  if (!uid) return res.status(401).json({ error: "Não autenticado" });
  if (!req.file) return res.status(400).json({ error: "Nenhuma imagem enviada" });

  const bucket = getStorage().bucket();
  const fileName = `profile_photos/${uid}_${Date.now()}.jpg`;
  const file = bucket.file(fileName);

  await file.save(req.file.buffer, {
    metadata: { contentType: req.file.mimetype }
  });

  const [url] = await file.getSignedUrl({
    action: "read",
    expires: "03-09-2491"
  });

  // Salva a URL no Firestore
  await admin.firestore().collection("users").doc(uid).update({ avatar: url });

  return res.json({ avatar: url });
}