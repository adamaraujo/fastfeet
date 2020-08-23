import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class AdminProblemsController {
  async index(req, res) {
    const deliveryProblems = await DeliveryProblems.findAll({
      attributes: ['id', 'description', 'delivery_id'],
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        },
      ],
    });

    return res.json(deliveryProblems);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryExists = await Order.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'This delivery does not exist' });
    }

    const deliveryProblems = await DeliveryProblems.findAll({
      where: { delivery_id: id },
      attributes: ['id', 'description', 'delivery_id'],
      order: [['id', 'DESC']],
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        },
      ],
    });

    return res.json(deliveryProblems);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryProblem = await DeliveryProblems.findByPk(id);

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Delivery problem does not exist' });
    }

    const { delivery_id } = deliveryProblem;

    const delivery = await Order.findByPk(delivery_id);

    if (delivery.canceled_at) {
      return res
        .status(400)
        .json({ error: 'This delivery was already canceled' });
    }

    const canceled_at = new Date();

    await delivery.update({
      canceled_at,
    });

    await delivery.reload({
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        },
      ],
    });

    const { recipient, deliveryman, product } = delivery;

    await Queue.add(CancellationMail.key, {
      recipient,
      deliveryman,
      product,
    });

    return res.json({ message: 'Delivery canceled with success!' });
  }
}

export default new AdminProblemsController();
