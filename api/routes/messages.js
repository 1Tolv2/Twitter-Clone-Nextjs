const express = require("express");

const { Message } = require("../models/message");
const router = express.Router();
const BASE_URL = "http://localhost:9000";

const requireLogin = (req, res, next) => {
  req.user ? next() : res.status(401).json({ error: "Unauthorized" });
};

// GET messageList, sorts latest created first
router.get("/", async (req, res) => {
  const messageList = await Message.find().sort({ date: -1 }).exec();
  const data = messageList.map(
    ({ _id, username, message, hashtags, published }) => {
      return {
        _id,
        username,
        message,
        hashtags,
        published,
        url: `${BASE_URL}/messages/${_id}`,
        userURL: `${BASE_URL}/users/${username}`,
      };
    }
  );
  res.json({ data });
});

// POST message
router.post("/", requireLogin, (req, res, next) => {
  const { message } = req.body;
  const { username } = req.user;
  const hashtags = [...new Set(message.match(/#{1}[A-Ö]+(?=\s|$)/gi))];
  const messageModel = new Message({
    username,
    message,
    hashtags: hashtags.map((tag) => tag.toLowerCase()),
  });
  messageModel.save((error) => {
    if (error) {
      res.json({ error: "Unsuccessful, user and message is required" }, 400);
      next(error);
    } else {
      res.json({ message: "You have mooed successfully" });
    }
  });
});

// GET message by id
router.get("/:id", async (req, res) => {
  const messageList = await Message.find({ _id: req.params.id })
    .sort({ date: -1 })
    .exec();
  const data = messageList.map(
    ({ _id, username, message, hashtags, published }) => {
      return {
        _id,
        username,
        message,
        hashtags,
        published,
        userURL: `${BASE_URL}/users/${username}`,
      };
    }
  );
  res.json(data);
});

// DELETE deletes message by id
router.delete("/:id", requireLogin, async (req, res) => {
  const message = await Message.deleteOne({ _id: req.params.id }).exec();
  console.log(message.deletedCount);
  if (message.deletedCount === 0) {
    res.json({ success: "Message deleted" });
  } else {
    res.json({ error: "Message not found." }, 404);
  }
});

module.exports = router;
