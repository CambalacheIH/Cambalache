const mongoose = require('mongoose');
const passport = require('passport');
const Pickup = require ('../models/pickup.model');
const path = require ('path');

module.exports.index = (req, res, next) => {
  console.log("Patata");
  Pickup.find()
    .then((pickups) => {
      res.render('pickups/index', {
        pickups: pickups,
        path: req.path
      });
    });
};

module.exports.new = (req, res, next) => {
  console.log('Hola');
  res.render('pickups/new');
};

module.exports.create = (req, res, next) => {
  let newPickup = {
    name: req.body.name,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour,
    location: {
      type: 'Point',
      coordinates: [req.body.latitude, req.body.longitude]
    }
  };

  new Pickup(newPickup).save()
    .then((pickup) => {
      res.redirect('/pickups');
    })
    .catch((error) => {
      res.render('pickups/new', {
        pickup: new Pickup(),
        path: req.path
      });
    });
};

module.exports.delete = (req, res, next) => {
  Pickup.remove({ _id: req.params.id})
    .then (() => {
      res.redirect('/pickups');
    })
    .catch (error => next());
};
