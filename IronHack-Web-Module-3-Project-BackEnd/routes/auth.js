'use strict';

// Module dependencies
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Project dependencies
/// Models
const User = require('../models/user');

/// Helpers
const { isLoggedIn } = require('../helpers/middlewares');

// Route '/auth/me' - returns the current user
router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(200).json(req.session.currentUser);
  } else {
    return res.status(404).json({
      error: 'not-found'
    });
  }
});

// Route '/auth/login' - handles the login process
router.post('/login', (req, res, next) => {
  // Protection: if user is already logged in
  if (req.session.currentUser) {
    return res.status(401).json({
      error: 'unauthorized'
    });
  }

  // Protection: if email or password are empty
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: 'empty'
    });
  }

  // Check if user has logged in correctly
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: 'user-not-found'
        });
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      }
      return res.status(404).json({
        error: 'wrong-password'
      });
    })
    .catch(next);
});

// Route '/auth/signup' - handles the signup process
router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;

  // Protection: if email or password are empty
  if (!email || !password) {
    return res.status(422).json({
      error: 'empty'
    });
  }

  // Check that nobody in the database has already signed up with the given email
  User.findOne({ email }, 'email')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({
          error: 'email-not-unique'
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = User({ email, password: hashPass });

      newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          return res.status(200).json(newUser);
        });
    })
    .catch(next);
});

// Route '/auth/logout' - handles the logout process
router.post('/logout', (req, res) => {
  req.session.currentUser = null;
  return res.status(204).send();
});

// Route '/auth/update' - updates the user information
router.put('/update', isLoggedIn(), (req, res, next) => {
  const { firstName, lastName, deliveryAddress, phone, completedProfile } = req.body;
  const userId = req.session.currentUser._id;
  User.findByIdAndUpdate(userId, { firstName, lastName, deliveryAddress, phone, completedProfile }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: 'user-not-found'
        });
      }
      req.session.currentUser = user;
      return res.status(200).json(user);
    })
    .catch(next);
});

// Route '/auth/update' - updates the user information
router.put('/payment', isLoggedIn(), (req, res, next) => {
  const { payment } = req.body;
  const userId = req.session.currentUser._id;
  User.findByIdAndUpdate(userId, { payment }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: 'user-not-found'
        });
      }
      req.session.currentUser = user;
      return res.status(200).json(user);
    })
    .catch(next);
});

// Exports
module.exports = router;
