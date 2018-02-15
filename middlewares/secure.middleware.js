const Product = require('../models/product.model');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated ()) {
    next();
  } else {
    res.status(401);
    res.redirect('/login');
  }
};

module.exports.nonAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports.isUserOwner = (req, res, next) => {
  productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      if (product.owner == req.user.id) {
        next();
      } else {
        res.status(401);
        res.redirect('/profile');
      }
    })
};

module.exports.isUser = (req, res, next) => {
  console.log(req.user.id);
  if (req.user.id == req.params.id) {
    next();
  } else {
    res.redirect('/profile');
  }
}