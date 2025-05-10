const mongoose = require("mongoose");

const b2b = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    celular: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("B2B", b2b);
