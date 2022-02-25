const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");
const hashtagsRouter = require("./routes/hashtags");
const authRouter = require("./routes/auth");

const app = express();
const PORT = 9000;
const BASE_URL = "http://localhost:9000";
const JWT_SECRET = "iqokjsjfdhncal546dsggba934a2ab2wer";

app.use(cors());
app.use(express.json());

// kontrollerar vilken användare som är inloggad
app.use((req, res, next) => {
  const authHeader = req.header("Authorization");
  // kolla att authHeader är Bearer
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    const token = authHeader.split(" ")[1]; // splitta så vi får ut tokenen
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      error.message === "jwt expired"
        ? res.json({ error: "Token expired" }, 401)
        : error.message === "invalid token"
        ? res.json({ error: "Invalid token" }, 401)
        : res.json({ error: "Uknown error" }, 400);
    }
  }
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);
app.use("/hashtags", hashtagsRouter);
app.use("/auth", authRouter);

const requireLogin = (req, res, next) => {
  req.user ? next() : res.status(401).json({ error: "Unauthorized" });
};

app.get("/secret", requireLogin, (req, res) => {
  res.json({ message: `Hello ${req.user.username}` });
});

mongoose.connect("mongodb://localhost/twitterClone");

app.listen(PORT, () => {
  console.log(`Express running at ${PORT}`);
});
