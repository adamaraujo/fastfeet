import * as Yup from 'yup';

class DeliverymanValidator {
  async createValidator(req, res, next) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required()
          .strict()
          .matches(/^[a-zA-Z][a-zA-Z\s]*$/),
        email: Yup.string().email().required(),
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
        name: Yup.string()
          .strict()
          .matches(/^[a-zA-Z][a-zA-Z\s]*$/),
        email: Yup.string().email().required(),
        avatar_id: Yup.number(),
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

export default new DeliverymanValidator();
