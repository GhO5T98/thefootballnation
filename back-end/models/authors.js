const mongoose = require("mongoose");

const authorsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Authors = mongoose.model("Authors", authorsSchema);
module.exports = Authors;
