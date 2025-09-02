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

const deleteEntry = (req, res) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM diario WHERE id = ?";
    const stmt = db.prepare(query);
    const deletarDiario = stmt.run(id);

    if (deletarDiario.changes > 0) {
      res.status(200).json({ message: "Entrada apagada com sucesso!" });
    }
    else {
      res.status(404).json({ message: 'Erro ao apagar entrada do diário.' });
    }
  } catch (error) {
    console.log("Erro ao encontrar a id do diário.", error);
    res.status(500).json({ menssage: "Erro ao solicitar id no diário" });
  }
};

const getAnEntry = (req, res) => {
  try {
    const { id } = req.params;

    const query = "SELECT title, content FROM diario WHERE id = ?";
    const stmt = db.prepare(query);
    const pegarDados = stmt.get(id);

    if (pegarDados) {
      res.status(200).json({
        message: 'Valor encontrado!',
        data: pegarDados
      });
    }
  } catch (error) {
    console.log('Falha ao encontrar o diário.', error);
    res.status(500).json({
      message: 'Falha ao encontrar os dados;'
    });
  }
};

const editEntry = (req, res) => {
  try {
    const {title, content} = req.body;
    const { id } = req.params;

     const diaryId = parseInt(id, 10);
    if (isNaN(diaryId)) {
        return res.status(400).json({ message: 'ID de diário inválido.' });
    }

    const query = "UPDATE diario SET title = ?, content = ? WHERE id = ?";
    const stmt = db.prepare(query);
    const editarEntrada = stmt.run(title, content, diaryId);

    if (editarEntrada) {
      res.status(200).json({
        message: 'Entrada editada com sucesso!'
      })
    }
  } catch (error) {
    console.log('Falha ao editar a entrada.', error);
    res.status(500).json({
      message: 'Falha ao encontrar a entrada'
    });
  }
};

module.exports = {
  getAllEntries,
  createEntry,
  deleteEntry,
  getAnEntry,
  editEntry
};