import { Op } from 'sequelize';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryController {
  async index(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    const { type } = req.query;

    if (type === 'notDelivered') {
      const deliveries = await Order.findAll({
        where: { end_date: null, canceled_at: null, deliveryman_id: id },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
          },
        ],
      });

      return res.json(deliveries);
    }
    if (type === 'delivered') {
      const deliveries = await Order.findAll({
        where: { end_date: { [Op.ne]: null }, deliveryman_id: id },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
          },
        ],
      });

      return res.json(deliveries);
    }

    return res
      .status(400)
      .json({ error: 'This query parameter does not exist' });
  }
}

export default new DeliveryController();
