const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  firstProductId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  secondProductId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  firstProductOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  secondProductOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstProductOwnerAccept: {
    type: Boolean,
    default: false
  },
  secondProductOwnerAccept: {
    type: Boolean,
    default: false
  },
  rejected: {
    type: Boolean,
    default: false
  },
  combination: {
    type: String,
    required: true
  },
  pickup: {
    type: Schema.Types.ObjectId,
    ref: 'Pickup'
  }
}, {timestamps: true});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;