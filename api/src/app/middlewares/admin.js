import User from '../models/User';

export default async (req, res, next) => {
  const { administrator } = await User.findByPk(req.userId);

  if (!administrator) {
    return res.status(401).json({ error: 'User not authorized' });
  }

  return next();
};
