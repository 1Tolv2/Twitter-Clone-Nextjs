const express = require("express");
const { getAllHashtags, getHashtag } = require("../controllers/hashtags");

const router = express.Router();

router.get("/", getAllHashtags);
router.get("/:id", getHashtag);

module.exports = router;
