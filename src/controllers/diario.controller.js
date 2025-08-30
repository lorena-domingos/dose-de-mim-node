const getAllEntries = (req, res) => {
  const fakeEntries = [
    { id: 1, title: 'Meu primeiro dia', content: 'Foi incrível!' },
    { id: 2, title: 'Ideia genial', content: 'Tive uma ideia para um novo app...' },
  ];

  res.status(200).json(fakeEntries);
};

module.exports = {
  getAllEntries,
};