import { Request, Response, NextFunction } from "express";
import admin from '../config/firebase';
import { auth } from "../config/firebase";

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ error: "Token de autenticação não fornecido" });
    }
    const token = authHeader.split(' ')[1];
   
    try {
        const decoded = await auth.verifyIdToken(token)
        req.users = { uid: decoded.uid }
        next()
    } catch (error: any) {
        return res.status(403).json({ error: "Token de autenticação inválido", details: error.message });
    }
}
// Typescript dificulta a extensão de Request, então é necessário declarar o módulo 'express-serve-static-core' para adicionar a propriedade 'users'.
declare module 'express-serve-static-core' {
    interface Request {
        users?: { uid: string };
    }
}