const express = require("express");
const { Message } = require("../models/message");
const router = express.Router();

router.get("/", async (req, res) => {
  const count = await Message.aggregate([{ $match: { hashtags: /#/ } }])
    .unwind("hashtags")
    .group({ _id: "$hashtags", count: { $sum: 1 } })
    .exec();
  const data = count.map((tag) => {
    return { tag_name: tag._id, count: tag.count };
  });
  res.send(data);
});

module.exports = router;
