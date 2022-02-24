const express = require("express");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const router = express.Router();
const JWT_SECRET = "iqokjsjfdhncal546dsggba934a2ab2wer";

// POST creates user
router.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const lowerCaseUsername = username.toLowerCase();
  const user = new User({ username: lowerCaseUsername, password });
  await user.save();
  res.json({ username: lowerCaseUsername, message: "User created" });
});

// POST logs in user
router.post("/api-token", async (req, res) => {
  const { username, password } = req.body;
  const lowerCaseUsername = username.toLowerCase();
  const user = await User.login(lowerCaseUsername, password);
  if (user) {
    const userId = user._id.toString();
    const token = jwt.sign(
      { userId, username: lowerCaseUsername },
      JWT_SECRET,
      {
        expiresIn: 120,
        subject: userId,
      }
    );
    res.json({ token });
  } else {
    res.sendStatus(401); // Unauthorized
  }
});

module.exports = router;
