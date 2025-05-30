const mongoose = require("mongoose");

const avaliacao = new mongoose.Schema(
  {
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
    nome:{
      type: String,
      required: false,
    },
    email:{
      type: String,
      required: false,
    },
    telefone:{
      type: String,
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
