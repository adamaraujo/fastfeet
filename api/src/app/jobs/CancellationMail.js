import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { product, deliveryman, recipient } = data;

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
  }
}

export default new CancellationMail();
