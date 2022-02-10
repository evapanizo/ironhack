'use strict';

// Packages
const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');

// GET Homepage
router.get('/', middlewares.isAnon, function (req, res, next) {
  return res.render('index');
});

// Exports
module.exports = router;
