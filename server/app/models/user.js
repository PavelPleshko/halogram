
var mongoose = require('mongoose');
var passwordHelper = require('../helpers/password');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
var Profile = mongoose.model('Profile').schema;

var _ = require('lodash');

var UserSchema = new Schema({
  email:  {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String
  },
 lastName:{
    type:String
  },
  password:{
    type:String,
    required:true
  },
  passwordSalt:{
    type:String,
    required:true
  },
  token:{
    type:Object
  },
  profile:{
    type:Profile,
    default:[]
  },

  active: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.statics.register = registerUser;
UserSchema.statics.authenticate = authenticateUser;
UserSchema.methods.changePassword = changeUserPassword;


function registerUser(opts, callback) {
  let data = _.cloneDeep(opts); //clones the object

  //hash the password
  passwordHelper.hash(opts.password, (err, hashedPassword, salt) => {
    if (err) {
      return callback(err);
    }

    data.password = hashedPassword;
    data.passwordSalt = salt;

    //create the user


    this.model('User').create(data, (err, user) => {
      if (err) {
        return callback(err, null);
      }

      // remove password and salt from the result
      user.password = undefined;
      user.passwordSalt = undefined;
      // return user if everything is ok
      callback(err, user);
    });
  });
};


function authenticateUser(email,password, callback) {
 
  this.model('User')
  .findOne({email:email })
  .exec((err, user) => {
    console.log(user);
    if (err) {
      return callback(err, null);
    }
    // no user found just return the empty user
    if (!user) {
      return callback(err, user);
    }

    // verify the password with the existing hash from the user
    passwordHelper.verify(
      password,
      user.password,
      user.passwordSalt,
      (err, result) => {
        if (err) {
          return callback(err, null);
        }

        // if password does not match don't return user
        if (result === false) {
          return callback(err, null);
        }

        // remove password and salt from the result
         user.password = undefined;
        user.passwordSalt = undefined;
        // return user if everything is ok
        callback(err, user);
      }
    );
  });
}

function changeUserPassword(oldPassword, newPassword, callback) {
  this
  .model('User')
  .findById(this.id)
  .select('+password +passwordSalt')
  .exec((err, user) => {
    if (err) {
      return callback(err, null);
    }

    // no user found just return the empty user
    if (!user) {
      return callback(err, user);
    }

    passwordHelper.verify(
      oldPassword,
      user.password,
      user.passwordSalt,
      (err, result) => {
        if (err) {
          return callback(err, null);
        }

        // if password does not match don't return user
        if (result === false) {
          let PassNoMatchError = new Error('Old password does not match.');
          PassNoMatchError.type = 'old_password_does_not_match';
          return callback(PassNoMatchError, null);
        }

        // generate the new password and save the user
        passwordHelper.hash(newPassword, (err, hashedPassword, salt) => {
          this.password = hashedPassword;
          this.passwordSalt = salt;

          this.save((err, saved) => {
            if (err) {
              return callback(err, null);
            }

            if (callback) {
              return callback(null, {
                success: true,
                message: 'Password changed successfully.',
                type: 'password_change_success'
              });
            }
          });
        });
      }
    );
  });
}
module.exports = mongoose.model('User', UserSchema);