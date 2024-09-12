import { Router } from 'express';
import { ConfigurationController } from '../controllers/ConfigurationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const configurationController = new ConfigurationController();

router.post('/configurations', authMiddleware, configurationController.create);
router.put('/configurations/:id', authMiddleware, configurationController.update);
router.get('/configurations/1', authMiddleware, configurationController.getById);

export default router;
