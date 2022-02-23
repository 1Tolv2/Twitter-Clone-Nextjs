const express = require("express");
const { User } = require("../models/user");
const { Message } = require("../models/message");

const router = express.Router();
const BASE_URL = "http://localhost:9000";

router.get("/", async (req, res) => {
  const userList = await User.find().select({ username: 1 }).exec();
  const messageList = await Message.find().sort({ published: 1 }).exec();

  const data = userList.map(({ _id, username }) => {
    let userMessageList = [];
    messageList.map((item) => {
      item.username === username && userMessageList.push(item._id);
    });

    const url = `${BASE_URL}/users/${username}`;
    return { _id, username, userMessageList, url };
  });
  res.json({ data });
});

// /:id PUT/PATCH
/* { username: String,
	  password: String
	}

  */

router.get("/:id", (req, res) => {});

module.exports = router;
