const CategoriaModel = require("../models/categoria.model");
const moongoose = require("mongoose");

exports.createCategoria = async (req, res) => {
try{
  const categoria = new CategoriaModel(req.body);
  if(!categoria.nome){
      return res.status(400).json({ message: "Nome is required" });
  }
  await categoria.save();
  res.status(200).json({ message: "Categoria created successfully", categoria });
}catch(error){
    res.status(500).json({ message: "Error creating Categoria", error });
  }
};

exports.getCategoriaById = async (req, res) => {
  try{
    const categoria = await CategoriaModel.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria not found" });
    }
    res.status(200).json(categoria);
  }catch(error){
    res.status(500).json({ message: "Error fetching Categoria", error });
  }
};

exports.getAllCategoria = async (req, res) => {
  try{
    const categoria = await CategoriaModel.find();
    if (!categoria) {
      return res.status(404).json({ message: "Categoria not found" });
    }
    res.status(200).json(categoria);
  }catch(error){
    res.status(500).json({ message: "Error fetching Categoria", error });
  }
};