import { Router } from "express";
import { createAppointment } from "../controllers/scheduleController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Rota para criar agendamento
router.post("/appointment", authenticateToken, createAppointment);

export default router;