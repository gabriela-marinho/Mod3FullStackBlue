
const express = require('express');
const cors = require('cors');

// importar as rotas que eu vou ultilizar
const filmesfavoritosRouter = require('./routes/filmesfavoritos.routes');

const app = express();

app.use(express.json());

app.use(cors());

//inicializar a rota /vagas de acordo com as configuracoes no meu arquivo de rotas
app.use('/filmes', filmesfavoritosRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
