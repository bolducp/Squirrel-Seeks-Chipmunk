'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var userSchema = new mongoose.Schema({
  uid: String,
  username: {type: String, required: true},
  email: {type: String, required: true},
  location: {type: Number},
  dob: {type: Date},
  likes: [String],
  dislikes: [String]
});


var User = mongoose.model('User', userSchema);

module.exports = User;
