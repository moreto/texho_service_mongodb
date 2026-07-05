import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router = Router();

router.get('/', UsuarioController.getAll);
router.get('/email/:email', UsuarioController.getByEmail);
router.get('/uuid/:uuid', UsuarioController.getByUuid);
router.post('/', UsuarioController.create);
router.put('/:uuid', UsuarioController.update);
router.delete('/:uuid', UsuarioController.delete);

export default router;
