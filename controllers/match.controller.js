const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');
const Product = require ('../models/product.model');
const Match = require ('../models/match.model');
const path = require ('path');

module.exports.newRoom = (req, res, next) => {
  const firstProductId = req.params.firstProduct;
  const secondProductId = req.params.secondProduct;
  Match.findOne({'combination': firstProductId+secondProductId})
    .populate('firstProductId')
    .populate('secondProductId')
    .populate('firstProductOwner')
    .populate('firstProductOwner')
    .then(match => {
      if (match != undefined) {
        res.render('match/match-room', {
          match
        })
      } else {
        Product.findById(firstProductId)
          .populate('owner')
          .then(firstProduct => {
            Product.findById(secondProductId)
              .populate('owner')
              .then(secondProduct => {
                const firstProductOwner = firstProduct.owner;
                const secondProductOwner = secondProduct.owner;
                new Match({
                  firstProductId,
                  secondProductId,
                  firstProductOwner,
                  secondProductOwner,
                  combination: firstProductId+secondProductId
                }).save()
                  .then(match => {
                    res.render('match/match-room', {
                      match: match
                    })
                  })
              });
          });
        }
    })
    .catch (error => next());
};