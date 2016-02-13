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
var Chat = require("../models/chat");

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
  res.send(`User: ${req.user}`);
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
    });
    res.send(user);
  });
});

router.get("/search", authMiddleware, function(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if(err) return res.status(400).send(err);

    User.find({ $and: [ {gender: { $in: user.seeking } }, {available: true} , {_id: { $ne: req.user._id} } ]}, function(err, matches){
      if(err) return res.status(400).send(err);

      findMatch(user.seeking);

      function findMatch(seeking, count){
        if(!count) count = 0;
        var index = Math.floor(Math.random()*matches.length);
        var match = matches[index];
        if(!(match.seeking.indexOf(user.gender) !== -1) && count < 200){
          findMatch(seeking, ++count);
        }
        else{
          if(count < 200){
            //initiate or resume chat here
            // var userId = user._id;
            Chat.findOne({$and: [{ users: {$in: [user._id] } }, { users: {$in: [match._id]} } ] }, function(err, chat) {
              if(err) return res.status(400).send(err);
              if(!chat) {
                var chat = new Chat();
                chat.users = [user._id, match._id];
                chat.save(function(err, newChat) {
                  if(err) return res.status(400).send(err);
                  res.send({chat: newChat, match: match, user: user.username});
                });
              }
              else {
                res.send({chat: chat, match: match, user: user.username});
              }
            });
          }
          else {
            res.send("Could not find a match.");
          }
        }
      }
    });
  });
});

router.post("/chat/:chatId", authMiddleware, function(req, res, next) {
  Chat.findById(req.params.chatId, function(err, chat) {
    if(err) return res.status(400).send(err);
    var message = `${req.body.sender}: ${req.body.message}`
    chat.messages.push(message);
    chat.save(function(err, updatedChat) {
      if(err) return res.status(400).send(err);
      res.send(message);
    });
  });
});

router.get("/chat/:chatId", authMiddleware, function(req, res, next) {
  Chat.findById(req.params.chatId, function(err, chat) {
    if(err) return res.status(400).send(err);
    res.send(chat.messages);
  });
});

module.exports = router;
