const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CATEGORIES = require ('./categories-types');

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, 'introduce a valid product name'],
    maxlength: 30
  },
  productDescription: {
    type: String,
    required: [ true, 'explain the product main features'],
    maxlength: 200
  },
  productMinPrice: {
    type: Number,
    required: [true, 'fill in with the minimun price you would accept']
  },
  productMaxPrice: {
    type: Number,
    required: [true, 'fill in with the maximum price you would accept']
  },
  productPhoto: {
    type: String,
    required: [true, 'Upload a valid photo (JPG, JPEG, PNG, GIF)']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  categories: {
    type: String,
    enum: CATEGORIES
  }
}, {timestamps: true});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;
