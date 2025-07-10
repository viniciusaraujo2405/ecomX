// backend/src/swaggerDef.ts
// Este objeto contém toda a documentação da API.
// Por ser um objeto TypeScript, a indentação não importa para o funcionamento.

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'EcomX API',
    version: '1.0.0',
    description: 'API para o e-commerce EcomX',
  },
  servers: [
    {
      url: 'http://localhost:3333', // Altere se sua porta for diferente
      description: 'Servidor de Desenvolvimento',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Produto: {
        type: 'object',
        properties: {
          id: { type: 'string', readOnly: true },
          nome: { type: 'string' },
          descricao: { type: 'string' },
          estoque: { type: 'integer' },
          preco: { type: 'number', format: 'float' },
          urlImagem: { type: 'string', nullable: true },
          idVendedor: { type: 'string', readOnly: true },
          idCategoria: { type: 'string' },
        },
      },
      ProdutoInput: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          descricao: { type: 'string' },
          estoque: { type: 'integer' },
          preco: { type: 'number' },
          idCategoria: { type: 'string' },
          urlImagem: { type: 'string', nullable: true },
        },
        required: ['nome', 'descricao', 'estoque', 'preco', 'idCategoria'],
      },
    },
  },
  paths: {
    '/produtos': {
      get: {
        tags: ['Produtos'],
        summary: 'Lista todos os produtos (Catálogo)',
        parameters: [{
          name: 'idCategoria',
          in: 'query',
          description: 'ID da categoria para filtrar os produtos.',
          required: false,
          schema: { type: 'string' },
        }],
        responses: {
          '200': {
            description: 'Lista de produtos.',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Produto' } } } },
          },
        },
      },
      post: {
        tags: ['Produtos'],
        summary: 'Cadastra um novo produto',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProdutoInput' } } },
        },
        responses: {
          '201': { description: 'Produto criado com sucesso.' },
        },
      },
    },
    '/produtos/meus-produtos': {
      get: {
        tags: ['Produtos'],
        summary: 'Lista os produtos do vendedor logado',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Lista de produtos do vendedor.',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Produto' } } } },
          },
        },
      },
    },
    '/produtos/{id}': {
        get: {
            tags: ['Produtos'],
            summary: 'Obtém um produto específico',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
              '200': { description: 'Sucesso.', content: { 'application/json': { schema: { $ref: '#/components/schemas/Produto' } } } },
              '404': { description: 'Produto não encontrado.' },
            },
        },
        put: {
            tags: ['Produtos'],
            summary: 'Atualiza um produto existente',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            requestBody: {
                required: true,
                content: { 'application/json': { schema: { $ref: '#/components/schemas/ProdutoInput' } } },
            },
            responses: {
                '200': { description: 'Produto atualizado.' },
                '404': { description: 'Produto não encontrado.' },
            },
        },
        delete: {
            tags: ['Produtos'],
            summary: 'Deleta um produto',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
                '204': { description: 'Produto deletado com sucesso.' },
                '404': { description: 'Produto não encontrado.' },
            },
        },
    },
  },
};