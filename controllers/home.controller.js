const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');


module.exports.index = (req, res, next) => {
  if (req.user != undefined) {
    res.redirect('/profile');
  } else {
    res.render('home/index');
  }
};
