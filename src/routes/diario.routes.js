const { Router } = require('express');
const diarioController = require('../controllers/diario.controller');

const router = Router();

router.get('/diario', diarioController.getAllEntries);
router.post('/diario', diarioController.createEntry);
router.delete('/diario/:id', diarioController.deleteEntry);

module.exports = router;