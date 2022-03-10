const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true, lowercase: true },
  message: { type: String, required: true, maxLength: 140 },
  hashtags: { type: Array, required: false },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: { type: Array, required: false },
  published: { type: Date, default: Date.now, required: true },
});

const Message = mongoose.model("Message", messageSchema);

exports.Message = Message;
