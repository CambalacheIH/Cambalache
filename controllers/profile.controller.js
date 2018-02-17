const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');
const Product = require ('../models/product.model');
const path = require ('path');
const CATEGORIES = require ('../models/categories-types');

module.exports.index = (req, res, next) => {
  Product.find({'owner': req.user.id})
    .then((products) => {
      res.render('profile/index', {
        products: products,
        user: req.user,
        path: req.path
      });
    });
};

module.exports.editProfile = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      res.render('profile/edit', {
        user: user,
        categories: CATEGORIES
      });
    })
    .catch (error => next());
};

module.exports.updateProfile = (req, res, next) => {
  const {name, surname, categories} = req.body;
  console.log(req.body);
  const updates = {name, surname, categories};
  const userId = req.user.id;
  User.findByIdAndUpdate(userId, updates).then((user) => {
    res.redirect('/profile');
  });
};

module.exports.newProduct = (req, res, next) => {
  res.render('profile/products/new', {
    product: new Product(),
    path: req.path
  });
};

module.exports.createProduct = (req, res, next) => {
  const userId = req.user.id;

  let newProduct = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productMinPrice: req.body.productMinPrice,
    productMaxPrice: req.body.productMaxPrice,
    owner: userId,
    productPhoto: null
  };

  if (req.file) {
    newProduct.productPhoto = `/photos/${req.file.filename}`;
  }

  new Product(newProduct).save()
    .then((product) => {
      res.redirect('/profile');
    })
    .catch((error) => {
      console.log(error.message);
      res.render('profile/products/new', {
        product: new Product(),
        message: error.errors.productPhoto,
        path: req.path
      });
  });

};

module.exports.deleteProduct = (req, res, next) => {
  Product.remove({ _id: req.params.id})
    .then (() => {
      res.redirect('/profile');
    })
    .catch (error => next());
};

module.exports.editProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.render('profile/products/new', {product});
    })
    .catch (error => next ());
};

module.exports.updateProduct = (req, res, next) => {
  const productId = req.params.id;
  const { productName, productDescription, productMinPrice, productMaxPrice } = req.body;
  const updates = { productName, productDescription, productMinPrice, productMaxPrice };

  Product.findByIdAndUpdate(productId, updates).then((product) => {
    res.redirect('/profile');
  });
};

module.exports.pic = (req, res, next ) =>{
  Product.findById (req.params.id)
    .then((product) => {
      res.sendFile(path.join(__dirname, '../', product.file));
    })
    .catch(error => next());
};
