const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const hashtagsRouter = require("./routes/hashtags");

const app = express();
const PORT = 9000;

app.use(cors());
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/hashtags", hashtagsRouter);

// connects us to the database
mongoose.connect("mongodb://localhost/twitterClone");

app.listen(PORT, () => {
  console.log(`Express running at ${PORT}`);
});
