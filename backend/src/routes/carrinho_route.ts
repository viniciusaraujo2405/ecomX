// backend/src/routes/carrinho_route.ts
import { Router } from 'express';
import { CarrinhoController } from '../controllers/carrinho_controller'; // Importa o controller do carrinho
import { authenticateJWT} from '../middlewares/auth_middleware'; // Seu middleware de autenticação
import { authorizeRole } from '../middlewares/authorization_middleware';

const carrinhoRouter = Router(); // Crie um novo roteador para o carrinho
const carrinhoController = new CarrinhoController(); // Instancie o controller

// Todas as rotas do carrinho exigem autenticação
carrinhoRouter.get('/meu', authenticateJWT,authorizeRole(['CONSUMIDOR']), carrinhoController.getMyCart);
carrinhoRouter.post('/item', authenticateJWT,authorizeRole(['CONSUMIDOR']), carrinhoController.addItemToCart);
carrinhoRouter.put('/item', authenticateJWT, authorizeRole(['CONSUMIDOR']),carrinhoController.updateItemQuantityInCart);
carrinhoRouter.delete('/item/:idProduto', authenticateJWT,authorizeRole(['CONSUMIDOR']), carrinhoController.removeItemFromCart);
carrinhoRouter.delete('/limpar', authenticateJWT,authorizeRole(['CONSUMIDOR']), carrinhoController.clearMyCart);

export default carrinhoRouter; // Exporta este roteador específico do carrinhoS