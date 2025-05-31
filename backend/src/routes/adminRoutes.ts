import { Router } from "express";
import { registerAdmin } from "../controllers/adminController";

const router = Router();

// Rota de cadastro de administrador
router.post("/register", registerAdmin);

export default router;