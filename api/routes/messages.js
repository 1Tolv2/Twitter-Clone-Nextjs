const express = require("express");
const messagesController = require("../controllers/messages");
const { requireLogin } = require("../controllers/auth");

const router = express.Router();

router.get("/", messagesController.getAllMessages);
router.post("/", requireLogin, messagesController.newMessage);
router.get("/:id", messagesController.getUserMessages);
router.delete("/:id", requireLogin, messagesController.deleteMessage);
router.get("/:id/like", requireLogin, messagesController.likeMessage);
router.post("/:id/comment", requireLogin, messagesController.commentMessage);

module.exports = router;
