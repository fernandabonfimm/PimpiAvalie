const B2BModel = require("../models/b2b.model");
const moongoose = require("mongoose");

exports.createB2B = async (req, res) => {
 try{
    const B2B = new B2BModel(req.body);
    if(!B2B.nome || !B2B.email || !B2B.celular || !B2B.cnpj){
        return res.status(400).json({ message: "Email, celular and cnpj are required" });
    }
    await B2B.save();
    res.status(201).json({ message: "B2B created successfully", B2B });
 }catch(error){
    res.status(500).json({ message: "Error creating B2B", error });
  }
};

exports.getB2BById = async (req, res) => {
  try{
    const B2B = await B2BModel.findById(req.params.id);
    if (!B2B) {
      return res.status(404).json({ message: "B2B not found" });
    }
    res.status(200).json(B2B);
  }catch(error){
    res.status(500).json({ message: "Error fetching B2B", error });
  }
};

exports.getAllB2B = async (req, res) => {
  try{
    const B2B = await B2BModel.find();
    if (!B2B) {
      return res.status(404).json({ message: "B2B not found" });
    }
    res.status(200).json(B2B);
  }catch(error){
    res.status(500).json({ message: "Error fetching B2B", error });
  }
}