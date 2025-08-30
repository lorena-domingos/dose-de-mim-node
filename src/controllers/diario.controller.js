const db = require('../database/connection');

const getAllEntries = (req, res) => {
  try {
    const query = "SELECT * FROM diario ORDER BY createdAt DESC";
    const stmt = db.prepare(query);
    const diario = stmt.all();
    res.status(200).json(diario);
  } catch {
    console.log("Falha ao buscar dados.");
    res.status(500).json({message: 'Falha ao encontrar os dados.'});
  }
};

const createEntry = (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(404).json({ message: 'Você deve preencher ao menos um campo.' });
        }

        const query = "INSERT INTO diario (title, content) VALUES (?, ?)";
        const stmt = db.prepare(query);
        const criarDiario = stmt.run(title, content);

        console.log(`Última entrada com o id ${criarDiario.lastInsertRowid}`);

        res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar entrada.', error);
        res.status(500).json({message: 'Erro ao criar entrada no diário.'});
    }
};

module.exports = {
  getAllEntries,
  createEntry
};