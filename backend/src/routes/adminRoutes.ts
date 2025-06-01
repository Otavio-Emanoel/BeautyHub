import { Router } from "express";
import { registerAdmin, createSalon, registerProfessional, updateSalonProfile } from "../controllers/adminController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Rota de cadastro de administrador
router.post("/register", registerAdmin);

// Rota de cadastro de salão
router.post("/salon", createSalon);

// Rota de cadastro de profissional
router.post("/professional", registerProfessional);

// Rota de edição de perfil do administrador
router.put("/salon/profile", authenticateToken , updateSalonProfile);

export default router;