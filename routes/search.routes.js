const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const secure = require('../middlewares/secure.middleware');

router.get('/', secure.isAuthenticated, searchController.filter);

module.exports = router;