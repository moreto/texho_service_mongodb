import { Router } from 'express';
import { LocalController } from '../controllers/LocalController';


const router = Router();

router.get('/', LocalController.getAll);

export default router;
