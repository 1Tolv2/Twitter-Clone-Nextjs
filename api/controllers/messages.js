const { BASE_URL } = require("../settings");
const { Message } = require("../models/message");
const { User } = require("../models/user");

const ObjectId = require("mongodb").ObjectId;

/* Join messages with users and don't get the password
db.messages.aggregate(
  [
    {$match: {} },
    {$lookup: {
        from: 'users',
        localField: 'username',
        foreignField: 'username',
        as: 'user',
      },
    }
  ]
) */
/* Get all messages in subscribedTo and the users messages sorted
db.users.aggregate(
  [
    {$match: {username: req.user.username} },
    // Add req.user.username in subscribedTo array?
    {$unwind: '$subscribedTo'},
    {$lookup: {
        from: 'messages',
        localField: 'subscribedTo',
        foreignField: 'username',
        as: 'messages',
      },
    }
  ]
) */
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

    messageList.map(
      ({
        _id,
        username,
        message,
        hashtags,
        likes,
        dislikes,
        comments,
        published,
      }) => {
        if (username === req.user.username) {
          data.push({
            _id,
            username,
            message,
            hashtags,
            likes,
            dislikes,
            comments,
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
                  likes,
                  dislikes,
                  comments,
                  published,
                  url: `${BASE_URL}/messages/${_id}`,
                  userURL: `${BASE_URL}/users/${username}`,
                })
              : null;
          });
        }
      }
    );
  } else {
    data = messageList.map(
      ({
        _id,
        username,
        message,
        hashtags,
        likes,
        dislikes,
        comments,
        published,
      }) => {
        return {
          _id,
          username,
          message,
          hashtags,
          likes,
          dislikes,
          comments,
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
  const hashtags = [...new Set(message.match(/#{1}[A-Ö]+/gi))];
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
      res.json({ message: "Message posted successfully" });
    }
  });
};

/* Sort the array of objects gaines by the message merge
db.users.aggregate(
  [
    {$match: {username: req.params.id} },
    {$lookup: {
        from: 'messages',
        localField: 'username',
        foreignField: 'username',
        as: 'messages',
      },
    }
  ]
) */
const getUserMessages = async (req, res) => {
  const messageList = await Message.find({ username: req.params.id })
    .sort({ published: -1 })
    .exec();
  const data = messageList.map(
    ({
      _id,
      username,
      message,
      hashtags,
      likes,
      dislikes,
      comments,
      published,
    }) => {
      console.log(likes);
      return {
        _id,
        username,
        message,
        hashtags,
        likes,
        dislikes,
        comments,
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

const likeMessage = async (req, res) => {
  const user = req.user;
  const _id = req.params.id;
  console.log(_id);
  if (!req.params) {
    res.json({ error: "Unsuccessful" }, 400);
  }

  const message = await Message.findById({ _id });
  console.log(message);

  if (!message?.likes.find((id) => id === user.userId)) {
    await Message.updateOne({ _id }, { $push: { likes: user.userId } }).exec();
  } else {
    await Message.updateOne({ _id }, { $pull: { likes: user.userId } }).exec();
  }

  const updatedMessage = await Message.findById({
    _id,
  });
  console.log("UPDATED", updatedMessage);

  res.json({ updatedMessage });
};
const commentMessage = async (req, res) => {};

module.exports = {
  getAllMessages,
  newMessage,
  likeMessage,
  commentMessage,
  getUserMessages,
  deleteMessage,
};
