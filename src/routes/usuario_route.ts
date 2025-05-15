import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario_controller';

const router = Router();
const controller = new UsuarioController();

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', (req, res, next) => {
	controller.findById(req, res).catch(next);
});
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
