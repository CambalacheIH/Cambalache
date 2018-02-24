const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const FB_CLIENT_ID = process.env.FB_CLIENT_ID || '';
const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET || '';
const FB_CB = '';

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
    profileFields: ['id','displayName','email']
  }, providerCallback));

  passport.use('google-auth', new GoogleStrategy({
    clientID: "1045344661519-oidp512rapi5qscvuvffgjo9kh3rk4l4.apps.googleusercontent.com",
    clientSecret: "kPL43k1kkLDP37CS0seIkpRE",
    callbackURL: "/auth/google/callback"
  }, providerCallback));

  function providerCallback(accessToken, refreshToken, profile, next) {
    let providerName;
    if (profile.provider === 'google') {
      providerName = 'googleID';
    } else {
      providerName = 'facebookID';
    }

    console.log(profile);
    User.findOne({ [providerName]: profile.id })
      .then(user => {
        if (user) {
          next(null, user);
        } else {
          user = new User({
            [providerName]: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            password: Math.random().toString(36).substring(7)
          });
          user.save()
            .then(() => {
              next(null, user);
            })
            .catch(error => next(error));
        }
      })
      .catch(error => next(error));
  };

};
