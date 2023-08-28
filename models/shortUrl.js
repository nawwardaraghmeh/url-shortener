// creating mongoose model for storing short urls
const mongoose = require("mongoose");
const shortId = require("shortid");

// defining the shorturl schema
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
