import { Router } from "express";
import { updateProfessionalProfile } from "../controllers/professionalController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Rota de atualização de perfil do profissional
router.put("/profile", authenticateToken, updateProfessionalProfile);

export default router;