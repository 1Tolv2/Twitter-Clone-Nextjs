const express = require("express");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { ExpToken } = require("../models/expiredToken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// POST creates user
router.post("/users", async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res
      .status(400)
      .json({ error: "Incorrect data, username and password is required" });
  } else if (await User.findOne({ username })) {
    res.status(400).json({ error: "Invalid data, user already exists" });
  } else {
    const user = new User({ username, password });
    await user.save();
    res.json({ message: "User created" });
  }
});

// POST logs in user
router.post("/api-token", async (req, res, next) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res
      .status(400)
      .json({ error: "Incorrect data, username and password is required" })
      .end();
  } else {
    const user = await User.login(username, password);
    if (user) {
      const userId = user._id.toString();
      const token = jwt.sign({ userId, username }, JWT_SECRET, {
        expiresIn: "2h",
        subject: userId,
      });
      res.json({ token });
    } else {
      res
        .status(401)
        .json({ error: "Validation failed, username or password is incorrect" })
        .end();
    }
  }
});

// GET logout user (expire token)
router.get("/api-token", async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  if (req.user) {
    const expToken = new ExpToken({ token });
    expToken.save((error) => {
      if (error) {
        res.json({ error: "Token expiration unsuccessful" }, 400);
        next(error);
      }
    });
    res.json({ message: "Token expired successfully" });
  }
});

module.exports = router;
