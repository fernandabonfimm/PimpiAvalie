const mongoose = require("mongoose");

const avaliacao = new mongoose.Schema(
  {
    idB2B: {
      type: ObjectId,
      ref: "B2B",
      required: false,
    },
    idProduto: {
      type: ObjectId,
      ref: "Produto",
      required: false,
    },
    idCategoria: {
      type: ObjectId,
      ref: "Categoria",
      required: false,
    },
    local: {
      type: String,
      required: false,
    },
    cidade: {
      type: String,
      required: false,
    },
    estado: {
      type: String,
      required: false,
    },
    nivel: {
      type: String,
      required: false,
    },
    comprariaNovamente: {
      type: String,
      required: false,
    },
    descricao: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Avaliação", avaliacao);
