import {Router} from 'express';
import {registerClient, loginClient, updateClientProfile} from '../controllers/clientController';
import {authenticateToken} from '../middlewares/authMiddleware';

const router = Router();

// Rota de cadastro de cliente
router.post('/register', registerClient);

// Rota de login de cliente
router.post('/login', loginClient);

// Rota de atualização de perfil do cliente
router.put('/profile', authenticateToken, updateClientProfile);

export default router;