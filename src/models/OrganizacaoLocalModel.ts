import { Document, Schema, model } from 'mongoose';

export interface IOrganizacaoLocal extends Document {
    orga_id: string;
    loca_id: string;
    oloc_id: string;
}

const organizacaoLocalSchema = new Schema<IOrganizacaoLocal>(
    {
        orga_id: {
            type: String,
            required: [true, 'Informe o identificador da organização'],
            select: true,
        },
        loca_id: {
            type: String,
            required: [true, 'Informe o identificador do local'],
            select: true,
        },
        oloc_id: {
            type: String,
            required: [true, 'Informe o identificador da relação'],
            select: true,
        },
    },
    {
        collection: 'organizacao_local',
    }
);

export const OrganizacaoLocal = model<IOrganizacaoLocal>('OrganizacaoLocal', organizacaoLocalSchema);
