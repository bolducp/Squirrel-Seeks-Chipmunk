var express = require('express');
var router = express.Router();

var userMethods = require("../modules/user");
var authMiddleware = require("../config/auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("this ran");
  res.render('index');
});



module.exports = router;
