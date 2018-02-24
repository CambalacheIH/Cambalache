const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

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
  passport.use('facebook-auth', new FbStrategy({
    clientID: "416395515480415",
    clientSecret: "88caff9cdb68281c9d0d31ad2edaa366",
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id','name','email']
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }

      const newUser = new User({
        facebookID: profile.id,
        email: profile._json.email,
        name: profile._json.first_name,
        password: Math.random().toString(36).substring(7)
      });

      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });

  }));

  passport.use('google-auth', new GoogleStrategy({
    clientID: "615830555597-925sm8ie0e991uc3pp9cid0ad9e33vbl.apps.googleusercontent.com",
    clientSecret: "yE2HCbjnJ9ojtQm1xXPFFH-h",
    callbackURL: "/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }

      const newUser = new User({
        googleID: profile.id,
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
