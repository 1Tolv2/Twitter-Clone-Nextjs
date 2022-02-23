const express = require("express");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const router = express.Router();
const JWT_SECRET = "iqokjsjfdhncal546dsggba934a2ab2wer";

// create user
router.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.json({ username, message: "User created" });
});

// login user
router.post("/api-token", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.login(username, password);
  if (user) {
    const userId = user._id.toString();
    const token = jwt.sign({ userId, username: username }, JWT_SECRET, {
      expiresIn: 120,
      subject: userId,
    });
    res.json({ token });
  } else {
    res.sendStatus(401); // Unauthorized
  }
});

module.exports = router;
