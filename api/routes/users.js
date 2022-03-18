const express = require("express");
const userController = require("../controllers/users");
const { requireLogin } = require("../controllers/auth");

const router = express.Router();

router.get("/", userController.getAllUsersWithMessages);
router.get("/me", requireLogin, userController.getCurrentUserWithMessages);
router.put("/me/settings", requireLogin, userController.editUserSettings);
router.get("/:id", userController.getUserWithMessages);
router.patch("/:id/subscribe", requireLogin, userController.toggleSubscription);

module.exports = router;
