
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var express = require('express');
var passport = require('passport');
var config = require('./index');
var cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
module.exports.init = function(app) {
  var env = app.get('env');
  var root = app.get('root');

 const sessionOpts = {
    secret: config.session.secret,
    key: 'skey.sid',
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized
  };

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.disable('x-powered-by');



  app.use(session(sessionOpts));
  app.use(passport.initialize());
app.use(passport.session());



   app.use(function(req, res, next) {
    req.resources = req.resources || {};
    res.locals.app = config.app;
    res.locals.currentUser = req.user;

    next();
  });

 

};