import { Request, Response } from "express";
import admin from '../config/firebase';
import { create } from "domain";

export async function registerAdmin(req: Request, res: Response) {
    const { email, password, name } = req.body;
    try {
        // Cria usuário no Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name
        })
        // Salva os dados do administrador no Firestore
        await admin.firestore().collection('users').doc(userRecord.uid).set({
            name,
            email,
            role: 'admin',
            createdAt: new Date().toISOString()
        })

        res.status(201).json({ message: "Administrador cadastrado com sucesso", uid: userRecord.uid });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao cadastrar administrador", details: error.message });
    }
}

export async function createSalon(req: Request, res: Response) {
    const { name, address, phone, uid } = req.body;

    if (!uid) {
        return res.status(400).json({ error: "UID do administrador não fornecido" });
    }

    try {
        // Cria o salão
        const salonRef = await admin.firestore().collection('salons').add({
            name,
            address,
            phone,
            uid,
            createdAt: new Date().toISOString()
        })

        // Atualiza o usuário administrador com o ID do salão
        await admin.firestore().collection('users').doc(uid).update({
            salonId: salonRef.id
        })

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