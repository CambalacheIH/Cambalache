const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const secure = require('../configs/passport.config');

router.get('/', secure.isAuthenticated, profileController.index);

module.exports = router;