import { ILocal, Local } from '../models/LocalModel';
import { Repository } from './Repository';

export class LocalRepository extends Repository<ILocal> {
    constructor() {
        super(Local);
    }

    public async findAll() {
        return this.model.find().sort({ loca_nome: 1 });
    }

}

export const localRepository = new LocalRepository();
