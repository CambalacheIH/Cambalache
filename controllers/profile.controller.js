const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');

module.exports.index = (req, res, next) => {
  res.render('profile/index', {user: req.user})
}

module.exports.editProfile = (req, res, next) => {
  User.findById(req.user.id).then((user) => {
    res.render('profile/edit', {user});
  });
}