var express = require('express');
var router = express.Router();

var userMethods = require("../modules/user");
var authMiddleware = require("../config/auth");

router.get('/', function(req, res, next) {
  res.render('index');
});



module.exports = router;
