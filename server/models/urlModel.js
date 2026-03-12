const mangoose = require("mangoose");

const urlSchema = new mangoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },

  clicks: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mangoose.model("Url", urlSchema);
