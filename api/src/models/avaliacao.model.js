const mongoose = require("mongoose");

const avaliacao = new mongoose.Schema(
  {
    idB2B: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2B",
      required: false,
    },
    idProduto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produto",
      required: false,
    },
    idCategoria: {
      type: mongoose.Schema.Types.ObjectId,
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
