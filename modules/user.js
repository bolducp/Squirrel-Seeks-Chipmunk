"use strict";

var userMethods = {};

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var Firebase = require('firebase');
var ref = new Firebase('https://meandates.firebaseio.com/');

var User = require('../models/user');


userMethods.generateToken = function(tokenData) {
  var payload = {
    uid: tokenData.uid,
    _id: tokenData._id
  };
  var token = jwt.encode(payload, JWT_SECRET);
  return token;
};

userMethods.register = function(req, res, next) {
  ref.createUser({email: req.body.email, password: req.body.password}, function(err, userData){
    if (err) return res.status(400).send(err);

    var userObj = {
      email: req.body.email,
      username: req.body.username,
      uid: userData.uid
    };
    User.create(userObj, function(err){
      if (err) return res.status(400).send(err);
      next();
    });
  });
}

userMethods.login = function(req, res, next) {
  console.log("req.body", req.body);
  ref.authWithPassword(req.body, function(err, authData) {
    if (err) return res.status(400).send(err);
    User.findOne({uid: authData.uid}, function(err, user) {
      var tokenData = {uid: authData.uid, _id: user._id};
      res.cookie("userToken", userMethods.generateToken(tokenData));
      next();
      console.log("auth data", authData);
    });
  });
}



module.exports = userMethods;
