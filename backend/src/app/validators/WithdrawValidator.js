import * as Yup from 'yup';

class WithdrawValidator {
  async updateValidator(req, res, next) {
    try {
      const schema = Yup.object().shape({
        start_date: Yup.date().required(),
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

export default new WithdrawValidator();
