import Notification from '../models/Notification';
import Deliveryman from '../models/Deliveryman';

class NotificationController {
  async index(req, res) {
    const { id } = req.params;

    const checkIsDeliveryman = await Deliveryman.findByPk(id);

    if (!checkIsDeliveryman) {
      return res
        .status(401)
        .json({ error: 'Only deliveryman can load notifications' });
    }

    const notifications = await Notification.findAll({
      where: { user_id: id },
      order: [['created_at', 'DESC']],
      limit: 20,
    });

    return res.json(notifications);
  }

  async update(req, res) {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(400).json({ error: 'Notification not found' });
    }

    const { content, read, user_id } = await notification.update({
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
