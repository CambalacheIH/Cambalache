const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickup.controller');

router.get('/', pickupController.index);

module.exports = router;