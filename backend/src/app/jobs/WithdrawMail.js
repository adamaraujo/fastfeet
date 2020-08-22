import Mail from '../../lib/Mail';

class WithdrawMail {
  get key() {
    return 'WithdrawMail';
  }

  async handle({ data }) {
    const { product, deliveryman, recipient } = data;

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
  }
}

export default new WithdrawMail();
