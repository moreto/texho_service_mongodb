import { IOrganizacaoLocal, OrganizacaoLocal } from '../models/OrganizacaoLocalModel';
import { Repository } from './Repository';

export class OrganizacaoLocalRepository extends Repository<IOrganizacaoLocal> {
    constructor() {
        super(OrganizacaoLocal);
    }

    public async findAll() {
        return this.model.find().lean();
    }

}

export const organizacaoLocalRepository = new OrganizacaoLocalRepository();
