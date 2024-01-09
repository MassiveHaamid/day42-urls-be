const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  longurl: {
    type: String,
  },
  shorturl: {
    type: String,
    unique: true,
  },
  random: {
    type: String,
  },
  createdon: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Url", urlSchema, "urls");
