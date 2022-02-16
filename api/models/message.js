const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: { type: String, required: true },
  message: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

exports.Message = Message;
