const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');

module.exports.signup = (req, res, next) => {
  res.render('auth/signup');
}

module.exports.doSignup = (req, res, next) => {
  User.findOne({ email: req.body.email })
      .then(user => {
          if (user != null) {
              res.render('auth/signup', { user: user, error: { email: 'Email is already used'} })
          } else {
              user = new User(req.body);
              user.save()
                  .then(() => {
                      res.redirect('/login');
                  }).catch(error => {
                      if (error instanceof mongoose.Error.ValidationError) {
                          res.render('auth/signup', { user: user, error: error.errors })
                      } else {
                          next(error);
                      }
                  });
          }  
      }).catch(error => next(error));
}