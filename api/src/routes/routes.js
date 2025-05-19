const express = require("express");
const router = express.Router();
const {
  createAdmin,
  loginAdmin,
  getIdById,
} = require("../controllers/admin.controller");
const {
  createB2B,
  getAllB2B,
  getB2BById,
} = require("../controllers/b2b.controller");
const {
  createCategoria,
  getAllCategoria,
  getCategoriaById,
} = require("../controllers/categoria.controller");
const {
  createProduto,
  getAllProduto,
  getProdutoById,
} = require("../controllers/produto.controller");
const {
  createStep1,
  updateStep2,
  getAllAvaliacao,
  getAvaliacaoById,
  getQuantityOfGoodAvaliationsByNivel,
  getQuantityOfBadAvaliationsByNivel,
  getQuantityOfAllAvaliations,
  getAvaliacaoTrendsComprariaNovamente,
} = require("../controllers/avaliacao.controller");
// Admin routes
router.post("/admin", createAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/:id", getIdById);

// B2B routes
router.post("/b2b", createB2B);
router.get("/b2b", getAllB2B);
router.get("/b2b/:id", getB2BById);

// Categoria routes
router.post("/categoria", createCategoria);
router.get("/categoria", getAllCategoria);
router.get("/categoria/:id", getCategoriaById);

// Produto routes
router.post("/produto", createProduto);
router.get("/produto", getAllProduto);
router.get("/produto/:id", getProdutoById);

// Avaliacao routes
router.post("/avaliacao/step1", createStep1);
router.put("/avaliacao/step2/:idAvaliacao", updateStep2);
router.get("/avaliacao", getAllAvaliacao);
router.get("/avaliacao/:id", getAvaliacaoById);
router.get("/avaliacao/quantidade/bom", getQuantityOfGoodAvaliationsByNivel);
router.get("/avaliacao/quantidade/ruim", getQuantityOfBadAvaliationsByNivel);
router.get("/avaliacao/quantidade/todas", getQuantityOfAllAvaliations);
router.get("/avaliacao/grafico/all", getAvaliacaoTrendsComprariaNovamente);

module.exports = router;
