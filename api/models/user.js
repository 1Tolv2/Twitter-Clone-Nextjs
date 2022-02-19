const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  user_password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
