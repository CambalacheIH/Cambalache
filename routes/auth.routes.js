const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.middleware');
const passport = require('passport');

router.get('/signup', secure.nonAuthenticated, authController.signup);
router.post('/signup', secure.nonAuthenticated, authController.doSignup);

router.get('/login', secure.nonAuthenticated, authController.login);
router.post('/login', secure.nonAuthenticated, authController.doLogin);

router.get('/logout', secure.isAuthenticated, authController.logout);

router.get("/auth/facebook", passport.authenticate(
  "facebook",
  { scope : ['email']}
));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/profile",
  failureRedirect: "/"
}));

module.exports = router;
