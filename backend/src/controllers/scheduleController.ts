import { Request, Response } from 'express';
import admin from '../config/firebase';

export async function createAppointment(req: Request, res: Response ) {
    const { salonId, professionalId, date, time, note } = req.body;
    const clientId = req.users?.uid;
    
    if (!salonId || !professionalId || !date || !time) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const appointmentRef = await admin.firestore().collection('appointments').add({
            salonId,
            professionalId,
            clientId,
            date,
            time,
            notes: note,
            status: 'pending',
            createdAt: new Date().toISOString()
        });

        res.status(201).json({ message: "Agendamento criado com sucesso", appointmentId: appointmentRef.id });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao criar agendamento", details: error.message });
    }
}

export async function listClientAppointments(req: Request, res: Response) {
    const clientId = req.users?.uid

    if (!clientId) {
        return res.status(400).json({ error: "ID do cliente não fornecido" });
    }

    try {
        const snapshot = await admin.firestore().collection('appointments')
            .where('clientId', '==', clientId)
            .orderBy('date', 'asc')
            .get();

        const appointments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        res.status(200).json(appointments);
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao listar agendamentos", details: error.message });
    }
}

export async function listAllAppointments(req: Request, res: Response) {
    const adminUid = req.users?.uid;

    if (!adminUid) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }

    try {
        // Busca o salonId do admin autenticado
        const adminDoc = await admin.firestore().collection('users').doc(adminUid).get();
        const adminData = adminDoc.data();

        if (!adminData || !adminData.salonId) {
            return res.status(403).json({ error: "Admin não vinculado a nenhum salão" });
        }

        const salonId = adminData.salonId;

        // Busca os agendamentos do salão do admin autenticado
        const snapshot = await admin.firestore()
            .collection('appointments')
            .where('salonId', '==', salonId)
            .orderBy('date', 'desc')
            .get();

        const appointments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json({ appointments });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao listar agendamentos", details: error.message });
    }
}