
var crypto = require('crypto');
var len = 512;
var iterations = 18000;
var digest = 'sha256';

function hashPassword(password, salt, callback) {
  if (3 === arguments.length) {
    crypto.pbkdf2(password, salt, iterations, len, digest, function(err, derivedKey) {
      if (err) {
        return callback(err);
      }

      return callback(null, derivedKey.toString('base64'));
    });
  } else {
    callback = salt;
    crypto.randomBytes(len, function(err, salt) {
      if (err) {
        return callback(err);
      }

      salt = salt.toString('base64');
      crypto.pbkdf2(password, salt, iterations, len, digest, function(err, derivedKey) {
        if (err) {
          return callback(err);
        }

        callback(null, derivedKey.toString('base64'), salt);
      });
    });
  }
}

module.exports.hash = hashPassword;


function verify(password, hash, salt, callback) {
  hashPassword(password, salt, function(err, hashedPassword) {
    if (err) {
      return callback(err);
    }

    if (hashedPassword === hash) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
}

module.exports.verify = verify;