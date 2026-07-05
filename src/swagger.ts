export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'TEXHO Service API',
        version: '1.0.0',
        description: 'API de gerenciamento de usuários para o projeto TEXHO Service',
    },
    servers: [
        {
            url: 'http://localhost:3000/api/v1',
            description: 'Servidor local',
        },
    ],
    paths: {
        '/health': {
            get: {
                summary: 'Health check',
                description: 'Verifica se o servidor está operacional',
                responses: {
                    '200': {
                        description: 'Servidor operacional',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean' },
                                        message: { type: 'string' },
                                        timestamp: { type: 'string', format: 'date-time' },
                                        environment: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/usuario': {
            get: {
                summary: 'Listar usuários',
                responses: {
                    '200': {
                        description: 'Lista de usuários',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean' },
                                        count: { type: 'integer' },
                                        data: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/Usuario' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Criar usuário',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string', format: 'email' },
                                    senha: { type: 'string' },
                                },
                                required: ['email', 'senha'],
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Usuário criado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean' },
                                        message: { type: 'string' },
                                        data: { $ref: '#/components/schemas/Usuario' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/usuario/email/{email}': {
            get: {
                summary: 'Buscar usuário por email',
                parameters: [
                    {
                        name: 'email',
                        in: 'path',
                        required: true,
                        schema: { type: 'string', format: 'email' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Usuário encontrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/UsuarioResponse' },
                            },
                        },
                    },
                    '404': {
                        description: 'Usuário não encontrado',
                    },
                },
            },
        },
        '/usuario/uuid/{uuid}': {
            get: {
                summary: 'Buscar usuário por UUID',
                parameters: [
                    {
                        name: 'uuid',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Usuário encontrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/UsuarioResponse' },
                            },
                        },
                    },
                    '404': {
                        description: 'Usuário não encontrado',
                    },
                },
            },
        },
        '/usuario/{uuid}': {
            put: {
                summary: 'Atualizar usuário por UUID',
                parameters: [
                    {
                        name: 'uuid',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string', format: 'email' },
                                    senha: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Usuário atualizado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/UsuarioResponse' },
                            },
                        },
                    },
                    '404': { description: 'Usuário não encontrado' },
                },
            },
            delete: {
                summary: 'Deletar usuário por UUID',
                parameters: [
                    {
                        name: 'uuid',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    '200': { description: 'Usuário deletado com sucesso' },
                    '404': { description: 'Usuário não encontrado' },
                },
            },
        },
    },
    components: {
        schemas: {
            Usuario: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    usua_uuid: { type: 'string' },
                    usua_email: { type: 'string', format: 'email' },
                    usua_atualizado: { type: 'string', format: 'date-time' },
                },
            },
            UsuarioResponse: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/Usuario' },
                },
            },
        },
    },
};
