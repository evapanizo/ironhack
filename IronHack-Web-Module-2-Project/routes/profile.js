'use strict';

// Packages
const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainer');
const middlewares = require('../middlewares/middlewares');
const mongodb = require('mongodb');

// GET Profile view
router.get('/', middlewares.isLogged, (req, res, next) => {
  const userId = res.locals.currentUser._id;
  // Render user's profile
  Trainer.findById(userId)
    .then(trainer => {
      return res.render('profile/profile', { 'trainer': trainer });
    })
    .catch(next);
});

// POST Edit form
router.post('/', middlewares.isLogged, (req, res, next) => {
  const userId = res.locals.currentUser._id;
  const trainer = req.body;
  if (trainer.avatar === '') {
    delete trainer.avatar;
  }
  trainer.telegram = `@${trainer.telegram}`;
  Trainer.findByIdAndUpdate(userId, trainer)
    .then(() => {
      return res.redirect('/profile');
    })
    .catch(next);
});

// GET Edit profile view
router.get('/edit', middlewares.isLogged, (req, res, next) => {
  const userId = res.locals.currentUser._id;
  // Render edit form
  Trainer.findById(userId)
    .then(trainer => {
      trainer.telegram = trainer.telegram.substring(1);
      return res.render('profile/edit', { 'trainer': trainer });
    })
    .catch(next);
});

// GET Profile view - Other users
router.get('/:id', middlewares.isLogged, (req, res, next) => {
  const userId = req.params.id;
  if (!mongodb.ObjectID.isValid(userId)) {
    next();
  }
  const pokemonName = req.params.name;
  // Render user's profile
  Trainer.findById(userId)
    .then(trainer => {
      if (trainer) {
        const url = req.session.currentUrl;
        return res.render('profile/profile-others', { 'trainer': trainer, 'pokemonName': pokemonName, 'url': url });
      } else {
        next();
      }
    })
    .catch(next);
});

// Exports
module.exports = router;
