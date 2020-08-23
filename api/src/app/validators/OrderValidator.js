import * as Yup from 'yup';

class OrderValidator {
  async createValidator(req, res, next) {
    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.number().required(),
        deliveryman_id: Yup.number().required(),
        product: Yup.string().required().strict(),
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Validation fails', messages: err.inner });
    }
  }

  async updateValidator(req, res, next) {
    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.number(),
        deliveryman_id: Yup.number(),
        signature_id: Yup.number(),
        product: Yup.string().strict(),
        canceled_at: Yup.date(),
        start_date: Yup.date(),
        end_date: Yup.date(),
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Validation fails', messages: err.inner });
    }
  }
}

export default new OrderValidator();
