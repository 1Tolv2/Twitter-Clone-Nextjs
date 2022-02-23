const express = require("express");
const { User } = require("../models/user");
const { Message } = require("../models/message");

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await User.find().exec();
  // add users messages
  res.json(data);
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.json({ username });
});

module.exports = router;
