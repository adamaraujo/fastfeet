import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';

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
}

export default new AdminProblemsController();
