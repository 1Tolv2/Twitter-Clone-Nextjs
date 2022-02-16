const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Message } = require("./models/message");
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

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("You have mooed successfully");
});

// connects us to the database
mongoose.connect("mongodb://localhost/twitterClone");

app.listen(PORT, () => {
  console.log(`Express running at ${PORT}`);
});
