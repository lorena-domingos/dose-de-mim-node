const express = require('express');
const app = express();
const PORT = 3000;
const diarioRoutes = require('./routes/diario.routes');
const path = require('node:path');

app.use(express.urlencoded({ extended: true }));
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.use(express.static(path.join(__dirname, '../public')));

app.use(diarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});