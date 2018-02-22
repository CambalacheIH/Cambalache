const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');
const Product = require ('../models/product.model');
const path = require ('path');

module.exports.newRoom = (req, res, next) => {
  const firstProductId = req.params.firstProduct;
  const secondProductId = req.params.secondProduct;

  Product.findById(firstProductId)
    .populate('owner')
    .then(firstProduct => {
      Product.findById(secondProductId)
        .populate('owner')
        .then(secondProduct => {
          const firstProductOwner = firstProduct.owner;
          const secondProductOwner = secondProduct.owner;
        })
    })
    .catch (error => next());
};