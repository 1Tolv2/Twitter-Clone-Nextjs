const express = require("express");
const jwt = require("jsonwebtoken");

const { Message } = require("../models/message");
const { User } = require("../models/user");
const router = express.Router();

const JWT_SECRET = "iqokjsjfdhncal546dsggba934a2ab2wer";

// finds the messageList and sorts by newest first
router.get("/", async (req, res) => {
  const data = await Message.find().sort({ date: -1 }).exec();
  res.json(data);
});

// saves message posts and handles 400 error
router.post("/", (req, res, next) => {
  const { user_name, message } = req.body;
  const hashtags = [...new Set(message.match(/#{1}[A-Ö]+(?=\s|$)/gi))];
  const tweet = new Message({
    user_name,
    message,
    hashtags,
  });
  tweet.save((err) => {
    if (err) {
      console.error("ERROR:", err.errors.message.kind);
      res
        .status(400)
        .json({ errorMessage: "Unsuccessful, author and message is required" });
      next(err);
    } else {
      res.json({ message: "You have mooed successfully" });
    }
  });
});

router.post("/api-token-auth", async (req, res) => {
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
