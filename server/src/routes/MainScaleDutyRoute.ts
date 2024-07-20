import { Router } from 'express';
import { MainScaleDutyController } from '../controllers/MainScaleDutyController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const mainScaleDutyController = new MainScaleDutyController();

router.post('/scales/main/duties', authMiddleware, mainScaleDutyController.create);
router.post('/scales/main/duties/batch', authMiddleware, mainScaleDutyController.createBatch);
router.get('/scales/main/duties', authMiddleware, mainScaleDutyController.getAll);
router.get('/scales/main/duties/:id', authMiddleware, mainScaleDutyController.getOne);
router.put('/scales/main/duties/:id', authMiddleware, mainScaleDutyController.update);
router.delete('/scales/main/duties/:id', authMiddleware, mainScaleDutyController.delete);

export default router;
