const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");
const hashtagsRouter = require("./routes/hashtags");
const authRouter = require("./routes/auth");
const { ExpToken } = require("./models/expiredToken");
const { PORT } = require("./settings");

const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(upload.single("image"));
app.use("/uploads", express.static("./uploads"));
app.use(cors());
app.use(express.json());

// kontrollerar vilken användare som är inloggad
app.use(async (req, res, next) => {
  const authHeader = req.header("Authorization");

  // kolla att authHeader är Bearer
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    const token = authHeader.split(" ")[1]; // splitta så vi får ut tokenen
    const tokenLoggedOut = await ExpToken.findOne({ token });
    if (tokenLoggedOut) {
      res.status(401).json({ error: "Invalid token" });
    } else {
      try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return error.message === "jwt expired"
          ? res.status(401).json({ error: "Token expired" })
          : error.message === "invalid token"
          ? res.status(401).json({ error: "Invalid token" })
          : res.status(400).json({ error: "Token error" });
      }
    }
  }

  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);
app.use("/hashtags", hashtagsRouter);
app.use("/auth", authRouter);

mongoose.connect("mongodb://localhost/twitterClone");

app.listen(PORT, () => {
  console.log(`Express running at ${PORT}`);
});
