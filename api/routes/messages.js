const express = require("express");
const messagesController = require("../controllers/messages");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", messagesController.getAllMessages);
router.post("/", authController.requireLogin, messagesController.newMessage);
router.get("/:id", messagesController.getUserMessages);
router.delete(
  "/:id",
  authController.requireLogin,
  messagesController.deleteMessage
);
router.get(
  "/:id/like",
  authController.requireLogin,
  messagesController.likeMessage
);
router.post(
  "/:id/comment",
  authController.requireLogin,
  messagesController.commentMessage
);

module.exports = router;
