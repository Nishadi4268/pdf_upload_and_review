const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ error: 'Unauthorized' });
  try {
    const { userId } = jwt.verify(token, 'your_jwt_secret');
    req.user = await User.findById(userId);
    next();
  } catch (err) {
    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = { authMiddleware };
