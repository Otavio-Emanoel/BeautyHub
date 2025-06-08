import { Request, Response } from "express";
import admin, { auth, firestore } from '../config/firebase';

// Cadastro de cliente
export async function registerClient(req: Request, res: Response) {
    const { email, password, name, phone } = req.body;
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name,
            phoneNumber: phone
        });

        // Salva os dados do cliente no Firestore
        await admin.firestore().collection('users').doc(userRecord.uid).set({
            name,
            email,
            phone,
            role: 'client',
            createdAt: new Date().toISOString()
        });
        res.status(201).json({ message: "Cliente cadastrado com sucesso", uid: userRecord.uid });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao cadastrar cliente", details: error.message });
    }
}

// Login de cliente
export async function loginClient(req: Request, res: Response) {
    // É importante notar que o Firebase Auth não possui uma rota de login direta como em sistemas tradicionais.
    // O login é feito através do SDK do Firebase no frontend, que retorna um token JWT.
    return res.status(501).json({ error: "Login de cliente não implementado" });
}

export async function updateClientProfile(req: Request, res: Response) {
    const uid = req.users?.uid;
    const data = req.body;
    // Verifica se o usuário está autenticado
    if (!uid) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }

    try {
        // Atualiza apenas os campos enviados
        await admin.firestore().collection('users').doc(uid).update(data);
        res.status(200).json({ message: "Perfil atualizado com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao atualizar perfil", details: error.message });
    }
}

export async function getClientProfile(req: Request, res: Response) {
    const uid = req.users?.uid;
    if (!uid) return res.status(401).json({ error: "Usuário não autenticado" });
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    if (!userDoc.exists) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.status(200).json(userDoc.data());
}