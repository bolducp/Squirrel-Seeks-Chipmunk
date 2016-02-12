var express = require('express');
var router = express.Router();

var userMethods = require("../modules/user");
var authMiddleware = require("../config/auth");

/* GET home page. */
router.get('/', authMiddleware, function(req, res, next) {
  res.render('index');
});



module.exports = router;
