const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const secure = require('../configs/passport.config');

router.get('/', secure.isAuthenticated, profileController.index);

router.get('/edit', secure.isAuthenticated, profileController.editProfile);
router.post('/', secure.isAuthenticated, profileController.updateProfile);

router.get('/new-product', secure.isAuthenticated, profileController.newProduct);
router.post('/product', secure.isAuthenticated, profileController.createProduct);

module.exports = router;
