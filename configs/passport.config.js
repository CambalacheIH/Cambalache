const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const FbStrategy = require('passport-facebook').Strategy;

module.exports.setup = (passport) => {

  passport.serializeUser((user, next) => {
    next(null, user._id);
  });

  passport.deserializeUser((id, next) => {
    User.findById(id)
      .then(user => {
        next(null, user);
      })
      .catch(error => next(error));
  });

  passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, next) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          next(null, user, { password: 'Invalid email or password' });
        } else {
          user.checkPassword(password)
            .then(match => {
              if (match) {
                next(null, user);
              } else {
                next(null, null, { password: 'Invalid email or password' });
              }
            })
            .catch(error => next(error));
        }
      })
      .catch(error => next(error));
  }));
  passport.use(new FbStrategy({
    clientID: "416395515480415",
    clientSecret: "88caff9cdb68281c9d0d31ad2edaa366",
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id','name','email']
  }, (accessToken, refreshToken, profile, done) => {
console.log(profile);
    User.findOne({ facebookID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }

      const newUser = new User({
        facebookID: profile.id
      });

      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });

  }));

};
