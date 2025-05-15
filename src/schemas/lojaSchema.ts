export const lojaSchema = {
    openapi: '3.0.0',
    info: {
      title: 'API Loja - EcomX',
      version: '1.0.0',
      description: 'CRUD da entidade Loja',
    },
    paths: {
      '/lojas': {
        get: {
          tags: ['Loja'],
          summary: 'Listar todas as lojas',
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
          summary: 'Atualizar loja pelo ID',
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
                schema: { $ref: '#/components/schemas/LojaInput' },
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
            '404': { description: 'Loja não encontrada' },
          },
        },
        delete: {
          tags: ['Loja'],
          summary: 'Excluir loja pelo ID',
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
            usuarioId: { type: 'string', format: 'uuid' },
          },
          required: ['nome', 'descricao', 'usuarioId'],
        },
      },
    },
  };
  