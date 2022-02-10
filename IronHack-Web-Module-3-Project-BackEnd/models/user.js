'use strict';

// Module dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  deliveryAddress: {
    streetAddress: String,
    country: String,
    province: String,
    city: String,
    postalCode: { type: Number, min: 0 }
  },
  phone: { type: Number, min: 0 },
  notification: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  completedProfile: { type: Boolean, default: false }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// User model
const User = mongoose.model('User', userSchema);

// Export model
module.exports = User;
