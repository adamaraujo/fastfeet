import * as Yup from 'yup';

class DeliveredValidator {
  async updateValidator(req, res, next) {
    try {
      const schema = Yup.object().shape({
        end_date: Yup.date().required(),
        signature_id: Yup.number().required().strict(),
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

export default new DeliveredValidator();
