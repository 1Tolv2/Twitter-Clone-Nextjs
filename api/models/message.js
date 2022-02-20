const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  message: { type: String, required: true, maxLength: 140 },
  hashtags: { type: Array, required: false },
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

exports.Message = Message;
