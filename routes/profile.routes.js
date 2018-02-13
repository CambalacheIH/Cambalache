const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const secure = require('../middlewares/secure.middleware');
const upload = require('../configs/multer.config');

router.get('/', secure.isAuthenticated, profileController.index);
router.post('/products', secure.isAuthenticated, upload.single('pic'), profileController.createProduct);

router.get('/:id', secure.isAuthenticated, secure.isUser, profileController.editProfile);
router.post('/:id', secure.isAuthenticated, secure.isUser, profileController.updateProfile);

//router.get to see te picture
router.get('/products/new', secure.isAuthenticated, profileController.newProduct);

router.post('/products/delete/:id', secure.isAuthenticated, secure.isUserOwner, profileController.deleteProduct);

router.get('/products/:id', secure.isAuthenticated, secure.isUserOwner, profileController.editProduct);
router.post('/products/edit/:id', secure.isAuthenticated, secure.isUserOwner, profileController.updateProduct);

module.exports = router;
