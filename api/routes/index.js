const express = require("express");
const { Message } = require("../models/message");
const router = express.Router();

// finds the messageList and sorts by newest first
router.get("/", async (req, res) => {
  const data = await Message.find().sort({ date: -1 }).exec();
  res.send(data);
});

// saves message posts and handles 400 error
router.post("/", (req, res, next) => {
  const { author, message } = req.body;
  const hashtags = [...new Set(message.match(/#{1}[A-Ö]+(?=\s|$)/gi))];
  console.log(hashtags);
  const tweet = new Message({
    author,
    message,
    hashtags,
  });
  tweet.save((err) => {
    if (err) {
      console.error("ERROR:", err.errors.message.kind);
      res
        .status(400)
        .send({ errorMessage: "Unsuccessful, author and message is required" });
      next(err);
    } else {
      res.send({ message: "You have mooed successfully" });
    }
  });
});

module.exports = router;
