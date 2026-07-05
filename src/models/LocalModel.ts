import { Document, Schema, model } from 'mongoose';

export interface ILocal extends Document {
    loca_nome: string;
    loca_ordem: number;
}

const localSchema = new Schema<ILocal>(
    {
        loca_nome: {
            type: String,
            required: [true, 'Informe o nome do local'],
            select: true,
        },
        loca_ordem: {
            type: Number,
            required: [true, 'Informe a ordem de exibição ou 0'],
            select: true,
        },
    },
    {
        collection: 'local',
    }
);

export const Local = model<ILocal>('Local', localSchema);
