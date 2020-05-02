const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //extract token from header
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      errors: [{ msg: "Token doesn't exist, user is not authorized" }],
    });
  }

  //verify
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      errors: [{ msg: 'Token is not valid, user is not authorized' }],
    });
  }
};
