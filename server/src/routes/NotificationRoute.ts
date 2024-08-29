import { Router } from 'express';
import { NotificationController } from '../controllers/NotificationController';

const router = Router();

router.post('/notifications', NotificationController.createNotification);
router.get('/notifications', NotificationController.getNotifications);
router.get('/notifications/user/:userId', NotificationController.getNotificationsByUser);
router.get('/notifications/:id', NotificationController.getNotificationById);
router.put('/notifications/:id', NotificationController.updateNotification);
router.delete('/notifications/:id', NotificationController.deleteNotification);

export default router;