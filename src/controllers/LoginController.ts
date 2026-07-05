import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { usuarioRepository } from '../repositories/UsuarioRepository';

export class LoginController {
    /**
     * Login do usuário com email e senha
     * @route POST /api/v1/login
     * @param {string} email - Email do usuário
     * @param {string} senha - Senha do usuário
     * @returns Usuário autenticado ou erro
     */
    static login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, senha } = req.body;

        // Validação básica
        if (!email || !senha) {
            res.status(400).json({
                success: false,
                message: 'Por favor, forneça email e senha',
            });
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({
                success: false,
                message: 'Email inválido',
            });
            return;
        }

        // Buscar usuário pelo email (sem expor a senha)
        const user = await usuarioRepository.findByEmail(email);
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Email ou senha incorretos',
            });
            return;
        }

        // Verificar a senha (usa bcrypt internamente)
        const isValidPassword = await usuarioRepository.verifyPassword(email, senha);
        if (!isValidPassword) {
            res.status(401).json({
                success: false,
                message: 'Email ou senha incorretos',
            });
            return;
        }

        // Login bem-sucedido
        res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso',
            data: user,
        });
    });
}
