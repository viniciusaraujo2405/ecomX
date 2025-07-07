import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario_controller';
import { authenticateJWT } from '../middlewares/auth_middleware';

const router = Router();
const controller = new UsuarioController();

router.post('/', controller.create); // Cadastro público

router.get('/', authenticateJWT, controller.findAll); //admin 

router.get('/me', authenticateJWT, controller.getMyProfile);

router.put('/me', authenticateJWT, async (req, res, next) => {
  try {
    await controller.update(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete('/me', authenticateJWT, async (req, res, next) => {
  try {
    await controller.delete(req, res);
  } catch (error) {
    next(error);
  }
});


export default router;
