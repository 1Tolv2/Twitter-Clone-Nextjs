const { BASE_URL } = require("../settings");
const { Message } = require("../models/message");
const { User } = require("../models/user");

const getAllUsersWithMessages = async (req, res) => {
  const data = await User.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "messages",
        localField: "username",
        foreignField: "username",
        as: "messages",
      },
    },
    { $project: { password: 0 } },
  ]);

  data.map((item) => {
    item.url = `${BASE_URL}/users/${item.username}`;
  });
  res.json({ data });
};
const getUserWithMessages = async (req, res) => {
  const data = await User.aggregate([
    { $match: { username: req.params.id } },
    {
      $lookup: {
        from: "messages",
        localField: "username",
        foreignField: "username",
        as: "messages",
      },
    },
    { $project: { password: 0 } },
  ]);

  res.json({ data });
};
// Need improvment
const toggleSubscription = async (req, res) => {
  const loggedInUser = req.user.username;
  const otherUser = req.params.id;
  const subscribers = await User.find({ username: otherUser });

  if (subscribers[0].subscribers.find((name) => name === loggedInUser)) {
    await User.updateOne(
      { username: otherUser },
      { $pull: { subscribers: loggedInUser } }
    );
    await User.updateOne(
      { username: loggedInUser },
      { $pull: { subscribedTo: otherUser } }
    );
    res.json({ messageList: "Successfully unsubscribed" });
  } else {
    await User.updateOne(
      { username: otherUser },
      { $push: { subscribers: loggedInUser } }
    );
    await User.updateOne(
      { username: loggedInUser },
      { $push: { subscribedTo: otherUser } }
    );
    res.json({ messageList: "Successfully subscribed" });
  }
};
const getCurrentUserWithMessages = async (req, res) => {
  const user = await User.findOne({
    username: req.user.username,
  });
  const messageList = await Message.find({ username: req.user.username })
    .select({ username: 0 })
    .sort({ published: 1 })
    .exec();

  res.json({
    data: { user, messageList },
  });
};
const editUserSettings = async (req, res) => {
  const user = req.body;
  const image = req?.file?.path;
  await User.updateOne(
    { username: req.user.username },
    {
      $set: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        image,
        settings: {
          name: user.setting_name,
          email: user.setting_email,
        },
      },
    }
  );
  res.json({ message: "Successfully changed settings" });
};

module.exports = {
  getAllUsersWithMessages,
  getCurrentUserWithMessages,
  editUserSettings,
  getUserWithMessages,
  toggleSubscription,
};
