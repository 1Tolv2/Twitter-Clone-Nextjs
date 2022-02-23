const express = require("express");

const { Message } = require("../models/message");
const router = express.Router();
const BASE_URL = "http://localhost:9000";

/*
  /:id DELETE
	{ _id: Object
	}
 */

// GET messageList, sorts latest created first
router.get("/", async (req, res) => {
  const messageList = await Message.find().sort({ date: -1 }).exec();
  const data = messageList.map(
    ({ _id, username, message, hashtags, published }) => {
      const url = `${BASE_URL}/messages/${_id}`;
      const userURL = `${BASE_URL}/users/${username}`;
      return { _id, username, message, hashtags, published, url, userURL };
    }
  );
  res.json({ data });
});

// POST message
router.post("/", (req, res, next) => {
  const { username, message } = req.body;
  const hashtags = [...new Set(message.match(/#{1}[A-Ö]+(?=\s|$)/gi))];
  const tweet = new Message({
    username,
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

// GET message
router.get("/:id", async (req, res) => {
  const messageList = await Message.find().sort({ date: -1 }).exec();
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

module.exports = router;
