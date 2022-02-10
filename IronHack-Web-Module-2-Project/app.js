'use strict';

// Packages
const path = require('path');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();
const middlewares = require('./middlewares/middlewares');

// Routers
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');
const tradesRouter = require('./routes/trades');
const searchRouter = require('./routes/search');
const apiRouter = require('./routes/api.js');

// App
const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(error => {
    console.error(error);
  });

// Session
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'catch-them-all',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Makes the currentUser available in every page
app.use(middlewares.setCurrentUser);

// Flash
app.use(flash());

app.use(middlewares.notifications);

// View engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/trades', tradesRouter);
app.use('/search', searchRouter);
app.use('/api', apiRouter);

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// Error Handler
app.use((err, req, res, next) => {
  // Always log the error
  console.error('ERROR', req.method, req.path, err);

  // Only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

// Exports
module.exports = app;
