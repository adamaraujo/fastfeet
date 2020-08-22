import * as Yup from 'yup';

class RecipientValidator {
  async createValidator(req, res, next) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required().strict(),
        street: Yup.string().required().strict(),
        number: Yup.string().required().matches(/^\d+$/),
        complement: Yup.string().strict(),
        state: Yup.string().required().strict(),
        city: Yup.string().required().strict(),
        zipcode: Yup.string().required().matches(/^\d+$/),
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
        name: Yup.string().strict(),
        street: Yup.string().strict(),
        number: Yup.string().matches(/^\d+$/),
        complement: Yup.string(),
        state: Yup.string().strict(),
        city: Yup.string().strict(),
        zipcode: Yup.string().strict().matches(/^\d+$/),
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

export default new RecipientValidator();
