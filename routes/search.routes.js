const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const secure = require('../middlewares/secure.middleware');

router.get('/', secure.isAuthenticated, searchController.filter);

router.get('/:id', secure.isAuthenticated, searchController.newExchange);

module.exports = router;