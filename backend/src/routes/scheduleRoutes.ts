import { Router } from "express";
import { createAppointment, listAllAppointments, listClientAppointments } from "../controllers/scheduleController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { cancelAppointment, finishAppointment , updateAppointmentStatus, rateAppointment } from "../controllers/scheduleController";

const router = Router();

// Rota para criar agendamento
router.post("/appointment", authenticateToken, createAppointment);

// Rota para listar agendamentos do cliente
router.get("/client", authenticateToken, listClientAppointments)

// Rota para listar todos os agendamentos (apenas para administradores)
router.get("/", authenticateToken, listAllAppointments)

// Rota para cancelar agendamento
router.delete("/appointment/:id", authenticateToken, cancelAppointment);

// rota para concluir agendamento
router.patch("/appointment/:id/finish", authenticateToken, finishAppointment);

// Rota para confirmar, remarcar ou reagendar agendamento
router.patch("/appointment/:id/status", authenticateToken, updateAppointmentStatus);

// Rota para avaliar atendimento
router.post("/appointment/:id/rate", authenticateToken, rateAppointment);

export default router;