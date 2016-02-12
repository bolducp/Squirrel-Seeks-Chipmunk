"use strict";

var userMethods = {};

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var Firebase = require('firebase');
var ref = new Firebase('https://meandates.firebaseio.com/');

var User = require('../models/user');


userMethods.generateToken = function() {
  var payload = {
    uid: this.uid,
    _id: this._id
  };
  var token = jwt.encode(payload, JWT_SECRET);

  return token;
};

userMethods.register = function(req, res, next) {
  ref.createUser({email: req.body.email, password: req.body.password}, function(err, userData){
    if (err) return res.status(400).send(err);

    console.log("userData:", userData);
    console.log("req.body:", req.body);
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



module.exports = userMethods;
