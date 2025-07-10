// backend/src/schemas/produto.schema.ts

/**
 * @openapi
 * components:
 * schemas:
 * Produto:
 * type: object
 * properties:
 * id:
 * type: string
 * description: ID único do produto.
 * example: "clwsm1psv000008l43s1s9p5b"
 * nome:
 * type: string
 * description: Nome do produto.
 * example: "Camisa Preta de Algodão"
 * descricao:
 * type: string
 * description: Descrição detalhada do produto.
 * example: "Camisa preta unissex, 100% algodão."
 * estoque:
 * type: integer
 * description: Quantidade de itens em estoque.
 * example: 50
 * preco:
 * type: number
 * format: float
 * description: Preço do produto.
 * example: 89.90
 * urlImagem:
 * type: string
 * nullable: true
 * description: URL da imagem do produto.
 * example: "https://example.com/image.png"
 * idVendedor:
 * type: string
 * description: ID do vendedor do produto.
 * idCategoria:
 * type: string
 * description: ID da categoria do produto.
 * ProdutoInput:
 * type: object
 * properties:
 * nome:
 * type: string
 * descricao:
 * type: string
 * estoque:
 * type: integer
 * preco:
 * type: number
 * idCategoria:
 * type: string
 * urlImagem:
 * type: string
 * nullable: true
 * required:
 * - nome
 * - descricao
 * - estoque
 * - preco
 * - idCategoria
 *
 * paths:
 * /produtos:
 * get:
 * tags: [Produtos]
 * summary: Lista todos os produtos (Catálogo)
 * description: Retorna uma lista de todos os produtos. Pode ser filtrada por categoria.
 * parameters:
 * - in: query
 * name: idCategoria
 * schema:
 * type: string
 * description: ID da categoria para filtrar os produtos.
 * responses:
 * '200':
 * description: Lista de produtos retornada com sucesso.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Produto'
 * post:
 * tags: [Produtos]
 * summary: Cadastra um novo produto
 * description: Cria um novo produto. Rota protegida para 'VENDEDOR'.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProdutoInput'
 * responses:
 * '201':
 * description: Produto criado com sucesso.
 * '400':
 * description: Dados inválidos.
 * '403':
 * description: Acesso negado.
 *
 * /produtos/meus-produtos:
 * get:
 * tags: [Produtos]
 * summary: Lista os produtos do vendedor logado
 * description: Retorna os produtos cadastrados pelo vendedor autenticado. Rota protegida para 'VENDEDOR'.
 * responses:
 * '200':
 * description: Lista de produtos do vendedor.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Produto'
 * '403':
 * description: Acesso negado.
 *
 * /produtos/{id}:
 * get:
 * tags: [Produtos]
 * summary: Obtém um produto específico
 * description: Retorna os detalhes de um único produto pelo seu ID.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * '200':
 * description: Sucesso. Retorna o produto.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Produto'
 * '404':
 * description: Produto não encontrado.
 * put:
 * tags: [Produtos]
 * summary: Atualiza um produto existente
 * description: Atualiza os dados de um produto pelo seu ID. Rota protegida para o dono do produto.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProdutoInput'
 * responses:
 * '200':
 * description: Produto atualizado com sucesso.
 * '404':
 * description: Produto não encontrado.
 * delete:
 * tags: [Produtos]
 * summary: Deleta um produto
 * description: Remove um produto pelo seu ID. Rota protegida para o dono do produto.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * '204':
 * description: Produto deletado com sucesso.
 * '404':
 * description: Produto não encontrado.
 */