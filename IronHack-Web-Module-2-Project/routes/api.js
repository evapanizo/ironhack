'use strict';

// Packages
const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const Pokemon = require('../models/pokemon');

// GET Add a Pokemon in array
router.get('/trades/pokemon', middlewares.isLogged, function (req, res, next) {
  let pokemonName = req.query.q;
  pokemonName = pokemonName.toLowerCase();
  Pokemon.findOne({ 'name': pokemonName })
    .then((searchResult) => {
      res.status(200);
      return res.json({ data: searchResult });
    })
    .catch((error) => {
      res.status(500);
      return res.json({ 'error': error });
    });
});

// Possible results for searches
router.get('/search-pokemon', middlewares.isLogged, function (req, res, next) {
  let inputText = req.query.q;
  inputText = inputText.toLowerCase();
  if (inputText !== '') {
    Pokemon.find({ 'name': { $regex: `^${inputText}.*$` } })
      .then((searchResult) => {
        res.status(200);
        return res.json({ data: searchResult });
      })
      .catch((error) => {
        res.status(500);
        return res.json({ 'error': error });
      });
  } else {
    return res.json({ data: [] });
  }
});

// Exports
module.exports = router;
