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
  const user = new User({
    username,
    password,
  });
  user.save((err) => {
    if (err) {
      console.error("ERROR:", err.errors.message.kind);
      res.status(400).json({ errorMessage: "Unsuccessful" });
      next(err);
    } else {
      res.json({ message: "Successful" });
    }
  });
});

module.exports = router;
