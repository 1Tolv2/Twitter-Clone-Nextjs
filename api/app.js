const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");
const hashtagsRouter = require("./routes/hashtags");
const authRouter = require("./routes/auth");

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);
app.use("/hashtags", hashtagsRouter);
app.use("/auth", authRouter);

mongoose.connect("mongodb://localhost/twitterClone");

app.listen(PORT, () => {
  console.log(`Express running at ${PORT}`);
});
