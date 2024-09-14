import { Router } from 'express';
import { NotificationController } from '../controllers/NotificationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/notifications', authMiddleware, NotificationController.createNotification);
router.get('/notifications', authMiddleware, NotificationController.getNotifications);
router.get('/notifications/user/:userId', authMiddleware, NotificationController.getNotificationsByUser);
router.get('/notifications/:id', authMiddleware, NotificationController.getNotificationById);
router.put('/notifications/:id', authMiddleware, NotificationController.updateNotification);
router.delete('/notifications/:id', authMiddleware, NotificationController.deleteNotification);

export default router;