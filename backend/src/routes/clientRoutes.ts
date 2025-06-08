import {Router} from 'express';
import {registerClient, loginClient, updateClientProfile, getClientProfile} from '../controllers/clientController';
import {authenticateToken} from '../middlewares/authMiddleware';

const router = Router();

// Rota de cadastro de cliente
router.post('/register', registerClient);

// Rota de login de cliente
router.post('/login', loginClient);

// Rota de atualização de perfil do cliente
router.put('/profile', authenticateToken, updateClientProfile);

// Rota de busca de perfil do cliente
router.get('/profile', authenticateToken, getClientProfile);

export default router;