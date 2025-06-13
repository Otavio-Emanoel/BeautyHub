import {Router} from 'express';
import {registerClient, loginClient, updateClientProfile, getClientProfile, uploadProfilePicture} from '../controllers/clientController';
import {authenticateToken} from '../middlewares/authMiddleware';
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// Rota de cadastro de cliente
router.post('/register', registerClient);

// Rota de login de cliente
router.post('/login', loginClient);

// Rota de atualização de perfil do cliente
router.put('/profile', authenticateToken, updateClientProfile);

// Rota de busca de perfil do cliente
router.get('/profile', authenticateToken, getClientProfile);

// Rota de upload de foto de perfil
router.post('/profile/photo', authenticateToken, upload.single('photo'), uploadProfilePicture);

export default router;