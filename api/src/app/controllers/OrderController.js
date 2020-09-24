import { parseISO, getHours, isBefore } from 'date-fns';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Notification from '../models/Notification';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';
import WithdrawMail from '../jobs/WithdrawMail';

import Mail from '../../lib/Mail';

class OrderController {
  async store(req, res) {
    const { recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const order = await Order.create(req.body);

    const { product } = order;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Pedido de retirada de encomenda',
      template: 'withdraw',
      context: {
        product,
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement ? recipient.complement : '-',
        state: recipient.state,
        city: recipient.city,
        zipcode: recipient.zipcode,
      },
    });

    // await Queue.add(WithdrawMail.key, {
    //   recipient,
    //   deliveryman,
    //   product,
    // });

    await Notification.create({
      user_id: deliveryman_id,
      content: `O pedido ${order.product} de ${recipient.name} está pronto para ser retirado ;)`,
    });

    return res.json(order);
  }

  async index(req, res) {
    const orders = await Order.findAll({
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'signature_id',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(orders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string().strict(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const {
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      // canceled_at,
      start_date,
      end_date,
    } = req.body;

    /**
     * Check if recipient exists
     */

    if (recipient_id) {
      const recipientExists = await Recipient.findByPk(recipient_id);

      if (!recipientExists) {
        return res.status(400).json({ error: 'Recipient does not exist' });
      }
    }

    /**
     * Check if deliveryman exist
     */

    if (deliveryman_id) {
      const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

      if (!deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman does not exist' });
      }
    }

    /**
     * Check if signature exist
     */

    if (signature_id) {
      const signatureExists = await File.findByPk(signature_id);

      if (!signatureExists) {
        return res.status(400).json({ error: 'Signature does not exist' });
      }
    }

    /**
     * Check start and end date conditions
     */

    if (start_date) {
      const parsedStart = parseISO(start_date);
      const hours = getHours(parsedStart);

      if (hours < '08' || hours >= '20') {
        return res.status(400).json({
          error: 'This is not an allowed time for the withdrawal of orders',
        });
      }
    }

    const { start_date: oldStart } = order;

    if (!start_date && end_date) {
      if (oldStart) {
        const parsedEnd = parseISO(end_date);

        if (isBefore(parsedEnd, oldStart)) {
          return res.status(400).json({
            error: 'You need to set a delivery date after the pick-up date',
          });
        }
      } else {
        return res.status(400).json({
          error: 'You need to pick up the order before finalizing it',
        });
      }
    }

    if (start_date && end_date) {
      const parsedStart = parseISO(start_date);
      const parsedEnd = parseISO(end_date);

      if (isBefore(parsedEnd, parsedStart)) {
        return res.status(400).json({
          error: 'You need to set a delivery date after the pick-up date',
        });
      }
    }

    const updatedOrder = await order.update(req.body);

    return res.json(updatedOrder);
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const { signature_id, deliveryman_id, recipient_id } = order;

    if (signature_id) {
      await File.destroy({ where: { id: signature_id } });
    }

    await Order.destroy({ where: { id } });

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    const recipient = await Recipient.findByPk(recipient_id);

    const { product } = order;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Cancelamento de encomenda',
      template: 'cancellation',
      context: {
        product,
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement ? recipient.complement : '-',
        state: recipient.state,
        city: recipient.city,
        zipcode: recipient.zipcode,
      },
    });

    // await Queue.add(CancellationMail.key, {
    //   recipient,
    //   deliveryman,
    //   product,
    // });

    return res.status(200).json({ message: 'Order deleted with success!' });
  }
}

export default new OrderController();
