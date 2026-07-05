/**
 * String de Utilitários para a aplicação
 * Use este arquivo para funções auxiliares, conversões, validações, etc.
 */

/**
 * Validar se é um email válido
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

/**
 * Gerar um ID único
 */
export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Formatar data ISO para formato brasileiro
 */
export const formatDateBR = (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(date);
};

/**
 * Validar ObjectId do MongoDB
 */
export const isValidObjectId = (id: string): boolean => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};
