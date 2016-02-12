'use strict';

var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var authMiddleware = function(req, res, next) {

  try {
    var payload = jwt.decode(req.cookies.userToken, JWT_SECRET);
  } catch(err) {
    return res.status(401).redirect('/#/login');
  }
  req.user = payload;
  console.log("req.user", req.user);
  next();
};

module.exports = authMiddleware;
