const express = require("express");
const { Message } = require("../models/message");
const router = express.Router();

const BASE_URL = "http://localhost:9000";

// GET All hashtags and times used
router.get("/", async (req, res) => {
  const count = await Message.aggregate()
    .unwind("hashtags")
    .group({ _id: "$hashtags", count: { $sum: 1 } })
    .exec();
  const data = count.map((tag) => {
    const urlTag = tag._id.replace("#", "%23");
    return {
      tag_name: tag._id,
      count: tag.count,
      url: `${BASE_URL}/hashtags/${urlTag}`,
    };
  });
  res.json({ data });
});

// GET Hashtag by tag_name
router.get("/:id", async (req, res) => {
  const count = await Message.find({ hashtags: req.params.id })
    .select("_id")
    .exec();

  const messages = [];
  count.map(({ _id }) => {
    messages.push(_id);
  });

  const data = {
    tag_name: req.params.id,
    count: count.length,
    messages,
  };
  res.json({ data });
});

module.exports = router;
