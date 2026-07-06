import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { organizacaoLocalRepository } from '../repositories/OrganizacaoLocalRepository';


export class OrganizacaoLocalController {
    static getAll = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
        const locais = await organizacaoLocalRepository.findAll();

        res.status(200).json({
            success: true,
            count: locais.length,
            data: locais,
        });
    });
}
