const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickup.controller');

router.get('/', pickupController.index);

router.get('/new', pickupController.new);
router.post('/', pickupController.create);

module.exports = router;