const { Router } = require('express');
const diarioController = require('../controllers/diario.controller');

const router = Router();

router.get('/diario', diarioController.getAllEntries);

module.exports = router;