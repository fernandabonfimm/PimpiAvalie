const mongoose = require("mongoose");

const admin = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", admin);
