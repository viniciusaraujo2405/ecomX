import { Router } from 'express';
import { ProdutoController } from '../controllers/produto_controller';
import { authenticateJWT } from '../middlewares/auth_middleware';
import { authorizeRole } from '../middlewares/authorization_middleware';

const router = Router();
const controller = new ProdutoController();

// --- ROTAS PÚBLICAS ---
// Qualquer pessoa pode listar todos os produtos
router.get('/', (req, res) => controller.findAll(req, res));

// --- ROTAS PROTEGIDAS (Acesso apenas para LOJISTA) ---
// Precisa estar autenticado (token válido) E ter o tipo 'LOJISTA'
router.get('/meus-produtos', authenticateJWT,authorizeRole(['VENDEDOR']),
  controller.findMyProducts); // GET /produtos/meus-produtos

router.post(
  '/',
  authenticateJWT,
  authorizeRole(['VENDEDOR']),
  (req, res) => controller.create(req, res)
);

router.put(
  '/:id',
  authenticateJWT,
  authorizeRole(['VENDEDOR']),
  (req, res) => controller.update(req, res)
);

router.delete(
  '/:id',
  authenticateJWT,
  authorizeRole(['VENDEDOR']),
  (req, res) => controller.delete(req, res)
);


export default router;

