import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ProdutoRepository } from '../repositories/produto_repository';

const produtoRepo = new ProdutoRepository();

// Definimos uma interface para o payload do nosso usuário no token.
// Isso diz ao TypeScript como o objeto `req.user` deve se parecer.
interface UserPayload extends JwtPayload {
  id: string;
  tipo: string;
}

export class ProdutoController {
  /**
   * Cria um novo produto. Apenas usuários LOJISTA podem criar produtos.
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      // Verificamos e garantimos o tipo do usuário que vem do token
      const user = req.user as UserPayload;
      if (!user?.id) {
        res.status(401).json({ error: 'Usuário não autenticado ou token inválido.' });
        return;
      }
      const idVendedor = user.id;

      const { nome, descricao, estoque, preco, idCategoria } = req.body;

      const produto = await produtoRepo.create({
        nome,
        descricao,
        estoque,
        preco,
        idCategoria,
        idVendedor, // Associa o produto ao lojista logado
      });

      res.status(201).json(produto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar produto.' });
    }
  }

  /**
   * Lista todos os produtos. Rota pública.
   */
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const produtos = await produtoRepo.findAll();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
  }

  /**
   * Atualiza um produto. Apenas o dono do produto pode atualizá-lo.
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id: produtoId } = req.params;
      const user = req.user as UserPayload;
      const dataToUpdate = req.body;

      if (!user?.id) {
        res.status(401).json({ error: 'Usuário não autenticado ou token inválido.' });
        return;
      }

      const produto = await produtoRepo.findById(produtoId);

      if (!produto) {
        res.status(404).json({ error: 'Produto não encontrado.' });
        return;
      }

      // Verificação de segurança: O usuário logado é o vendedor do produto?
      if (produto.idVendedor !== user.id) {
        res.status(403).json({ error: 'Acesso negado. Você não é o vendedor deste produto.' });
        return;
      }

      const produtoAtualizado = await produtoRepo.update(produtoId, dataToUpdate);
      res.status(200).json(produtoAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar produto.' });
    }
  }
  
  /**
   * Deleta um produto. Apenas o dono do produto pode deletá-lo.
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id: produtoId } = req.params;
      const user = req.user as UserPayload;

      if (!user?.id) {
        res.status(401).json({ error: 'Usuário não autenticado ou token inválido.' });
        return;
      }

      const produto = await produtoRepo.findById(produtoId);

      if (!produto) {
        res.status(404).json({ error: 'Produto não encontrado.' });
        return;
      }

      // Verificação de segurança: O usuário logado é o vendedor do produto?
      if (produto.idVendedor !== user.id) {
        res.status(403).json({ error: 'Acesso negado. Você não é o vendedor deste produto.' });
        return;
      }

      await produtoRepo.delete(produtoId);
      res.status(204).send(); // Resposta de sucesso sem conteúdo
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar produto.' });
    }
  }
}
