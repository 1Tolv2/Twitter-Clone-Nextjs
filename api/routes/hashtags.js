const express = require("express");
const hashtagController = require("../controllers/hashtags");

const router = express.Router();

router.get("/", hashtagController.getAllHashtags);
router.get("/:id", hashtagController.getHashtag);

module.exports = router;
