const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { ExpToken } = require("../models/expiredToken");

const JWT_SECRET = process.env.JWT_SECRET;

const requireLogin = (req, res, next) => {
  req.user ? next() : res.status(401).json({ error: "Unauthorized" });
};

const newUser = async (req, res) => {
  const { username, password } = req.body;
  const modifiedUsername = username?.toLowerCase();

  if (!(username && password)) {
    res
      .status(400)
      .json({ error: "Incorrect data, username and password is required" });
  } else if (await User.findOne({ username: modifiedUsername })) {
    res.status(400).json({ error: "Invalid data, user already exists" });
  } else {
    const user = new User({ username: modifiedUsername, password });
    await user.save();
    res.json({ message: "User created" });
  }
};

const logInUser = async (req, res) => {
  const { username, password } = req.body;
  const modifiedUsername = username.toLowerCase();

  if (!(username && password)) {
    res
      .status(400)
      .json({ error: "Incorrect data, username and password is required" })
      .end();
  } else {
    const user = await User.login(modifiedUsername, password);

    if (user) {
      const userId = user._id.toString();
      const token = jwt.sign(
        { userId, username: modifiedUsername },
        JWT_SECRET,
        {
          expiresIn: "2h",
          subject: userId,
        }
      );
      res.json({ token });
    } else {
      res.status(401).json({
        error: "Validation failed, username or password is incorrect",
      });
    }
  }
};

const logOutUser = (req, res) => {
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
};

module.exports = {
  requireLogin,
  newUser,
  logInUser,
  logOutUser,
};
