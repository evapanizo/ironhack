'use strict';

// Checks if user is logged in
const isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    const err = new Error('Unauthorized');
    err.status = 403;
    err.statusMessage = 'Unauthorized';
    next(err);
  }
};

// Export middlewares
module.exports = {
  isLoggedIn
};
