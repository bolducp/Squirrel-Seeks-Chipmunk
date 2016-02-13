'use strict';

var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  messages: [String]
});

var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
