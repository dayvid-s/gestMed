import { Router } from 'express';
import { MainScaleController } from '../controllers/MainScaleController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const mainScaleController = new MainScaleController();

router.post('/main_scales', authMiddleware, mainScaleController.create);
router.get('/main_scales/:id', authMiddleware, mainScaleController.getById);
router.put('/main_scales/:id', authMiddleware, mainScaleController.update);

export default router;
