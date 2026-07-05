import bcrypt from 'bcrypt';

export class PasswordService {
    private static readonly SALT_ROUNDS = 12;

    /**
     * Hash uma senha usando Bcrypt
     * @param password Senha em texto plano
     * @returns Promise com a senha hasheada
     */
    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }

    /**
     * Verificar se uma senha corresponde ao hash
     * @param password Senha em texto plano
     * @param hash Hash da senha
     * @returns Promise com booleano indicando correspondência
     */
    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        if (!hash || typeof hash !== 'string') {
            console.error('Hash de senha inválido ou ausente para verificação.');
            return false;
        }

        try {
            return await bcrypt.compare(password, hash);
        } catch (error) {
            console.error('Erro ao verificar senha:', error);
            return false;
        }
    }
}
