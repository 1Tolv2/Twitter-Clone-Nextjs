const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_image: String,
  subscribedTo: [{ user: { type: String } }],
});

// overwrites the password with a encrypted version
userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10); // encrypts the password
  this.password = hash; // overwrites the password
  next(); // continue to next middleware
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user && password && (await bcrypt.compare(password, user.password))) {
    return user;
  } else {
    return null;
  }
};

const User = mongoose.model("User", userSchema);

exports.User = User;
