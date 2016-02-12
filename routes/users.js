"use strict";

var express = require('express');
var Firebase = require('firebase');

var router = express.Router();

var authMiddleware = require('../config/auth');
var User = require('../models/user');
var userMethods = require("../modules/user");

var ref = new Firebase('https://meandates.firebaseio.com/');

var authMiddleware = require("../config/auth");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   console.log(userMethods);
//   res.cookie("userToken", userMethods.generateToken()).send("cookie set");
// });

var User = require("../models/user");

router.post('/register', userMethods.register, function(req, res, next) {
  res.send("register!");
});

router.post('/login', userMethods.login, function(req, res, next) {
  res.send("Logged In");
});

router.post("/logout", function(req, res, next) {
  res.clearCookie("userToken").redirect("/"); //change this to $state.go after adding a main.js
});

router.post("/auth", authMiddleware, function(req, res, next) {
  res.send("User:", req.user);
});

router.get("/dashboard", authMiddleware, function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if(err) return res.status(400).send(err);
    res.send(user);
  });
});

router.get("/profile", authMiddleware, function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if(err) return res.status(400).send(err);
    res.send(user);
  });
});

router.post("/profile", authMiddleware, function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if(err) return res.status(400).send(err);
    for (var attr in req.body){
      user[attr] = req.body[attr];
    }
    user.save(function(err, savedUser){
      if(err) return res.status(400).send(err);
      console.log("saved user", savedUser);
    });
    res.send(user);
  });
});






module.exports = router;
