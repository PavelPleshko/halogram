var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.init = function(app) {
  passport.serializeUser(function(user, done) {
  	console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, done);
  });

  // load strategies
  require('./strategies/local').init();
  require('./strategies/bearer').init();
};