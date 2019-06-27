const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  console.log("Token received in request is: ", token);
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
      if (err) {
        console.log("A");
        res.status(401).json({ msg: 'Token is not valid' });
      }
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    console.log(err);
    console.log("B");
    res.status(401).json({ msg: 'Token is not valid' });
  }
};