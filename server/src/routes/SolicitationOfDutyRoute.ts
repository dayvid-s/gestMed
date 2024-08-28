import { Router } from 'express';
import { SolicitationOfDutyController } from '../controllers/SolicitationOfDutyController';

const router = Router();
const controller = new SolicitationOfDutyController();

router.post('/solicitations/duties', controller.create);
router.get('/solicitations/duties', controller.getAll);
router.get('/solicitations/duties/:id', controller.getById);
router.put('/solicitations/duties/:id', controller.update);
router.delete('/solicitations/duties/:id', controller.delete);

export default router;