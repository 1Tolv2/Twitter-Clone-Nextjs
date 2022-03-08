const { BASE_URL } = require("../settings");
const { Message } = require("../models/message");
const { User } = require("../models/user");

// Needs to be reworked
const getAllMessages = async (req, res) => {
  const messageList = await Message.find().sort({ published: -1 }).exec();
  let data = [];

  if (req.user) {
    const { subscribedTo } = await User.findOne(
      {
        username: req.user.username,
      },
      { subscribedTo: 1, _id: 0 }
    ).exec();

    messageList.map(({ _id, username, message, hashtags, published }) => {
      if (username === req.user.username) {
        data.push({
          _id,
          username,
          message,
          hashtags,
          published,
          url: `${BASE_URL}/messages/${_id}`,
          userURL: `${BASE_URL}/users/${username}`,
        });
      } else {
        subscribedTo.map((user) => {
          username === user
            ? data.push({
                _id,
                username,
                message,
                hashtags,
                published,
                url: `${BASE_URL}/messages/${_id}`,
                userURL: `${BASE_URL}/users/${username}`,
              })
            : null;
        });
      }
    });
  } else {
    data = messageList.map(
      ({ _id, username, message, hashtags, published }) => {
        return {
          _id,
          username,
          message,
          hashtags,
          published,
          url: `${BASE_URL}/messages/${_id}`,
          userURL: `${BASE_URL}/users/${username}`,
        };
      }
    );
  }
  res.json({ data });
};
// Check error handeling
const newMessage = (req, res, next) => {
  const { message } = req.body;
  const { username } = req.user;
  const hashtags = [...new Set(message.match(/#{1}[A-Ö]+(?=\s|$)/gi))];
  const messageModel = new Message({
    username,
    message,
    hashtags: hashtags.map((tag) => tag.toLowerCase()),
  });
  messageModel.save((error) => {
    if (error) {
      res.json({ error: "Unsuccessful, user and message is required" }, 400);
      next(error);
    } else {
      res.json({ message: "You have mooed successfully" });
    }
  });
};
const getUserMessages = async (req, res) => {
  const messageList = await Message.find({ _id: req.params.id })
    .sort({ date: -1 })
    .exec();
  const data = messageList.map(
    ({ _id, username, message, hashtags, published }) => {
      return {
        _id,
        username,
        message,
        hashtags,
        published,
        userURL: `${BASE_URL}/users/${username}`,
      };
    }
  );
  res.json(data);
};
const deleteMessage = async (req, res) => {
  const message = await Message.deleteOne({ _id: req.params.id }).exec();
  if (message.deletedCount === 0) {
    res.json({ success: "Message deleted" });
  } else {
    res.json({ error: "Message not found." }, 404);
  }
};

module.exports = { getAllMessages, newMessage, getUserMessages, deleteMessage };
