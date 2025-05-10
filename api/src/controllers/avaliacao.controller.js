const AvaliacaoModel = require('../models/avaliacao.model');
const mongoose = require('mongoose');
const b2bModel = require('../models/b2b.model');
const Produto = require('../models/produto.model');
const Categoria = require('../models/categoria.model');

exports.createStep1 = async (req, res) => {
  try {
    const { local, cidade, estado } = req.body;

    const novaAvaliacao = new AvaliacaoModel({
      local,
      cidade,
      estado
    });

    const saved = await novaAvaliacao.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar avaliação', error });
  }
};

// STEP 2 - Atualizar avaliação com dados do produto, categoria e avaliação
exports.updateStep2 = async (req, res) => {
  try {
    const { idAvaliacao } = req.params;
    const {
      idProduto,
      idCategoria,
      nivel,
      comprariaNovamente,
      descricao
    } = req.body;

    const produto = await Produto.findById(idProduto);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    const categoria = await Categoria.findById(idCategoria);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    const avaliacaoAtualizada = await AvaliacaoModel.findByIdAndUpdate(
      idAvaliacao,
      {
        idProduto: produto._id,
        idCategoria: categoria._id,
        nivel,
        comprariaNovamente,
        descricao
      },
      { new: true }
    );

    res.status(200).json(avaliacaoAtualizada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar avaliação', error });
  }
};

exports.getAllAvaliacao = async (req, res) => {
    try {
        const avaliacoes = await AvaliacaoModel.find();
        res.status(200).json(avaliacoes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Avaliacoes', error });
    }
}

exports.getAvaliacaoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const avaliacao = await AvaliacaoModel.findById(id);
        if (!avaliacao) {
            return res.status(404).json({ message: 'Avaliacao not found' });
        }
        res.status(200).json(avaliacao);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Avaliacao', error });
    }
}