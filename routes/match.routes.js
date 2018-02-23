const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');
const secure = require('../middlewares/secure.middleware');

router.get('/:firstProduct/:secondProduct', secure.isAuthenticated, matchController.newRoom);

module.exports = router