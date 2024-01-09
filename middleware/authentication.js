const jwt = require('jsonwebtoken');
const User = require('../models/usersModel.js');

const authenticateUser = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const token = req.header('Authorization').replace('Bearer ', '');

    const secret = process.env.JWT_SECRET || 'default-secret-key';
    
    // Verify the token
    const decoded = jwt.verify(token, 'secret'); 

    // Find the user by the decoded ID
    const user = await User.findOne({ _id: decoded.userId, 'tokens.token': token });

    if (!user) {
      throw new Error(); // Trigger the catch block
    }

    // Attach the user and token to the request for further use
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error('Authentication failed:', error.message);
    res.status(401).json({ message: 'Authentication failed.' });
  }
};

module.exports = authenticateUser;
