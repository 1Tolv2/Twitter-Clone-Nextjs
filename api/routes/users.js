const express = require("express");
const { User } = require("../models/user");
const { Message } = require("../models/message");

const router = express.Router();
const BASE_URL = "http://localhost:9000";

const requireLogin = (req, res, next) => {
  req.user ? next() : res.status(401).json({ error: "Unauthorized" });
};

// GET userlist
router.get("/", async (req, res) => {
  const userList = await User.find().select({ username: 1 }).exec();
  const messageList = await Message.find().sort({ published: 1 }).exec();

  const data = userList.map(({ _id, username }) => {
    let userMessageList = [];
    messageList.map((item) => {
      item.username === username && userMessageList.push(item._id);
    });

    return {
      _id,
      username,
      userMessageList,
      url: `${BASE_URL}/users/${username}`,
    };
  });
  res.json({ data });
});

router.get("/me", async (req, res) => {
  if (req.user) {
    const { _id, username, subscribedTo } = await User.findOne({
      username: req.user.username,
    }).select({ username: 1, subscribedTo: 1 });

    const messageList = await Message.find({ username: req.user.username })
      .select({ username: 0 })
      .sort({ published: 1 })
      .exec();
    res.json({
      data: {
        _id,
        username,
        subscribedTo,
        messageList,
      },
    });
  }
});

// /:id/settings PUT/PATCH kräver verifiering
/* { username: String,
	  password: String
	}*/

// GET user by id
router.get("/:id", async (req, res) => {
  const user = await User.findOne({ username: req.params.id })
    .select("username")
    .exec();
  console.log(user);
  const messageList = await Message.find({ username: req.params.id })
    .sort({ published: 1 })
    .exec();

  res.json({
    data: [{ _id: user[0]._id, username: user[0].username, messageList }],
  });
});

module.exports = router;
