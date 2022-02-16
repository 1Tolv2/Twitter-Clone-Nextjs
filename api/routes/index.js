const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  const data = [
    { name: "Me", age: 10 },
    { name: "That guy", age: 10 },
  ];
  res.send(data);
});

module.exports = router;
