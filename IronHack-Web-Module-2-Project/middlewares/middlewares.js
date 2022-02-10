// Packages
const User = require('../models/trainer');
const sms = require('../helpers/messages');

// Are user or password empty?
function emptyFields (req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    req.flash('error', sms.messages.emptyFieldsMessage);
    res.redirect(`/auth${req.path}`);
  } else {
    next();
  }
}

// Is user logged?
function isLogged (req, res, next) {
  const user = req.session.currentUser;
  if (!user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
}

// Is user logged and trying to acces signup or login routes?
function isAnon (req, res, next) {
  const user = req.session.currentUser;
  if (user) {
    res.redirect('/profile');
  } else {
    next();
  }
}

// Is user already in the database?
function isCreated (req, res, next) {
  const { username } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (user) {
        req.flash('error', sms.messages.userCreated);
        res.redirect('/auth/signup');
      } else {
        next();
      }
    })
    .catch(next);
}

// set currentUser
function setCurrentUser (req, res, next) {
  res.locals.currentUser = req.session.currentUser;
  next();
}

// We extract the messages separately cause we call req.flash() we'll clean the object flash.
function notifications (req, res, next) {
  res.locals.errorMessages = req.flash('error');
  res.locals.infoMessages = req.flash('info');
  res.locals.dangerMessages = req.flash('danger');
  res.locals.successMessages = req.flash('success');
  res.locals.warningMessages = req.flash('warning');
  next();
}

module.exports = {
  emptyFields,
  isLogged,
  isAnon,
  isCreated,
  setCurrentUser,
  notifications
};
