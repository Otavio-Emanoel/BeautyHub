import { Router } from "express";
import { updateProfessionalProfile, updateAvailability, listProfessionalAppointments, updateServiceDuration, registerProfessional, getProfessionalProfile, uploadProfessionalProfilePicture } from "../controllers/professionalController";
import { authenticateToken } from "../middlewares/authMiddleware";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// Rota de atualização de perfil do profissional
router.put("/profile", authenticateToken, updateProfessionalProfile);

// Rota de atualização de disponibilidade do profissional
router.put("/availability", authenticateToken, updateAvailability);

// Rota para listar agendamentos do profissional
router.get("/schedules", authenticateToken, listProfessionalAppointments);

// Rota para definir tempo médio de por serviço
router.patch("/service/:serviceId/duration", authenticateToken, updateServiceDuration);

// Rota de cadastro de profissional autônomo
router.post('/register', registerProfessional);

// Rota para obter o perfil do profissional
router.get('/profile', authenticateToken, getProfessionalProfile);

// Rota para editar a foto de perfil do profissional
router.post('/profile/photo', authenticateToken, upload.single('photo'), uploadProfessionalProfilePicture);

export default router;