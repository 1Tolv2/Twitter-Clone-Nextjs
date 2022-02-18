const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Message } = require("./models/message");
const { User } = require("./models/user");
const bodyParser = require("body-parser");
// const indexRouter = require("./routes/index");

const app = express();
const PORT = 9000;

app.use(cors());
app.use(bodyParser.json());
// app.use("/", indexRouter);

app.get("/", async (req, res) => {
  const data = await Message.find().exec();
  res.send(data);
});

app.post("/", (req, res, next) => {
  const { author, message } = req.body;
  const tweet = new Message({
    author,
    message,
  });
  tweet.save((err) => {
    if (err) {
      console.error("ERROR:", err.errors.message.kind);
      res.status(400).send("Unsuccessful");
      next(err);
    } else {
      res.send("You have mooed successfully");
    }
  });
});

app.get("/users", async (req, res) => {
  const data = await User.find().exec();
  res.send(data);
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({
    username,
    password,
  });
  user.save((err) => {
    if (err) {
      console.error("ERROR:", err.errors.message.kind);
      res.status(400).send("Unsuccessful");
      next(err);
    } else {
      res.send("Welcome to the family!");
    }
  });
});

// connects us to the database
mongoose.connect("mongodb://localhost/twitterClone");

app.listen(PORT, () => {
  console.log(`Express running at ${PORT}`);
});
