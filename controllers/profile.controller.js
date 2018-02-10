const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');

module.exports.index = (req, res, next) => {
  res.render('profile/index', {user: req.user});
};

module.exports.editProfile = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      res.render('profile/edit', {user});
    })
    .catch (error => next());
};

module.exports.updateProfile = (req, res, next) => {
  const userId = req.user.id;

  const {name, surname} = req.body;
  const updates = {name, surname};

  User.findByIdAndUpdate(userId, updates).then((user) => {
    res.redirect('/profile');
  });
};
