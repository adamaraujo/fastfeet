import * as Yup from 'yup';

class UserValidator {
  async createValidator(req, res, next) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required()
          .strict()
          .matches(/^[a-zA-Z][a-zA-Z\s]*$/),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
        administrator: Yup.boolean(),
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
          .required()
          .strict()
          .matches(/^[a-zA-Z][a-zA-Z\s]*$/),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
        administrator: Yup.boolean(),
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

export default new UserValidator();
