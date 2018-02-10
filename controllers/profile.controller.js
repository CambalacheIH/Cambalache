const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');
const Product = require ('../models/product.model');

module.exports.index = (req, res, next) => {
  Product.find({'owner': req.user.id})
    .then((products) => {
      res.render('profile/index', {
        products: products,
        user: req.user
        //path
      });
    });
};


module.exports.editProfile = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      res.render('profile/edit', {user});
    })
    .catch (error => next());
};

module.exports.updateProfile = (req, res, next) => {
  const {name, surname} = req.body;
  const updates = {name, surname};
  const userId = req.user.id;
  User.findByIdAndUpdate(userId, updates).then((user) => {
    res.redirect('/profile');
  });
};

module.exports.newProduct = (req, res, next) => {
  res.render('profile/products/new', {
    product: new Product()
  });
};

module.exports.createProduct = (req, res, next) => {
  const userId = req.user.id;
  new Product({
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productMinPrice: req.body.productMinPrice,
    productMaxPrice: req.body.productMaxPrice,
    owner: userId
  }).save()
    .then((product) => {
      res.redirect('/profile');
    })
    .catch((error) => {
      res.render('profile/products/new', {
        error: error
        //path
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
  const { productName, productDescription, productMinPrice, productMaxPrice} = req.body;
  const updates = { productName, productDescription, productMinPrice, productMaxPrice};
  Product.findByIdAndUpdate(productId, updates)
    .then((product) => {
      res.redirect('/profile');
    })
    .catch (error => next ());
};
