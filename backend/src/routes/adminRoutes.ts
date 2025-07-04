import { Router } from "express";
import { registerAdmin, createSalon, registerProfessional, updateSalonProfile, dismissProfessional, hireProfessional, generateSalonReport, getAdminProfile, uploadAdminProfilePicture } from "../controllers/adminController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { createService } from "../controllers/serviceController";
import { deleteService } from "../controllers/serviceController";

import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });


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

// Rota para excluir serviço
router.delete("/services/:id", authenticateToken, deleteService);

// Rota para gerar relatório do salão
router.get("/salon/report", authenticateToken, generateSalonReport);

// Rota para obter o perfil do administrador
router.get("/profile", authenticateToken, getAdminProfile);

// Rota para adicionar foto de perfil do administrador
router.post('/profile/photo', authenticateToken, upload.single('photo'), uploadAdminProfilePicture);

export default router;