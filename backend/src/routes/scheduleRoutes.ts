import { Router } from "express";
import { createAppointment, listAllAppointments, listClientAppointments } from "../controllers/scheduleController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { cancelAppointment, finishAppointment } from "../controllers/scheduleController";

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

export default router;