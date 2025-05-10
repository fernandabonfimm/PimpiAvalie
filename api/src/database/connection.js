const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDatabase() {
    const dbUri = process.env.PRODUCTION_DB_URI || process.env.LOCAL_DB_URI;

    try {
        await mongoose.connect(dbUri);
    } catch (error) {
        console.error(`Erro ao conectar ao banco de dados: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectToDatabase;
