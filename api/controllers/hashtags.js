const { Message } = require("../models/message");
const { BASE_URL } = require("../settings");

// Needs to be reworked
const getAllHashtags = async (req, res) => {
  const messageList = await Message.find({
    $match: { hashtags: { $not: { $size: 0 } } },
  }).exec();

  const count = await Message.aggregate()
    .unwind("hashtags")
    .group({ _id: "$hashtags", count: { $sum: 1 } })
    .exec();

  const data = count.map((tag) => {
    console.log("TAG:", tag._id);
    const messages = [];

    messageList.forEach((item) => {
      if (item.hashtags.includes(tag._id)) {
        messages.push(item);
      }
    });

    const urlTag = tag._id.replace("#", "%23");

    return {
      tag_name: tag._id,
      count: tag.count,
      messages,
      url: `${BASE_URL}/hashtags/${urlTag}`,
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
