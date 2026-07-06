import { Router } from 'express';
import { OrganizacaoLocalController } from '../controllers/OrganizacaoLocalController';


const router = Router();

router.get('/', OrganizacaoLocalController.getAll);

export default router;
