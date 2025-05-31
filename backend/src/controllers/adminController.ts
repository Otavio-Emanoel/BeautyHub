import { Request, Response } from "express";
import admin from '../config/firebase';

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