const express = require('express');
const app = express();
const PORT = 3000;
const diarioRoutes = require('./routes/diario.routes');

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', (req, res) => {
    res.send({message: 'Página Inicial!'})
});

app.use(diarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});