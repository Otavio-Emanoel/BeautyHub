import { Request, Response } from "express";
import admin from '../config/firebase';

export async function updateProfessionalProfile(req: Request, res: Response) {
    const uid = req.users?.uid
    const data = req.body;

    if (!uid) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }

    try {
        await admin.firestore().collection('users').doc(uid).update(data);
        await admin.firestore().collection('professionals').doc(uid).update(data);

        res.status(200).json({ message: "Perfil atualizado com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao atualizar perfil", details: error.message });
    }
}

export async function updateAvailability(req: Request, res: Response) {
    const uid = req.users?.uid
    const { availability } = req.body;
    
    if (!uid) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    if (!availability) {
        return res.status(400).json({ error: "Disponibilidade não fornecida" });
    }

    try {
        await admin.firestore().collection('users').doc(uid).update({ availability });
        await admin.firestore().collection('professionals').doc(uid).update({ availability });

        res.status(200).json({ message: "Disponibilidade atualizada com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao atualizar disponibilidade", details: error.message });
    }
}

export async function listProfessionalAppointments(req: Request, res: Response) {
    const professionalId = req.users?.uid;

    if (!professionalId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }

    try {
        const snapshot = await admin.firestore()
            .collection('appointments')
            .where('professionalId', '==', professionalId)
            .orderBy('date', 'asc')
            .get();

        const appointments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json({appointments});
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao listar agendamentos", details: error.message });
    }
}

export async function updateServiceDuration(req: Request, res: Response) {
    const professionalId = req.users?.uid;
    const { serviceId } = req.params;
    const { duration } = req.body;

    if (!professionalId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    if (!serviceId || !duration) {
        return res.status(400).json({ error: "ID do serviço ou duração não fornecidos" });
    }

    try {
        const serviceRef = admin.firestore().collection('services').doc(serviceId);
        const serviceDoc = await serviceRef.get();

        if (!serviceDoc.exists) {
            return res.status(404).json({ error: "Serviço não encontrado" });
        }

        const service = serviceDoc.data();

        const userDoc = await admin.firestore().collection('users').doc(professionalId).get();
        const userData = userDoc.data();

        if (!userData || userData.role !== "professional" || userData.salonId !== service?.salonId) {
            return res.status(403).json({ error: "Você não tem permissão para editar este serviço" });
        }

        await serviceRef.update({ duration });

        res.status(200).json({ message: "Duração do serviço atualizada com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao atualizar duração do serviço", details: error.message });
    }
}

export async function registerProfessional(req: Request, res: Response) {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: "Dados obrigatórios não fornecidos" });
    }

    try {
        // Criação do usuário no Firebase Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name,
            phoneNumber: phone
        });

        // Dados do profissional
        const professionalData = {
            uid: userRecord.uid,
            name,
            email,
            phone,
            role: "professional",
            createdAt: new Date(),
            salonId: null // autônomo inicialmente
        };

   
        await admin.firestore().collection('users').doc(userRecord.uid).set(professionalData);
        await admin.firestore().collection('professionals').doc(userRecord.uid).set(professionalData);

        res.status(201).json({ message: "Profissional cadastrado com sucesso", uid: userRecord.uid });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao cadastrar profissional", details: error.message });
    }
}