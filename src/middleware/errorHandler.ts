import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
    err: any,
    // req: Request,
    res: Response,
    // next: NextFunction
): void => {
    const status = err.status || 500;
    const message = err.message || 'Erro interno do servidor';

    console.error(`[${new Date().toISOString()}] Erro:`, err);

    res.status(status).json({
        success: false,
        status,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
