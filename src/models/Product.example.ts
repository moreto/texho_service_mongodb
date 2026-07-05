/**
 * EXEMPLO: Como criar um novo Model
 * 
 * Siga este padrão ao criar novos modelos para a aplicação.
 * Este arquivo serve como referência.
 */

import { Document, Schema, model } from 'mongoose';

// 1. Criar Interface TypeScript
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

// 2. Criar Schema Mongoose
const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Nome do produto é obrigatório'],
            trim: true,
            maxlength: [100, 'Nome não pode ter mais de 100 caracteres'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Descrição não pode ter mais de 500 caracteres'],
        },
        price: {
            type: Number,
            required: [true, 'Preço é obrigatório'],
            min: [0, 'Preço não pode ser negativo'],
        },
        stock: {
            type: Number,
            required: [true, 'Estoque é obrigatório'],
            default: 0,
            min: [0, 'Estoque não pode ser negativo'],
        },
        category: {
            type: String,
            required: [true, 'Categoria é obrigatória'],
            enum: ['Eletrônicos', 'Roupas', 'Alimentos', 'Outros'],
        },
    },
    {
        timestamps: true,
    }
);

// 3. Criar e exportar o modelo
export const Product = model<IProduct>('Product', productSchema);

/**
 * PASSO A PASSO para adicionar um novo modelo:
 * 
 * 1. Criar arquivo em src/models/NomeModel.ts
 * 2. Definir Interface estendendo Document
 * 3. Criar Schema com validações
 * 4. Exportar o modelo
 * 5. Criar Controller em src/controllers/NomeController.ts
 * 6. Criar Rotas em src/routes/nomeRoutes.ts
 * 7. Importar rotas em src/server.ts e adicionar em app.use()
 */
