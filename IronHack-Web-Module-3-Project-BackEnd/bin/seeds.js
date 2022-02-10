// Module dependencies
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

// Project dependencies
/// Data
const products = require('../data/products');
/// Models
const Product = require('../models/product');

// Database connection
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    console.log(`Connected to database`);
    Product.insertMany(products)
      .then(() => {
        console.log('Products added!');
        return mongoose.connection.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }).catch((error) => {
    console.error(error);
  });

// Database
