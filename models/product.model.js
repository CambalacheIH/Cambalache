const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'introduce a valid product name'],
    maxlength: 30
  },
  description: {
    type: String,
    required: [ true, 'explain the product main features'],
    maxlength: 200
  },
  minPrice: {
    type: Number,
    required: [true, 'fill in with the minimun price you would accept']
  },
  maxPrice: {
    type: Number,
    required: [true, 'fill in with the maximum price you would accept']
  },
  photo: {
    type: String,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true});


const Product = mongoose.model('Product', userSchema);
module.exports = Product;
