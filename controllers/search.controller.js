const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');
const Product = require ('../models/product.model');
const path = require ('path');
const CATEGORIES = require ('../models/categories-types');

module.exports.filter = (req, res, next) => {
  Product.find({
    'categories': { $in: req.user.categories },
    'owner': { $ne: req.user.id },
    'productMinPrice': { $gt: req.user.minPrice },
    'productMaxPrice': { $lt: req.user.maxPrice }
  })
    .then((products) => {
      res.render('search/filter', {
        products: products,
        user: req.user,
        path: req.path
      });
    });
};

module.exports.newExchange = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      Product.find({'owner': req.user.id})
        .then((userProducts) => {
          console.log(userProducts);
          res.render('search/product-selection', {
            product: product,
            userProducts: userProducts
          });
        })
        .catch (error => next());
    })
    .catch (error => next ());
}