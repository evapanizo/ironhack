'use strict';

// Module dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product Schema
const productSchema = new Schema({
  name: String,
  image: String,
  stock: { type: Number, min: 0 },
  description: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Product model
const Product = mongoose.model('Product', productSchema);

// Export model
module.exports = Product;
