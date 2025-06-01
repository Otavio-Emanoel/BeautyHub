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