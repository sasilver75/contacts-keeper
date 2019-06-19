/**
 * Middleware is just a function that has access to the request and response objects.
 * Every time we hit an endpoint, we can fire off this middleware to check whether there's a token in the header.
 */

 const jwt = require('jsonwebtoken')
 const config = require('config')

//  This will only pertain to protected routes; Routes we choose to protect

module.exports = function(req, res, next) {
// Get the token from the header, looking at the given key.
const token = req.header('x-auth-token'); 

// Check if not token
if (!token) {
  // unauthorized status code.
  return res.status(401).json({msg: "No token, authorization denied"})
}

// If there is a token, we need to verify it.
try {
  const decoded = jwt.verify(token, config.get('jwtSecret'));
  req.user = decoded.user; //decoded.user should be the user id
  // ^^ We'll now have access to this through our protected route.
  return next();
} catch (err) {
  return res.status(401).json({msg: "Token is not valid"}); 
}
}