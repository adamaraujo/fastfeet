import * as Yup from 'yup';

class DeliveryProblemsValidator {
  async createValidator(req, res, next) {
    try {
      const schema = Yup.object().shape({
        description: Yup.string().required().strict(),
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

export default new DeliveryProblemsValidator();
