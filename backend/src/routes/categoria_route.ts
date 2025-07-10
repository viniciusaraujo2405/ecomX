// backend/src/routes/categoria_route.ts
import { Router } from 'express';
import { CategoriaController } from '../controllers/categoria_controller';

const categoriaRouter = Router();
const categoriaController = new CategoriaController();

categoriaRouter.get('/', categoriaController.findAll); // Rota pública para listar categorias

export default categoriaRouter;