import { Router } from "express";
import { registerAdmin, createSalon } from "../controllers/adminController";

const router = Router();

// Rota de cadastro de administrador
router.post("/register", registerAdmin);

// Rota de cadastro de salão
router.post("/salon", createSalon);

export default router;