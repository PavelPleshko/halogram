
var passport = require('passport');
var _ = require('lodash');
var User = require('../models/user');
const mongoose = require('mongoose');
const Token = mongoose.model('Token');

module.exports.signin = function(req, res, next) {
  console.log(req.body);
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      console.log(info);
      return res.status(400).send(info);
    }

    Token.generate({
      user: user.id
    }, (err, token) => {
      if (err || !token) {
        return res.status(400).send({ message: 'Invalid email or password.' });
      }
var result = user.toJSON();
      result.token = _.pick(token, ['hash', 'expiresAt']);

      res.status(200).json(result);
    });
  })(req, res, next);
};
module.exports.getAuthUser = function getAuthUser(req, res, next) {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized.' });
  }

  res.json(req.user);
}

module.exports.register = function(req,res,next){
  console.log(req.body);
var userData = _.pick(req.body,'firstName','lastName','email','password');
User.register(userData,function(err,user){
    if (err && (11000 === err.code || 11001 === err.code)) {
        return res.status(400).json({ message: 'E-mail is already in use.' });
      }
      if (err) {
        return next(err);
      }
      delete user.password;
      delete user.passwordSalt;

      res.json(user);
})
}


module.exports.logout = function(req,res,next){
  console.log(req.user);
  req.logout();
  res.json({message:'Logged out successfully',success:true});

}