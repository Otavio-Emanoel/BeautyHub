import { Router } from 'express';
import { loginWithGoogle } from '../controllers/authController';

const router = Router();

// Rota de login com Google
router.post('/google', loginWithGoogle);

export default router;
