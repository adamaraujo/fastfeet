import { parseISO, isToday } from 'date-fns';
import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';

class DeliveredController {
  async update(req, res) {
    const { id, delivery_id } = req.params;

    /**
     * Checks if the deliveryman exists
     */

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    /**
     * Check if the order belongs that deliveryman
     */

    const delivery = await Order.findOne({
      where: { id: delivery_id, deliveryman_id: id },
    });

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'This order is not from this deliveryman' });
    }

    /**
     * Check if the delivery can be made
     */

    const { start_date, end_date, canceled_at } = delivery;

    if (!start_date || end_date || canceled_at) {
      return res
        .status(400)
        .json({ error: 'This delivery can not be delivered' });
    }

    /**
     * Check if the delivery date is the same as today's date
     */

    const { end_date: endDate, signature_id } = req.body;

    const parsedDate = parseISO(endDate);
    const checkIsToday = isToday(parsedDate);

    if (!checkIsToday) {
      return res.status(400).json({
        error: 'You can only make a delivery if the date is the same as today',
      });
    }

    const updatedOrder = await delivery.update({
      end_date: endDate,
      signature_id,
    });

    return res.json(updatedOrder);
  }
}

export default new DeliveredController();
