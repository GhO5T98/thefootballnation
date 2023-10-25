const mongoose = require("mongoose");

const allNewsSchema = new mongoose.Schema(
  {
    newsTitle: {
      type: String,
      require: true,
    },
    compTag: {
      type: String,
      require: true,
    },
    tagCol: {
      type: String,
      require: true,
    },
    firstHead: {
      type: String,
      require: true,
    },
    secHead: {
      type: String,
      require: true,
    },
    firstP: {
      type: String,
      require: true,
    },
    secP: {
      type: String,
      require: true,
    },
    hashtags: {
      type: [String],
      required: true
    },
    image: {
      type: String,
      require: true,
    },
    createdBy: {
      type:String,
      require:true,
    },
  },
  { timestamps: true }
);

const AllNews = mongoose.model("AllNews", allNewsSchema);
module.exports = AllNews;
