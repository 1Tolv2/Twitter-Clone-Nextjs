const { Message } = require("../models/message");
const { BASE_URL } = require("../settings");

// Needs to be reworked
const getAllHashtags = async (req, res) => {
  const messageList = await Message.find({
    $match: { hashtags: { $not: { $size: 0 } } },
  }).exec();

  let count = [];
  if (req.query.limit) {
    const limit = req.query.limit;
    count = await Message.aggregate([
      { $match: {} },
      { $unwind: "$hashtags" },
      { $group: { _id: "$hashtags", count: { $count: {} } } },
      { $sort: { count: -1 } },
      { $limit: parseInt(limit) },
    ]).exec();
  } else {
    count = await Message.aggregate([
      { $match: {} },
      { $unwind: "$hashtags" },
      { $group: { _id: "$hashtags", count: { $count: {} } } },
      { $sort: { count: -1 } },
    ]).exec();
  }

  const data = count.map((tag) => {
    const messages = messageList.filter((item) =>
      item.hashtags.includes(tag._id)
    );
    return {
      tag_name: tag._id,
      count: tag.count,
      messages,
      url: `${BASE_URL}/hashtags/${tag._id.replace("#", "%23")}`,
    };
  });
  res.json({ data });
};

const getHashtag = async (req, res) => {
  const messageList = await Message.find({ hashtags: req.params.id }).exec();
  res.json({
    data: {
      tag_name: req.params.id,
      count: messageList.length,
      messages: messageList,
    },
  });
};

module.exports = { getAllHashtags, getHashtag };
