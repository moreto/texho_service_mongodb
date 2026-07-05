import { UpdateQuery } from 'mongoose';
import { IUsuario, Usuario } from '../models/UsuarioModel';
import { PasswordService } from '../utils/PasswordService';
import { Repository } from './Repository';

export class UsuarioRepository extends Repository<IUsuario> {
    constructor() {
        super(Usuario);
    }

    public async findAll() {
        return this.find();
    }

    public findByEmail(email: string) {
        return this.model.findOne({ usua_email: email }).select('-usua_senha');
    }

    public findByEmailWithPassword(email: string) {
        return this.model.findOne({ usua_email: email });
    }

    public findByUuid(uuid: string) {
        return this.model.findOne({ usua_uuid: uuid }).select('-usua_senha');
    }

    public async createUser(data: {
        usua_uuid: string;
        usua_email: string;
        usua_senha: string;
    }) {
        const hashedPassword = await PasswordService.hashPassword(data.usua_senha);
        return this.create({
            ...data,
            usua_senha: hashedPassword,
        } as any);
    }

    public async updateByUuid(
        uuid: string,
        update: UpdateQuery<IUsuario>
    ) {
        const updateData = { ...update };

        // Hash password se estiver sendo atualizado
        if (updateData.usua_senha && typeof updateData.usua_senha === 'string') {
            updateData.usua_senha = await PasswordService.hashPassword(updateData.usua_senha);
        }

        return this.updateOne({ usua_uuid: uuid }, updateData);
    }

    public async deleteByUuid(uuid: string) {
        return this.deleteOne({ usua_uuid: uuid });
    }

    /**
     * Verificar se a senha corresponde ao hash armazenado
     * @param email Email do usuário
     * @param password Senha em texto plano
     * @returns Promise<boolean> true se a senha estiver correta
     */
    public async verifyPassword(email: string, password: string): Promise<boolean> {
        const user = await this.model.findOne({ usua_email: email });
        if (!user) {
            return false;
        }
        return PasswordService.verifyPassword(password, user.usua_senha);
    }
}

export const usuarioRepository = new UsuarioRepository();
