const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');
const Product = require ('../models/product.model');
const Pickup = require ('../models/pickup.model');
const path = require ('path');
const CATEGORIES = require ('../models/categories-types');

module.exports.index = (req, res, next) => {
  Product.find({'owner': req.user.id})
    .populate('pickup')
    .then((products) => {
      User.findById(req.user.id)
        .populate('pickup')
        .then((user) => {
          res.render('profile/index', {
            categories: req.user.categories || [],
            products: products,
            user: user,
            path: req.path
          });
        });
    });
};

module.exports.editProfile = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      Pickup.find()
        .then((pickups) => {
          res.render('profile/edit', {
            user: user,
            categories: CATEGORIES,
            pickups: pickups
          });
        })
    })
    .catch (error => next());
};

module.exports.updateProfile = (req, res, next) => {
  const {name, surname, categories, minPrice, maxPrice, pickup} = req.body;
  const updates = {name, surname, categories, minPrice, maxPrice, pickup};
  const userId = req.user.id;
  User.findByIdAndUpdate(userId, updates).then((user) => {
    res.redirect('/profile');
  });
};

module.exports.newProduct = (req, res, next) => {
  Pickup.find()
    .then((pickups) => {
      res.render('profile/products/new', {
        product: new Product(),
        path: req.path,
        categories: CATEGORIES,
        pickups: pickups
      });
    })
    .catch (error => next());
};

module.exports.createProduct = (req, res, next) => {
  const userId = req.user.id;
  let newProduct = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productMinPrice: req.body.productMinPrice,
    productMaxPrice: req.body.productMaxPrice,
    owner: userId,
    productPhoto: null,
    categories: req.body.categories,
    pickup: req.body.pickup
  };

  if (req.file) {
    newProduct.productPhoto = req.file.secure_url;
  }

  new Product(newProduct).save()
    .then((product) => {
      res.redirect('/profile');
    })
    .catch((error) => {
      console.log(`error trying to create product ${error.message}`);
      Pickup.find()
        .then((pickups) => {
          res.render('profile/products/new', {
            product: new Product(),
            message: error.errors.productPhoto,
            path: req.path,
            categories: CATEGORIES,
            pickups: pickups
          });
        })
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
      Pickup.find()
        .then((pickups) => {
          res.render('profile/products/new', {
            product: product,
            categories: CATEGORIES,
            pickups: pickups
          });
        })
    })
    .catch (error => next ());
};

module.exports.updateProduct = (req, res, next) => {
  const productId = req.params.id;
  const { productName, productDescription, productMinPrice, productMaxPrice, categories, pickup } = req.body;
  const updates = { productName, productDescription, productMinPrice, productMaxPrice, categories, pickup};

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
