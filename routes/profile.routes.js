const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const secure = require('../configs/passport.config');
const upload = require('../configs/multer.config');

router.get('/', secure.isAuthenticated, profileController.index);

router.get('/:id', secure.isAuthenticated, profileController.editProfile);
router.post('/:id', secure.isAuthenticated, profileController.updateProfile);

router.post('/products', secure.isAuthenticated, upload.single('pic'), profileController.createProduct);
//router.get to see te picture
router.get('/products/new', secure.isAuthenticated, profileController.newProduct);

router.post('products/:id/delete', secure.isAuthenticated, profileController.deleteProduct);

router.get('products/:id', secure.isAuthenticated, profileController.editProduct);
router.post('products/:id', secure.isAuthenticated, profileController.updateProduct);



module.exports = router;
