import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';

class DeliveryProblemsController {
  async store(req, res) {
    const { id } = req.params;

    const delivery = await Order.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'This delivery does not exist' });
    }

    const { end_date, canceled_at } = delivery;

    if (end_date || canceled_at) {
      return res
        .status(400)
        .json({ error: 'This delivery was delivered or canceled' });
    }

    const deliveryProblem = await DeliveryProblems.create(req.body);

    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemsController();
