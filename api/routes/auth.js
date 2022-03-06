const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/users", authController.newUser);
router.get("/api-token", authController.logOutUser);
router.post("/api-token", authController.logInUser);

module.exports = router;
