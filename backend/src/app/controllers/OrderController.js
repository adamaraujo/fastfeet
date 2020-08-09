import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Notification from '../models/Notification';

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

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Pedido de retirada de encomenda',
      template: 'withdraw',
      context: {
        product: order.product,
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement,
        state: recipient.state,
        city: recipient.city,
        zipcode: recipient.zipcode,
      },
    });

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

  // Funcionalidade de UPDATE não foi definida ainda

  async update(req, res) {
    const { id } = req.params;

    return res.json({ ok: true });
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

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Cancelamento de encomenda',
      template: 'cancellation',
      context: {
        product: order.product,
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement,
        state: recipient.state,
        city: recipient.city,
        zipcode: recipient.zipcode,
      },
    });

    return res.status(200).json({ message: 'Order deleted with success!' });
  }
}

export default new OrderController();
