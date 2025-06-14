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

export async function getSalonDetails(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID do salão não fornecido" });

    try {
        const salonDoc = await admin.firestore().collection('salons').doc(id).get();
        if (!salonDoc.exists) return res.status(404).json({ error: "Salão não encontrado" });
        const salon = { id: salonDoc.id, ...salonDoc.data() };

        // Serviços do salão
        const servicesSnap = await admin.firestore().collection('services').where('salonId', '==', id).where('active', '==', true).get();
        const services = servicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Profissionais do salão
        const professionalsSnap = await admin.firestore().collection('professionals').where('salonId', '==', id).where('status', '==', 'active').get();
        const professionals = professionalsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json({ ...salon, services, professionals });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao buscar salão", details: error.message });
    }
}