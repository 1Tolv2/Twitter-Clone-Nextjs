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
router.post("/api-token", async (req, res, next) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    res
      .status(400)
      .json({ error: "Incorrect data, username and password is required" })
      .end();
  } else {
    const user = await User.login(username.toLowerCase(), password);

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
      res
        .status(401)
        .json({ error: "Validation failed, username or password is incorrect" })
        .end();
    }
  }
});

module.exports = router;
