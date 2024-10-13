import { Router } from 'express';
import { SolicitationOfDutyController } from '../controllers/DutySolicitationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const controller = new SolicitationOfDutyController();

router.post('/solicitations/duties/create-without-duty', authMiddleware, controller.createSolicitationOfNoExistentDuty);
router.post('/solicitations/duties/create-with-duty', authMiddleware, controller.createSolicitationOfExistentDuty);
router.get('/solicitations/duties', authMiddleware, controller.getAll);
router.post('/solicitations/duties/user', authMiddleware, controller.getAllFromOneUser);
router.get('/solicitations/duties/:id', authMiddleware, controller.getById);
router.put('/solicitations/duties/:id', authMiddleware, controller.update);
router.delete('/solicitations/duties/:id', authMiddleware, controller.delete);

export default router;