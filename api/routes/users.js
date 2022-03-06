const express = require("express");
const userController = require("../controllers/users");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", userController.getAllUsersWithMessages);
router.get(
  "/me",
  authController.requireLogin,
  userController.getCurrentUserWithMessages
);
router.put(
  "/me/settings",
  authController.requireLogin,
  userController.editUserSettings
);
router.get("/:id", userController.getUserWithMessages);
router.patch(
  "/:id/subscribe",
  authController.requireLogin,
  userController.toggleSubscription
);

module.exports = router;
