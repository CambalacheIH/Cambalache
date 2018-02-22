const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');


module.exports.index = (req, res, next) => {
  res.render('home/index');
};
