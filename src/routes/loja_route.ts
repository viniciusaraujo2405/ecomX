import { Router } from 'express';
import { LojaController } from '../controllers/loja_controller';
import { authenticateJWT } from '../auth_middleware';

const router = Router();
const controller = new LojaController();

router.post('/', authenticateJWT, controller.create);
router.get('/', controller.findAll);
router.get('/:id', async (req, res) => {
	try {
		await controller.findById(req, res);
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
});
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
