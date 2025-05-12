const AvaliacaoModel = require('../models/avaliacao.model');
const mongoose = require('mongoose');
const b2bModel = require('../models/b2b.model');
const Produto = require('../models/produto.model');
const Categoria = require('../models/categoria.model');

exports.createStep1 = async (req, res) => {
  try {
    const {nome, email, telefone, local, cidade, estado } = req.body;
    console.log(req.body);
    const novaAvaliacao = new AvaliacaoModel({
      nome,
      email, 
      telefone,
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

exports.getQuantityOfGoodAvaliationsByNivel = async (req, res) => {
  try {
    const count = await AvaliacaoModel.countDocuments({
      $expr: {
        $and: [
          { $gte: [{ $toInt: "$nivel" }, 3] },
          { $gte: [{ $toInt: "$nivel" }, 4] },
          { $lte: [{ $toInt: "$nivel" }, 5] }
        ]
      }
    });

    res.status(200).json({ quantidade: count });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao contar avaliações boas', error });
  }
};


exports.getQuantityOfBadAvaliationsByNivel = async (req, res) => {
  try {
    const count = await AvaliacaoModel.countDocuments({
      $expr: {
        $and: [
          { $lt: [{ $toInt: "$nivel" }, 3] },
          { $lt: [{ $toInt: "$nivel" }, 4] },
          { $lt: [{ $toInt: "$nivel" }, 5] }
        ]
      }
    });

    res.status(200).json({ quantidade: count });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao contar avaliações ruins', error });
  }
};


exports.getQuantityOfBadAvaliationsByNivel = async (req, res) => {
  try {
    const count = await AvaliacaoModel.countDocuments({
      $expr: {
        $and: [
          { $lt: [{ $toInt: "$nivel" }, 0] },
          { $lt: [{ $toInt: "$nivel" }, 1] },
          { $lt: [{ $toInt: "$nivel" }, 2] }
        ]
      }
    });

    res.status(200).json({ quantidade: count });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao contar avaliações ruins', error });
  }
};

exports.getQuantityOfAllAvaliations = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const count = await AvaliacaoModel.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.status(200).json({ quantidade: count });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao contar avaliações dos últimos 30 dias', error });
  }
};

exports.getAvaliacaoTrendsComprariaNovamente = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const data = await AvaliacaoModel.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          comprariaNovamente: { $in: ["sim", "não"] }
        }
      },
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            resposta: "$comprariaNovamente"
          },
          total: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.day",
          respostas: {
            $push: {
              resposta: "$_id.resposta",
              total: "$total"
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          sim: {
            $let: {
              vars: {
                matched: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$respostas",
                        as: "r",
                        cond: { $eq: ["$$r.resposta", "sim"] }
                      }
                    }, 0
                  ]
                }
              },
              in: { $ifNull: ["$$matched.total", 0] }
            }
          },
          nao: {
            $let: {
              vars: {
                matched: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$respostas",
                        as: "r",
                        cond: { $eq: ["$$r.resposta", "não"] }
                      }
                    }, 0
                  ]
                }
              },
              in: { $ifNull: ["$$matched.total", 0] }
            }
          }
        }
      }
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar dados do gráfico', error });
  }
};
