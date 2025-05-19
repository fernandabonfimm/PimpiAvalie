const mongoose = require('mongoose');

const produto = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        valor:{
            type: String,
            required: false,
        },
        idCategoria:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categoria',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Produto', produto);
