const express = require('express');
const connectToDatabase = require('./src/database/connection');
const routes = require('./src/routes/routes');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor rodando com sucesso!');
});

async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, '0.0.0.0', () => {
            console.log('Server running on port 8080');
        });

        app.use('/api', routes);
    } catch (error) {
        console.error('Falha ao iniciar o servidor:', error);
        process.exit(1);
    }
}

startServer();
