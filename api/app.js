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

// finds the messageList and sorts by newest first
app.get("/", async (req, res) => {
  const data = await Message.find().sort({ date: -1 }).exec();
  res.send(data);
});

// saves message posts and handles 400 error
app.post("/", (req, res, next) => {
  console.log(req);
  const { author, message } = req.body;
  const tweet = new Message({
    author,
    message,
  });
  tweet.save((err) => {
    if (err) {
      console.error("ERROR:", err.errors.message.kind);
      res
        .status(400)
        .send({ errorMessage: "Unsuccessful, author and message is required" });
      next(err);
    } else {
      res.send({ message: "You have mooed successfully" });
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
      res.status(400).send({ errorMessage: "Unsuccessful" });
      next(err);
    } else {
      res.send({ message: "Successful" });
    }
  });
});

// connects us to the database
mongoose.connect("mongodb://localhost/twitterClone");

app.listen(PORT, () => {
  console.log(`Express running at ${PORT}`);
});
