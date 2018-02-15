const mongoose = require('mongoose');

const PickupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  openHour: {
    type: Number,
    required: [true, 'The open hour is required'],
  },
  closeHour: {
    type: Number,
    required: [true, 'The close hour is required']
  }
}, {timestamps: true});

PickupSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Pickup', PickupSchema);