import { Router } from "express";
import { updateProfessionalProfile, updateAvailability, listProfessionalAppointments } from "../controllers/professionalController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Rota de atualização de perfil do profissional
router.put("/profile", authenticateToken, updateProfessionalProfile);

// Rota de atualização de disponibilidade do profissional
router.put("/availability", authenticateToken, updateAvailability);

// Rota para listar agendamentos do profissional
router.get("/schedules", authenticateToken, listProfessionalAppointments);

export default router;