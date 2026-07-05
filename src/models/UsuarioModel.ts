import { Document, Schema, model } from 'mongoose';

export interface IUsuario extends Document {
    usua_uuid: string;
    usua_email: string;
    usua_senha: string;
    usua_criado?: Date;
    usua_atualizado?: Date;
}

const usuarioSchema = new Schema<IUsuario>(
    {
        usua_uuid: {
            type: String,
            required: [true, 'uuid'],
            trim: true,
            maxlength: [100, 'uuid'],
        },
        usua_email: {
            type: String,
            required: [true, 'Por favor, forneça um email'],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Por favor, forneça um email válido',
            ],
        },
        usua_senha: {
            type: String,
            required: [true, 'Por favor, forneça uma senha'],
            minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
            select: true,
        },
    },
    {
        timestamps: {
            createdAt: 'usua_criado',
            updatedAt: 'usua_atualizado',
        },
        collection: 'usuario',
    }
);

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
