import Notification from '../models/Notification';
import Deliveryman from '../models/Deliveryman';

class NotificationController {
  async index(req, res) {
    const { id } = req.params;

    const checkIsDeliveryman = await Deliveryman.findByPk(id);

    if (!checkIsDeliveryman) {
      return res
        .status(401)
        .json({ error: 'Only deliverymen can load notifications' });
    }

    const notifications = await Notification.findAll({
      where: { user_id: id },
      order: [['created_at', 'DESC']],
      limit: 20,
    });

    return res.json(notifications);
  }

  async update(req, res) {
    const { id: notification_id, deliveryman_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const notification = await Notification.findOne({
      where: { id: notification_id, user_id: deliveryman_id },
    });

    if (!notification) {
      return res
        .status(400)
        .json({ error: 'This notification is not from this deliveryman' });
    }

    const { id, content, read, user_id } = await notification.update({
      read: true,
    });

    return res.json({
      id,
      user_id,
      content,
      read,
    });
  }
}

export default new NotificationController();
