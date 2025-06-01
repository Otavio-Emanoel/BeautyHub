import { Router } from "express";
import { registerAdmin, createSalon, registerProfessional } from "../controllers/adminController";

const router = Router();

// Rota de cadastro de administrador
router.post("/register", registerAdmin);

// Rota de cadastro de salão
router.post("/salon", createSalon);

// Rota de cadastro de profissional
router.post("/professional", registerProfessional);

export default router;