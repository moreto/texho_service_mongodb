import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../middleware/errorHandler';
import { usuarioRepository } from '../repositories/UsuarioRepository';

export class UsuarioController {
    static getAll = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
        const usuarios = await usuarioRepository.findAll();

        res.status(200).json({
            success: true,
            count: usuarios.length,
            data: usuarios,
        });
    });

    static getByEmail = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email } = req.params;

        const user = await usuarioRepository.findByEmail(email);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    });

    static getByUuid = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { uuid } = req.params;

        const user = await usuarioRepository.findByUuid(uuid);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    });

    static create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, senha } = req.body;

        // Validação básica
        if (!email || !senha) {
            res.status(400).json({
                success: false,
                message: 'Por favor, forneça email e senha',
            });
            return;
        }

        // Verificar se usuário já existe
        const existingUser = await usuarioRepository.findByEmail(email);
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: 'Email já está cadastrado',
            });
            return;
        }

        // Criar novo usuário
        const user = await usuarioRepository.createUser({
            usua_uuid: uuidv4(),
            usua_email: email,
            usua_senha: senha,
        });

        const userResponse = user.toObject();

        res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            data: userResponse,
        });
    });

    static update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { uuid } = req.params;
        const { email, senha } = req.body;

        const updateData: Record<string, string> = {};
        if (email) updateData.usua_email = email;
        if (senha) updateData.usua_senha = senha;

        if (Object.keys(updateData).length === 0) {
            res.status(400).json({
                success: false,
                message: 'Por favor, forneça email ou senha para atualizar',
            });
            return;
        }

        const user = await usuarioRepository.updateByUuid(uuid, updateData);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Usuário atualizado com sucesso',
            data: user,
        });
    });

    static delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { uuid } = req.params;

        const user = await usuarioRepository.deleteByUuid(uuid);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Usuário deletado com sucesso',
        });
    });
}
