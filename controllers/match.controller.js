const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');
const Product = require ('../models/product.model');
const Match = require ('../models/match.model');
const Pickup = require ('../models/pickup.model');
const path = require ('path');

module.exports.newRoom = (req, res, next) => {
  const firstProductId = req.params.firstProduct;
  const secondProductId = req.params.secondProduct;
  Match.findOne({'combination': firstProductId+secondProductId})
    .populate('firstProductId')
    .populate('secondProductId')
    .populate('firstProductOwner')
    .populate('secondProductOwner')
    .populate('pickup')
    .then(match => {

      if (match != undefined) {
        if (match.firstProductOwnerAccept === true & match.secondProductOwnerAccept === true) {
          Product.remove({ _id: { $in: [firstProductId, secondProductId] }})
            .then (() => {
              res.render('match/match-room', {
                match: match,
                user: req.user.id
              })
          })
        } else {
          res.render('match/match-room', {
            match: match,
            user: req.user.id
          })
        } 
      } else {
        Product.findById(firstProductId)
          .populate('owner')
          .populate('pickup')
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
                  combination: firstProductId+secondProductId,
                  pickup: firstProduct.pickup
                }).save()
                  .then(match => {
                    res.render('match/match-room', {
                      match: match,
                      user: req.user.id
                    })
                  })
              });
          });
      }
    })
    .catch (error => next());
};

module.exports.accept = (req, res, next) => {
  const firstProductId = req.params.firstProduct;
  const secondProductId = req.params.secondProduct;
  const user = req.user.id;

  Match.findOne({'combination': firstProductId+secondProductId})
    .then(match => {
      if (user == match.firstProductOwner) {
        console.log('entre')
        match.firstProductOwnerAccept = true;
      } else {
        match.secondProductOwnerAccept = true;
      }
      match.save();
      res.redirect(`/match/${firstProductId}/${secondProductId}`);
    })
    .catch(error => next());
};

module.exports.reject = (req, res, next) => {
  const firstProductId = req.params.firstProduct;
  const secondProductId = req.params.secondProduct;

  Match.findOne({'combination': firstProductId+secondProductId})
    .then(match => {
      match.rejected = true
      match.save();
      res.redirect('/profile');
    })
    .catch(error => next());
}