const ProdutoModel = require("../models/produto.model");
const moongoose = require("mongoose");

exports.createProduto = async (req, res) => {
try{
  const Produto = new ProdutoModel(req.body);
  if(!Produto.nome || !Produto.idAdmin){
      return res.status(400).json({ message: "Nome and descricao are required" });
  }
  await Produto.save();
  let nome = Produto.nome;
  res.status(200).json({ message: "Produto created successfully", nome });
}catch(error){
    res.status(500).json({ message: "Error creating Produto", error });
  }
};

exports.getAllProduto = async (req, res) => {
  try {
    const Produtos = await ProdutoModel.find();
    res.status(200).json(Produtos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Produtos", error });
  }
}

exports.getProdutoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!moongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const Produto = await ProdutoModel.findById(id);
    if (!Produto) {
      return res.status(404).json({ message: "Produto not found" });
    }
    res.status(200).json(Produto);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Produto", error });
  }
};