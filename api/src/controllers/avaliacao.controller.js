const AvaliacaoModel = require("../models/avaliacao.model");
const mongoose = require("mongoose");
const b2bModel = require("../models/b2b.model");
const Produto = require("../models/produto.model");
const Categoria = require("../models/categoria.model");

exports.createStep1 = async (req, res) => {
  try {
    const { nome, email, telefone, local, cidade, estado } = req.body;
    console.log(req.body);
    const novaAvaliacao = new AvaliacaoModel({
      nome,
      email,
      telefone,
      local,
      cidade,
      estado,
    });

    const saved = await novaAvaliacao.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar avaliação", error });
  }
};

// STEP 2 - Atualizar avaliação com dados do produto, categoria e avaliação
exports.updateStep2 = async (req, res) => {
  try {
    const { idAvaliacao } = req.params;
    const { idProduto, idCategoria, nivel, comprariaNovamente, descricao } =
      req.body;

    const produto = await Produto.findById(idProduto);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    const categoria = await Categoria.findById(idCategoria);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    const avaliacaoAtualizada = await AvaliacaoModel.findByIdAndUpdate(
      idAvaliacao,
      {
        idProduto: produto._id,
        idCategoria: categoria._id,
        nivel,
        comprariaNovamente,
        descricao,
      },
      { new: true }
    );

    res.status(200).json(avaliacaoAtualizada);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar avaliação", error });
  }
};

exports.getAllAvaliacao = async (req, res) => {
  try {
    const avaliacoes = await AvaliacaoModel.find();
    res.status(200).json(avaliacoes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Avaliacoes", error });
  }
};

exports.getAvaliacaoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const avaliacao = await AvaliacaoModel.findById(id);
    if (!avaliacao) {
      return res.status(404).json({ message: "Avaliacao not found" });
    }
    res.status(200).json(avaliacao);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Avaliacao", error });
  }
};

exports.getQuantityOfGoodAvaliationsByNivel = async (req, res) => {
  try {
    const result = await AvaliacaoModel.aggregate([
      {
        $addFields: {
          nivelNumerico: { $toInt: "$nivel" },
        },
      },
      {
        $match: {
          nivelNumerico: { $gt: 3 },
          comprariaNovamente: { $regex: /^sim$/i },
        },
      },
      {
        $count: "quantidade",
      },
    ]);

    const total = result[0]?.quantidade || 0;

    res.status(200).json({
      sucesso: true,
      quantidade: total,
    });
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao buscar avaliações boas",
      error,
    });
  }
};

exports.getQuantityOfBadAvaliationsByNivel = async (req, res) => {
  try {
    const result = await AvaliacaoModel.aggregate([
      {
        $addFields: {
          nivelNumerico: { $toInt: "$nivel" },
        },
      },
      {
        $match: {
          nivelNumerico: { $lt: 3 },
          comprariaNovamente: { $regex: /^n(ã|a)o$/i },
        },
      },
      {
        $count: "quantidade",
      },
    ]);

    const total = result[0]?.quantidade || 0;

    res.status(200).json({
      sucesso: true,
      quantidade: total,
    });
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao buscar avaliações ruins",
      error,
    });
  }
};

exports.getQuantityOfAllAvaliations = async (req, res) => {
  try {
    const agora = new Date();
    const trintaDiasAtras = new Date(
      agora.getTime() - 30 * 24 * 60 * 60 * 1000
    ); // 30 dias em milissegundos
    console.log(trintaDiasAtras);
    console.log(agora);
    const totalAvaliacoes = await AvaliacaoModel.countDocuments({
      createdAt: { $gte: trintaDiasAtras, $lte: agora },
    });
    console.log(totalAvaliacoes);
    if (totalAvaliacoes === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Nenhuma avaliação encontrada nos últimos 30 dias",
      });
    }
    res.status(200).json({
      sucesso: true,
      quantidade: totalAvaliacoes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao buscar avaliações dos últimos 30 dias",
      error,
    });
  }
};

exports.getAvaliacaoTrendsComprariaNovamente = async (req, res) => {
  try {
    const resultado = await AvaliacaoModel.aggregate([
      {
        $addFields: {
          nivelInt: { $toInt: "$nivel" },
          data: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
      },
      // Agrupar por dia
      {
        $group: {
          _id: "$data",
          boas: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gt: ["$nivelInt", 3] },
                    { $eq: ["$comprariaNovamente", "sim"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          ruins: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $lt: ["$nivelInt", 3] },
                    { $eq: ["$comprariaNovamente", "não"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      // Ordenar por data
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({ data: resultado });
  } catch (error) {
    console.error("Erro ao gerar gráfico:", error);
    res.status(500).json({ error: "Erro ao gerar gráfico" });
  }
};
