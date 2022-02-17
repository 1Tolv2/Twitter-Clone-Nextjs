const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // add schema code
});

const User = mongoose.model("User", userSchema);

exports.User = User;
