import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const recipientExist = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExist) {
      return res.status(400).json({ message: 'Recipient already exists' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const updatedRecipient = await recipient.update(req.body);

    return res.json(updatedRecipient);
  }

  async index(req, res) {
    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.json({ error: 'Recipient does not exist' });
    }

    await Recipient.destroy({ where: { id } });

    return res.json({ message: 'Recipient deleted with success!' });
  }
}

export default new RecipientController();
