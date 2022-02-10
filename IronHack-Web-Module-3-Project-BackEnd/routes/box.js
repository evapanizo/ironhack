'use strict';

// Module dependencies
const express = require('express');
const router = express.Router();

// Project dependencies
/// Helpers
const { isLoggedIn } = require('../helpers/middlewares');
/// Models
const Box = require('../models/box');

// Route '/box/get' - gets the user's box data
router.get('/get', isLoggedIn(), (req, res, next) => {
  const owner = req.session.currentUser._id;
  Box.findOne({ owner })
    .then(box => {
      if (!box) {
        return res.status(404).json({
          error: 'box-not-found'
        });
      }
      return res.status(200).json(box);
    })
    .catch(next);
});

// Route '/box/populate' - gets the user's box data
router.get('/populate', isLoggedIn(), (req, res, next) => {
  const owner = req.session.currentUser._id;
  Box.findOne({ owner })
    .populate('products.productId')
    .then(box => {
      if (!box) {
        return res.status(404).json({
          error: 'box-not-found'
        });
      }
      return res.status(200).json(box);
    })
    .catch(next);
});

// Route '/box/create' - creates a box
router.post('/create', isLoggedIn(), (req, res, next) => {
  const { price, size, maxQuantity, products, owner } = req.body;
  const box = Box({ price, size, maxQuantity, products, owner });
  box.save()
    .then((box) => {
      return res.status(200).json(box);
    })
    .catch(next);
});

// Route '/box/edit' - edits the user's box
router.put('/edit', isLoggedIn(), (req, res, next) => {
  const { price, size, maxQuantity, products } = req.body;
  const userId = req.session.currentUser._id;
  Box.findOneAndUpdate({ owner: userId }, { price, size, maxQuantity, products }, { new: true })
    .then((updated) => {
      return res.status(200).json({ 'message': 'updated', updated });
    })
    .catch(next);
});

// Export
module.exports = router;
