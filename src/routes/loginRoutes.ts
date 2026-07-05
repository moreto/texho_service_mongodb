import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';

const router = Router();

/**
 * @route   POST /api/v1/login
 * @desc    Realizar login com email e senha
 * @access  Public
 */
router.post('/', LoginController.login);

export default router;
