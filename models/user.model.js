const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;
const CATEGORIES = require ('./categories-types');

const userSchema = new Schema({
  password: {
    type: String,
  //  required: [true, 'Password is required'],
    minlength: 6,
    maxlength: 16
  },
  email: {
    type: String,
    lowercase: true,
  //  required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true
  },
  name: {
    type: String,
  //  required: [true, 'A name is required']
  },
  surname: {
    type: String
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  categories: [
    {
      type: String,
      enum: CATEGORIES
    }
  ],
  minPrice: {
    type: Number
  },
  maxPrice: {
    type: Number
  },
  facebookID: {
    type:String,
  }
}, {timestamps: true});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
      return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
          bcrypt.hash(user.password, salt)
              .then(hash => {
                  user.password = hash;
                  next();
              });
      })
      .catch(error => next(error));
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
