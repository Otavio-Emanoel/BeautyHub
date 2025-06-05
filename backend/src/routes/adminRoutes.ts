import { Router } from "express";
import { registerAdmin, createSalon, registerProfessional, updateSalonProfile, dismissProfessional, hireProfessional } from "../controllers/adminController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { createService } from "../controllers/serviceController";

const router = Router();

// Rota de cadastro de administrador
router.post("/register", registerAdmin);

// Rota de cadastro de salão
router.post("/salon", createSalon);

// Rota de cadastro de profissional
router.post("/professional", registerProfessional);

// Rota de demissão de profissional
router.patch("/professional/:professionalId/dismiss", authenticateToken, dismissProfessional);

// Rota de contratação de profissional
router.post("/professional/:professionalId/hire", authenticateToken, hireProfessional)

// Rota de edição de perfil do administrador
router.put("/salon/profile", authenticateToken , updateSalonProfile);

// Rota de criação de serviço
router.post("/services", authenticateToken, createService);

export default router;