const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');
const secure = require('../middlewares/secure.middleware');

router.get('/:firstProduct/:secondProduct', secure.isAuthenticated, matchController.newRoom);
router.post('/:firstProduct/:secondProduct/accept', secure.isAuthenticated, matchController.accept);
router.post('/:firstProduct/:secondProduct/reject', secure.isAuthenticated, matchController.reject);

module.exports = router