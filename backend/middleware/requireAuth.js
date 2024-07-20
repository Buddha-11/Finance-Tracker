const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // Verify user is authenticated
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    
    req.user = await User.findOne({ _id }).select('_id');
    req.userId = req.user._id;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
