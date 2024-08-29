import { Request, Response } from 'express';
import { notificationRepository } from '../repositories/notification_Repository';

export class NotificationController {
  static async createNotification(req: Request, res: Response) {
    const { type, ...rest } = req.body;


    const allowedTypes = ['SolicitationInfo', 'Aprovation', 'Normal'];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: 'Tipo de notificação inválido' });
    }

    const notification = notificationRepository.create({ type, ...rest });

    try {
      const savedNotification = await notificationRepository.save(notification);
      return res.status(201).json(savedNotification);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar notificação', error });
    }
  }

  static async getNotifications(req: Request, res: Response) {

    try {
      const notifications = await notificationRepository.find();
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar notificações.', error });
    }
  }



  static async getNotificationsByUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
      const notifications = await notificationRepository.find({
        where: { user: { id: userId } },
      });

      if (notifications.length === 0) {
        return res.status(404).json({ message: 'Não há notificações para essse usuário' });
      }

      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar notificações para esse usuário', error });
    }
  }


  static async getNotificationById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const notification = await notificationRepository.findOneBy({ id: parseInt(id, 10) });
      if (!notification) {
        return res.status(404).json({ message: 'Notificação não encontrada' });
      }
      return res.status(200).json(notification);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar notifação', error });
    }
  }

  static async updateNotification(req: Request, res: Response) {
    const { id } = req.params;
    const { type, ...rest } = req.body;

    try {
      const notification = await notificationRepository.findOneBy({ id: parseInt(id, 10) });
      if (!notification) {
        return res.status(404).json({ message: 'Notificação não encontrada' });
      }


      const allowedTypes = ['SolicitationInfo', 'Aprovation', 'Normal'];
      if (type && !allowedTypes.includes(type)) {
        return res.status(400).json({ message: 'Tipo de notificação inválido' });
      }

      notificationRepository.merge(notification, { type, ...rest });
      const updatedNotification = await notificationRepository.save(notification);

      return res.status(200).json(updatedNotification);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar notificação', error });
    }
  }


  static async deleteNotification(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const notification = await notificationRepository.findOneBy({ id: parseInt(id, 10) });
      if (!notification) {
        return res.status(404).json({ message: 'Notificação não encontrada' });
      }

      await notificationRepository.remove(notification);
      return res.status(200).json({ message: 'Notificação deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar notificação', error });
    }
  }
}