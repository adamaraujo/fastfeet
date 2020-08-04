import Deliveryman from '../models/Deliveryman';

export default async (req, res, next) => {
  const deliveryman = await Deliveryman.findByPk(req.userId);

  if (!deliveryman) {
    return res.status(401).json({ error: 'User not authorized' });
  }

  return next();
};
