"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lojaSchema = void 0;
exports.lojaSchema = {
    openapi: '3.0.0',
    info: {
        title: 'API Loja - EcomX',
        version: '1.0.0',
        description: 'CRUD da entidade Loja com autenticação JWT',
    },
    paths: {
        '/lojas': {
            get: {
                tags: ['Loja'],
                summary: 'Listar todas as lojas',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'Lista de lojas',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Loja' },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ['Loja'],
                summary: 'Criar uma nova loja',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/LojaInput' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Loja criada com sucesso',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Loja' },
                            },
                        },
                    },
                    '400': { description: 'Dados inválidos' },
                },
            },
        },
        '/lojas/{id}': {
            get: {
                tags: ['Loja'],
                summary: 'Buscar loja pelo ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID da loja',
                        required: true,
                        schema: { type: 'string', format: 'uuid' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Loja encontrada',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Loja' },
                            },
                        },
                    },
                    '404': { description: 'Loja não encontrada' },
                },
            },
            put: {
                tags: ['Loja'],
                summary: 'Atualizar loja',
                description: 'Permite que o lojista atualize apenas a própria loja. É necessário um token JWT válido.',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID da loja',
                        required: true,
                        schema: { type: 'string', format: 'uuid' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/LojaInput'
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Loja atualizada',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Loja' },
                            },
                        },
                    },
                    '403': { description: 'Acesso negado. Lojista não autorizado a alterar essa loja.' },
                    '404': { description: 'Loja não encontrada' },
                },
            },
            delete: {
                tags: ['Loja'],
                summary: 'Excluir loja pelo ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID da loja',
                        required: true,
                        schema: { type: 'string', format: 'uuid' },
                    },
                ],
                responses: {
                    '204': { description: 'Loja excluída com sucesso' },
                    '404': { description: 'Loja não encontrada' },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Loja: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    nome: { type: 'string' },
                    descricao: { type: 'string' },
                    idLojista: { type: 'string', format: 'uuid' },
                },
                required: ['id', 'nome', 'descricao', 'idLojista'],
            },
            LojaInput: {
                type: 'object',
                properties: {
                    nome: { type: 'string' },
                    descricao: { type: 'string' },
                },
                required: ['nome', 'descricao',],
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};
