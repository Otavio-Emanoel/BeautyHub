import { Request, Response } from "express";
import admin from '../config/firebase';

// Cadastro de serviço (Admin)
export async function createService(req: Request, res: Response) {
    const { name, description, price, duration, salonId, category } = req.body;

    if (!name || !price || !duration || !salonId || !category) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const serviceRef = await admin.firestore().collection('services').add({
            salonId,
            name,
            description: description,
            duration,
            price,
            category,
            active: true,
            createdAt: new Date().toISOString()
        })

        res.status(201).json({ message: "Serviço criado com sucesso", serviceId: serviceRef.id });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao cadastrar serviço", details: error.message });
    }
}

// Listar serviços de um salão específico
export async function listSalonServices(req: Request, res: Response) {
    const salonId = req.params.id;

    if (!salonId) {
        return res.status(400).json({ error: "ID do salão não fornecido" });
    }

    try {
        const snapshot = await admin.firestore()
            .collection('services')
            .where('salonId', '==', salonId)
            .where('active', '==', true)
            .get();

        const services = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        res.status(200).json({ services });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao listar serviços", details: error.message });
    }
}