const express = require("express");
const { User } = require("../models/user");
const { Message } = require("../models/message");
const { BASE_URL } = require("../settings");

const router = express.Router();

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

router.get("/me", requireLogin, async (req, res) => {
  const user = await User.findOne({
    username: req.user.username,
  });
  const messageList = await Message.find({ username: req.user.username })
    .select({ username: 0 })
    .sort({ published: 1 })
    .exec();

  //add messages to user return data
  res.json({
    data: { user },
  });
});

router.get("/me/settings", requireLogin, async (req, res) => {
  const data = await User.findOne({ username: req.user.username });
  res.json({ data });
});

// PATCH update user settings, recieve profile image
router.put("/me/settings", requireLogin, async (req, res) => {
  const user = req.body;
  const image = req.file.path;
  console.log("USER:", req);
  console.log("IMAGE:", image);
  await User.updateOne(
    { username: req.user.username },
    {
      $set: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        image,
      },
    }
  );
  res.json({ message: "Successful upload" });
});

// GET user by id
router.get("/:id", async (req, res) => {
  const {
    _id,
    username,
    firstname,
    lastname,
    email,
    image,
    settings,
    subscribedTo,
    subscribers,
  } = await User.findOne({ username: req.params.id }).exec();

  const messageList = await Message.find({ username: req.params.id })
    .sort({ published: 1 })
    .exec();
  res.json({
    data: {
      userId: _id,
      username,
      name: firstname + lastname,
      email,
      image,
      settings,
      subscribedTo,
      subscribers,
      messageList,
    },
  });
});

// Able to subscribe to but does not prevent non unique subscriptions
router.patch("/:id/subscribe", async (req, res) => {
  if (req.user) {
    const loggedInUser = req.user.username;
    const otherUser = req.params.id;
    console.log(loggedInUser);
    await User.updateOne(
      { username: otherUser },
      { $push: { subscribers: loggedInUser } }
    );
    await User.updateOne(
      { username: loggedInUser },
      { $push: { subscribedTo: otherUser } }
    );
    res.json({ messageList: "Logged in" });
  } else {
    res.json(
      {
        error:
          "No user logged in, check that bearer token is provided correctly",
      },
      400
    );
  }
});
router.post("/:id/subscriptions", async (req, res) => {});

module.exports = router;
