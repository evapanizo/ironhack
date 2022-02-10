'use strict';

// Packages
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const middlewares = require('../middlewares/middlewares');
const Trainer = require('../models/trainer');
const helpers = require('../helpers/helpers');
const ObjectId = mongoose.Types.ObjectId;

// GET Trades view
router.get('/', middlewares.isLogged, function (req, res, next) {
  const userId = res.locals.currentUser._id;
  Trainer.findById(userId)
    .populate('myPokemon')
    .populate('wishList')
    .then(trainer => {
      helpers.pkmnFirstToCapital(trainer);
      return res.render('trades/trades', { 'trainer': trainer });
    })
    .catch(next);
});

// GET Add a pokemon in myPokemon array
router.get('/add/myPokemon', middlewares.isLogged, function (req, res, next) {
  return res.render('trades/add-my-pokemon');
});

// GET Add a pokemon in wishList array
router.get('/add/wishList', middlewares.isLogged, function (req, res, next) {
  return res.render('trades/add-wish-list');
});

// POST Add a pokemon in myPokemon array
router.post('/add/myPokemon', middlewares.isLogged, function (req, res, next) {
  const pokemonList = req.body;
  const userId = res.locals.currentUser._id;
  Trainer.findById(userId)
    .then(trainer => {
      for (let key in pokemonList) {
        trainer.myPokemon.push(ObjectId(pokemonList[key]));
      }
      trainer.save();
      return res.redirect('/trades');
    })
    .catch(next);
});

// POST Add a pokemon in wishList array
router.post('/add/wishList', middlewares.isLogged, function (req, res, next) {
  const pokemonList = req.body;
  const userId = res.locals.currentUser._id;
  Trainer.findById(userId)
    .then(trainer => {
      for (let key in pokemonList) {
        trainer.wishList.push(ObjectId(pokemonList[key]));
      }
      trainer.save();
      return res.redirect('/trades');
    })
    .catch(next);
});

// POST Delete a pokemon in myPokemon array
router.post('/:index/myPokemon/delete', middlewares.isLogged, function (req, res, next) {
  const userId = res.locals.currentUser._id;
  const index = req.params.index;
  Trainer.findById(userId)
    .populate('myPokemon')
    .then(trainer => {
      trainer.myPokemon.splice(index, 1);
      trainer.save();
      return res.redirect('/trades');
    })
    .catch(next);
});

// POST Delete a pokemon in wishList array
router.post('/:index/wishList/delete', middlewares.isLogged, function (req, res, next) {
  const userId = res.locals.currentUser._id;
  const index = req.params.index;
  Trainer.findById(userId)
    .populate('wishList')
    .then(trainer => {
      trainer.wishList.splice(index, 1);
      trainer.save();
      return res.redirect('/trades');
    })
    .catch(next);
});

// Exports
module.exports = router;
