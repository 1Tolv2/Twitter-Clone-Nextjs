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

module.exports = router;
