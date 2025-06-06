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
            note,
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

export async function cancelAppointment(req: Request, res: Response) {
    const {id} = req.params;
    const userId = req.users?.uid;

    if (!id || !userId) {
        return res.status(400).json({ error: "ID do agendamento ou usuário não fornecido" });
    }

    try {
        const appointmentRef = admin.firestore().collection('appointments').doc(id);
        const appointmentDoc = await appointmentRef.get()

        if (!appointmentDoc.exists) {
            return res.status(404).json({ error: "Agendamento não encontrado" });
        }

        const appointment = appointmentDoc.data();

        if (!appointment) {
            return res.status(404).json({ error: "Dados do agendamento não encontrados" });
        }

        let isAdmin = false;
        if (appointment.salonId) {
            const userDoc = await admin.firestore().collection('users').doc(userId).get();
            const userData = userDoc.data();
            if (userData && userData.role === 'admin' && userData.salonId === appointment.salonId) {
                isAdmin = true;
            }
        }

        if (
            appointment.clientId !== userId &&
            appointment.professionalId !== userId &&
            !isAdmin
        ) {
            return res.status(403).json({ error: "Você não tem permissão para cancelar este agendamento" });
        }

        await appointmentRef.update({ status: "cancelled", canceledAt: new Date().toISOString() });

        res.status(200).json({ message: "Agendamento cancelado com sucesso" });

    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao cancelar agendamento", details: error.message });
    }
}

export async function finishAppointment(req: Request, res: Response) {
    const {id} = req.params;
    const userId = req.users?.uid;

    if (!id || !userId) {
        return res.status(400).json({ error: "ID do agendamento ou usuário não fornecido" });
    }

    try {
        const appointmentRef = admin.firestore().collection('appointments').doc(id);
        const appointmentDoc = await appointmentRef.get();

        if (!appointmentDoc.exists) {
            return res.status(404).json({ error: "Agendamento não encontrado" });
        }

        const appointment = appointmentDoc.data();

        let isAdmin = false;
        if (appointment?.salonId) {
            const userDoc = await admin.firestore().collection('users').doc(userId).get();
            const userData = userDoc.data();
            if (userData && userData.role === 'admin' && userData.salonId === appointment.salonId) {
                isAdmin = true;
            }
        }

        if (
            appointment?.professionalId !== userId &&
            !isAdmin
        ) {
            return res.status(403).json({ error: "Você não tem permissão para concluir este agendamento" });
        }

        await appointmentRef.update({ status: "completed", finishedAt: new Date().toISOString() });

        res.status(200).json({ message: "Agendamento concluído com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao finalizar agendamento", details: error.message });
    }
}

export async function updateAppointmentStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status, newDate, newTime, reason } = req.body;
    const userId = req.users?.uid;

    if (!id || !status) {
        return res.status(400).json({ error: "ID do agendamento e novo status são obrigatórios" });
    }

    try {
        const appointmentRef = admin.firestore().collection('appointments').doc(id);
        const appointmentDoc = await appointmentRef.get();

        if (!appointmentDoc.exists) {
            return res.status(404).json({ error: "Agendamento não encontrado" });
        }

        const appointment = appointmentDoc.data();

        if (appointment?.professionalId !== userId) {
            return res.status(403).json({ error: "Você não tem permissão para alterar este agendamento" });
        }

        const updateData: any = { status };

        if (status === "rescheduled") {
            if (!newDate || !newTime) {
                return res.status(400).json({ error: "Nova data e hora são obrigatórias para remarcar" });
            }
            updateData.date = newDate;
            updateData.time = newTime;
        }

        if (status === "rejected" && reason) {
            updateData.rejectionReason = reason; 
        }

        await appointmentRef.update(updateData);

        res.status(200).json({ message: "Status do agendamento atualizado com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao atualizar status do agendamento", details: error.message });
    }
}