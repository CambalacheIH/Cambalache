const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const secure = require('../configs/passport.config');
const upload = require('../configs/multer.config');

router.get('/', secure.isAuthenticated, profileController.index);

router.get('/edit', secure.isAuthenticated, profileController.editProfile);
router.post('/', secure.isAuthenticated, profileController.updateProfile);

router.post('/product', secure.isAuthenticated, upload.single('pic'), profileController.createProduct);
//router.get to see te picture
router.get('/new-product', secure.isAuthenticated, profileController.newProduct);

router.post('/:id/delete', secure.isAuthenticated, profileController.deleteProduct);

router.get('/:id/edit', secure.isAuthenticated, profileController.editProduct);
router.post('/:id', secure.isAuthenticated, profileController.updateProduct);



module.exports = router;
