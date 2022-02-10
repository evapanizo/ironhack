'use strict';

// Packages
const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Trainer = require('../models/trainer');
const sms = require('../helpers/messages');
const vars = require('../helpers/constants');
const helpers = require('../helpers/helpers');

// GET Sign up view
router.get('/signup', middlewares.isAnon, function (req, res, next) {
  return res.render('auth/signup');
});

// POST Sign up form
router.post('/signup', middlewares.isAnon, middlewares.emptyFields, middlewares.isCreated, function (req, res, next) {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const trainer = {
    'username': username,
    'password': hashedPassword,
    'avatar': helpers.getPathImages(vars.constants.defaultAvatar),
    'gender': helpers.getPathImages(vars.constants.defaultGenderImage),
    'age': 10,
    'location': 'Pallet Town',
    'description': "I wanna be the very best, like no one ever was. To catch them is my real test, to train them is my cause. I will travel across the land, searching far and wide. Teach Pokemon to understand the power that's inside!",
    'telegram': '@Not Available'
  };
  Trainer.create(trainer)
    .then(newUser => {
      req.session.currentUser = newUser;
      return res.redirect('/profile');
    })
    .catch(next);
});

// GET Log in view
router.get('/login', middlewares.isAnon, function (req, res, next) {
  return res.render('auth/login');
});

// POST Log in view
router.post('/login', middlewares.isAnon, middlewares.emptyFields, function (req, res, next) {
  const { username, password } = req.body;
  Trainer.findOne({ username })
    .then(user => {
      if (!user) {
        req.flash('error', sms.messages.noUserMessage);
        return res.redirect('/auth/login');
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.redirect('/profile');
      } else {
        req.flash('error', sms.messages.incorrectPass);
        return res.redirect('/auth/login');
      }
    });
});

// POST Log out
router.post('/logout', middlewares.isLogged, function (req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      return res.redirect('/');
    }
  });
});

// Exports
module.exports = router;
