import {Router} from 'express';
import {registerClient, loginClient} from '../controllers/clientController';

const router = Router();

// Rota de cadastro de cliente
router.post('/register', registerClient);

// Rota de login de cliente
router.post('/login', loginClient);

export default router;