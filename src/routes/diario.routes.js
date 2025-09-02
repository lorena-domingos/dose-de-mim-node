const { Router } = require('express');
const diarioController = require('../controllers/diario.controller');

const router = Router();

router.get('/diario', diarioController.getAllEntries);
router.get('/diario/:id', diarioController.getAnEntry);
router.post('/diario', diarioController.createEntry);
router.put('/diario/:id', diarioController.editEntry);
router.delete('/diario/:id', diarioController.deleteEntry);

module.exports = router;