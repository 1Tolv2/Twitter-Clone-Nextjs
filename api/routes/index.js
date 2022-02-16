var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const data = [
    { name: "Me", age: 5 },
    { name: "That guy", age: 2 },
  ];
  res.send(data);
});

module.exports = router;
