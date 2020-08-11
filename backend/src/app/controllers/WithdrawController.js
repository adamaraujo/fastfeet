import { parseISO, getHours, startOfDay, endOfDay, isToday } from 'date-fns';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';

class WithdrawController {
  async update(req, res) {
    const { id, delivery_id } = req.params;

    /**
     * Checks if the deliveryman exists
     */

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const delivery = await Order.findOne({
      where: { id: delivery_id, deliveryman_id: id },
    });

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'This order is not from this deliveryman' });
    }

    /**
     * Check if delivery already has a start date,
     * end date or if was canceled
     */

    const { start_date, end_date, canceled_at } = delivery;

    if (start_date || end_date || canceled_at) {
      return res
        .status(400)
        .json({ error: 'This delivery can not be withdraw' });
    }

    const { start_date: startDate } = req.body;

    const parsedDate = parseISO(startDate);
    const hours = getHours(parsedDate);

    const checkIsToday = isToday(parsedDate);

    if (!checkIsToday) {
      return res.status(400).json({
        error:
          'You can only make a withdrawal if the date is the same as today',
      });
    }

    if (hours < '08' || hours >= '20') {
      return res.status(400).json({
        error: 'This is not an allowed time for the withdrawal of orders',
      });
    }

    const deliveries = await Order.findAll({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });

    if (deliveries.length >= 5) {
      return res
        .status(400)
        .json({ error: 'You have passed the withdrawal limit for today' });
    }

    const updatedOrder = await delivery.update({
      start_date: startDate,
    });

    return res.json(updatedOrder);
  }
}

export default new WithdrawController();
