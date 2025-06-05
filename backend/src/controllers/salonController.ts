import { Request, Response } from "express";
import admin from '../config/firebase';

export async function listSalons(req: Request, res: Response) {
    const { name, category, city } = req.query;

    try {
        let query: FirebaseFirestore.Query = admin.firestore().collection('salons');

        if (name) {
            query = query.where('name', '>=', name).where('name', '<=', name + '\uf8ff');
        }
        if (category) {
            query = query.where('category', '==', category);
        }
        if (city) {
            query = query.where('city', '==', city);
        }

        const snapshot = await query.get();
        const salons = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        res.status(200).json({ salons });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao listar salões", details: error.message });
    }
}