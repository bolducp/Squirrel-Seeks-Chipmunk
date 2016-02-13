"use strict";

var express = require('express');
var Firebase = require('firebase');

var router = express.Router();

var authMiddleware = require('../config/auth');
var User = require('../models/user');
var userMethods = require("../modules/user");

var ref = new Firebase('https://meandates.firebaseio.com/');

var authMiddleware = require("../config/auth");

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

router.get("/search", authMiddleware, function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if(err) return res.status(400).send(err);

    User.find({ gender: { $in: user.seeking }, available: true }, function(err, matches){
      if(err) return res.status(400).send(err);

      findMatch(user.seeking);

      function findMatch(seeking, count){
        if(!count) count = 0;
        var index = Math.floor(Math.random()*matches.length);
        var match = matches[index];
        console.log("user.seeking", user.seeking);
        console.log("user.gender", user.gender);
        console.log("match.seeking", match.seeking);
        if(!(match.seeking.indexOf(user.gender) !== -1) && count < 200){
          console.log("Attemping to find match:", count);
          findMatch(seeking, ++count);
        }
        else{
          if(count < 200){
            console.log("MATCH :", match);
            res.send(match);
          }
          else {
            res.send("could not find user");
          }
        }
      }
    });
  });
});










module.exports = router;
