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