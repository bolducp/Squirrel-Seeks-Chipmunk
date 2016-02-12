"use strict";

var express = require('express');
var Firebase = require('firebase');

var router = express.Router();

var authMiddleware = require('../config/auth');
var User = require('../models/user');
var userMethods = require("../modules/user");

var ref = new Firebase('https://meandates.firebaseio.com/');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   console.log(userMethods);
//   res.cookie("userToken", userMethods.generateToken()).send("cookie set");
// });

router.post('/register', userMethods.register, function(req, res, next) {
  res.send("register!");
});






module.exports = router;
