const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.get("/users", async (req, res) => {
  const data = await User.find().exec();
  res.send(data);
});

router.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({
    username,
    password,
  });
  user.save((err) => {
    if (err) {
      console.error("ERROR:", err.errors.message.kind);
      res.status(400).send({ errorMessage: "Unsuccessful" });
      next(err);
    } else {
      res.send({ message: "Successful" });
    }
  });
});

module.exports = router;
