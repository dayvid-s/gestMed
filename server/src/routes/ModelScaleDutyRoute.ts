import { Router } from 'express';
import { ModelScaleDutyController } from '../controllers/ModelScaleDutyController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const modelScaleDutyController = new ModelScaleDutyController();

router.post('/scales/models/duties', authMiddleware, modelScaleDutyController.create);
router.post('/scales/models/duties/batch', authMiddleware, modelScaleDutyController.createBatch);

router.get('/scales/models/duties', authMiddleware, modelScaleDutyController.getAll);
router.get('/scales/models/duties/:id', authMiddleware, modelScaleDutyController.getOne);
router.put('/scales/models/duties/:id', authMiddleware, modelScaleDutyController.update);
router.delete('/scales/models/duties/:id', authMiddleware, modelScaleDutyController.delete);

export default router;
