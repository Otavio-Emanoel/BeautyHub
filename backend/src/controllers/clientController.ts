import { Request, Response } from "express";
import admin, { auth, firestore } from '../config/firebase';

// Cadastro de cliente
export async function registerClient(req: Request, res: Response) {
    const { email, password, name } = req.body;
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name
        });

        // Salva os dados do cliente no Firestore
        await admin.firestore().collection('users').doc(userRecord.uid).set({
            name,
            email,
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