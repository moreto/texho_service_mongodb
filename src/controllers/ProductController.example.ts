/**
 * EXEMPLO: Como criar um novo Controller
 * 
 * Siga este padrão ao criar novos controllers para a aplicação.
 * Este arquivo serve como referência.
 */

import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { Product } from '../models/Product.example';

export class ProductController {
    // Criar novo produto
    static create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { name, description, price, stock, category } = req.body;

        // Validação básica
        if (!name || !price || !category) {
            res.status(400).json({
                success: false,
                message: 'Por favor, forneça nome, preço e categoria',
            });
            return;
        }

        // Criar novo produto
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            category,
        });

        res.status(201).json({
            success: true,
            message: 'Produto criado com sucesso',
            data: product,
        });
    });

    // Obter todos os produtos
    static getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { category, minPrice, maxPrice } = req.query;

        // Construir filtro
        const filter: any = {};
        if (category) filter.category = category;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const products = await Product.find(filter);

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    });

    // Obter produto por ID
    static getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Produto não encontrado',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    });

    // Atualizar produto
    static update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Produto não encontrado',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Produto atualizado com sucesso',
            data: product,
        });
    });

    // Deletar produto
    static delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Produto não encontrado',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Produto deletado com sucesso',
        });
    });
}

/**
 * PASSO A PASSO para criar um Controller:
 * 
 * 1. Importar a Interface e Model
 * 2. Importar Request, Response do express
 * 3. Importar asyncHandler do middleware
 * 4. Criar classe com métodos estáticos para cada operação
 * 5. Usar asyncHandler para capturar erros automaticamente
 * 6. Sempre retornar JSON com { success, message, data?, error? }
 * 7. Implementar todas as operações CRUD (Create, Read, Update, Delete)
 */
