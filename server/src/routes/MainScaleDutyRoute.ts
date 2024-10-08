import { Router } from 'express';
import { MainScaleDutyController } from '../controllers/MainScaleDutyController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const mainScaleDutyController = new MainScaleDutyController();

router.post('/scales/main/duties', authMiddleware, mainScaleDutyController.create);
router.post('/scales/main/duties/batch', authMiddleware, mainScaleDutyController.createBatch);
router.get('/scales/main/duties', authMiddleware, mainScaleDutyController.getAll);
router.get('/scales/main/duties/:id', authMiddleware, mainScaleDutyController.getOne);


router.post('/scales/main/duties/:id/change-shift', authMiddleware, mainScaleDutyController.changeShift);
router.put('/scales/main/duties/:id', authMiddleware, mainScaleDutyController.update);
router.patch('/scales/main/duties/:id/remove-doctor', authMiddleware, mainScaleDutyController.removeDoctor);
router.delete('/scales/main/duties/:id', authMiddleware, mainScaleDutyController.delete);


export default router;
