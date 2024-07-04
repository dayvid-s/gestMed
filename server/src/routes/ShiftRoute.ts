import { Router } from 'express';
import { ShiftController } from '../controllers/ShiftController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const shiftController = new ShiftController();

router.post('/shifts', authMiddleware, shiftController.create);
router.get('/shifts', authMiddleware, shiftController.getAll);
router.put('/shifts/:id', authMiddleware, shiftController.update);
router.delete('/shifts/:id', authMiddleware, shiftController.delete);

export default router;