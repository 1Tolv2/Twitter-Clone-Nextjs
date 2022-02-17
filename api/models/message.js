const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: { type: String, required: true },
  message: { type: String, required: true, maxLength: 140 },
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

exports.Message = Message;
