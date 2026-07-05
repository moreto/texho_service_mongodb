import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { localRepository } from '../repositories/LocalRepository';

export class LocalController {
    static getAll = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
        const locais = await localRepository.findAll();

        res.status(200).json({
            success: true,
            count: locais.length,
            data: locais,
        });
    });
}
