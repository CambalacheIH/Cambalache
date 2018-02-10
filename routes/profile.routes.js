const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const secure = require('../configs/passport.config');

router.get('/', secure.isAuthenticated, profileController.index);

router.get('/edit', secure.isAuthenticated, profileController.editProfile);
router.post('/', secure.isAuthenticated, profileController.updateProfile);

router.get('/new-product', secure.isAuthenticated, profileController.newProduct);
router.post('/product', secure.isAuthenticated, profileController.createProduct);

router.post('/:id/delete', secure.isAuthenticated, profileController.deleteProduct);

router.get('/:id/edit', secure.isAuthenticated, profileController.editProduct);
router.post('/:id', secure.isAuthenticated, profileController.updateProduct);

module.exports = router;
