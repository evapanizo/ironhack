'use strict';

// Module dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Box Schema
const boxSchema = new Schema({
  price: { type: Number, enum: [5, 10, 15] },
  size: { type: String, enum: ['small', 'medium', 'large'] },
  maxQuantity: { type: Number, enum: [2, 5, 10] },
  products: [{
    quantity: { type: Number, min: 0 },
    productId: { type: ObjectId, ref: 'Product' }
  }],
  owner: { type: ObjectId, ref: 'User' }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Box model
const Box = mongoose.model('Box', boxSchema);

// Export model
module.exports = Box;
