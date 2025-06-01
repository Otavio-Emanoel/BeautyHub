import { Router } from "express";
import { createAppointment, listAllAppointments, listClientAppointments } from "../controllers/scheduleController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Rota para criar agendamento
router.post("/appointment", authenticateToken, createAppointment);

// Rota para listar agendamentos do cliente
router.get("/client", authenticateToken, listClientAppointments)

// Rota para listar todos os agendamentos (apenas para administradores)
router.get("/", authenticateToken, listAllAppointments)

export default router;