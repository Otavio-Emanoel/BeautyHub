import { Router } from "express";
import { updateProfessionalProfile, updateAvailability } from "../controllers/professionalController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Rota de atualização de perfil do profissional
router.put("/profile", authenticateToken, updateProfessionalProfile);

// Rota de atualização de disponibilidade do profissional
router.put("/availability", authenticateToken, updateAvailability);

export default router;