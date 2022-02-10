'use strict';

// Packages
const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainer');
const Pokemon = require('../models/pokemon');
const middlewares = require('../middlewares/middlewares');
const sms = require('../helpers/messages');

// GET Search view
router.get('/', middlewares.isLogged, function (req, res, next) {
  const userId = res.locals.currentUser._id;
  // Are there query parameters?
  let pokemonName = req.query.pokemon;
  if (pokemonName === undefined) {
    return res.render('search/search', { 'trainers': [] });
  }
  // Is the search empty?
  if (pokemonName === '') {
    req.flash('error', sms.messages.emptyFieldsMessage);
    return res.redirect('/search');
  }
  // If there are query parameters...
  pokemonName = pokemonName.toLowerCase();
  Pokemon.find({ 'name': pokemonName })
    .then(result => {
      if (!result.length) {
        req.flash('error', sms.messages.pokemonDoesntExist);
        return res.redirect('/search');
      } else {
        const pokemonId = result[0]._id;
        Trainer.find({ $and: [ { 'myPokemon': pokemonId }, { '_id': { $ne: userId } } ] })
          .then(trainers => {
            // If nobody has the pokemon
            if (!trainers.length) {
              req.flash('error', sms.messages.noPokemon);
              return res.redirect('/search');
            } else {
              req.session.currentUrl = `/search?pokemon=${pokemonName}`;
              return res.render('search/search', { 'trainers': trainers, 'pokemonName': pokemonName });
            }
          })
          .catch(next);
      }
    })
    .catch(next);
});

// Exports
module.exports = router;
