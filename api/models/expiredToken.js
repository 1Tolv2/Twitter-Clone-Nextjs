const mongoose = require("mongoose");

const expTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
});

const ExpToken = mongoose.model("ExpToken", expTokenSchema);

exports.ExpToken = ExpToken;
