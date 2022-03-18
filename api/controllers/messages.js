const { BASE_URL } = require("../settings");
const { Message } = require("../models/message");
const { User } = require("../models/user");

const getAllMessages = async (req, res) => {
  let messageList = [];

  if (req.user) {
    const { subscribedTo } = await User.findOne(
      { username: req.user.username },
      { subscribedTo: 1, _id: 0 }
    ).exec();
    messageList = await Message.find({
      $or: [
        { username: req.user.username },
        { username: { $in: subscribedTo } },
      ],
    })
      .sort({ published: -1 })
      .exec();
  } else messageList = await Message.find().sort({ published: -1 }).exec();

  const data = messageList.map((item) => {
    return {
      ...item.toObject(),
      url: `${BASE_URL}/messages/${item._id}`,
      userURL: `${BASE_URL}/users/${item.username}`,
    };
  });
  res.json({ data });
};

const newMessage = async (req, res, next) => {
  const { message } = req.body;
  const { username } = req.user;
  typeof message === "undefined" ||
    (typeof username === "undefined" &&
      res.json({ error: "Unsuccessful, user and message is required" }, 400));

  const hashtags = [...new Set(message.match(/#{1}[A-Ö]+/gi))];
  const messageModel = new Message({
    username,
    message,
    hashtags: hashtags.map((tag) => tag.toLowerCase()),
  });

  await messageModel.save();
  res.json({ message: "Message posted successfully" });
};

/* Sort the array of objects gained by the message merge
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

  const data = messageList.map((item) => {
    return {
      ...item.toObject(),
      userURL: `${BASE_URL}/users/${item.username}`,
    };
  });
  res.json({ data });
};

const deleteMessage = async (req, res) => {
  const message = await Message.deleteOne({ _id: req.params.id }).exec();
  message.deletedCount === 0
    ? res.json({ success: "Message deleted" })
    : res.json({ error: "Message not found." }, 404);
};

const likeMessage = async (req, res) => {
  const user = req.user;
  const _id = req.params.id;
  if (!req.params) {
    res.json({ error: "Unsuccessful" }, 400);
  }
  const message = await Message.findById({ _id });

  if (!message?.likes.find((id) => id === user.userId)) {
    await Message.updateOne({ _id }, { $push: { likes: user.userId } }).exec();
  } else {
    await Message.updateOne({ _id }, { $pull: { likes: user.userId } }).exec();
  }

  const updatedMessage = await Message.findById({
    _id,
  });

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
