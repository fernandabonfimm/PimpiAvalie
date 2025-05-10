const mongoose = require('mongoose');

const categoria = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        idAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Categoria', categoria);
