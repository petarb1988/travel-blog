const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const SessionStore = require('express-session-sequelize')(session.Store);
const database = require('./database/db-init');

const sessionDb = database.sessionDbInit;

const sequelizeSessionStore = new SessionStore({
  db: sessionDb
});

const isAuthenticated = require('./routes/check-auth').isAuthenticated;

const entriesRouter = require('./routes/routes-entries');
const usersRouter = require('./routes/routes-users');
const diariesRouter = require('./routes/routes-diaries');
const authRouter = require('./routes/routes-auth');


const app = express();

require('./auth/passport')();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  store: sequelizeSessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {

    // CHANGE 3 INTO 1000 BEFORE PUTTING ONLINE
    
    maxAge: 3 * 60 * 60 * 24
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use(isAuthenticated);
app.use('/entries', entriesRouter);
app.use('/users', usersRouter);
app.use('/diaries', diariesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
