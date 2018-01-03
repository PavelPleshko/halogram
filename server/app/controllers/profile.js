
const _ = require('lodash');
const mongoose = require('mongoose');
const Profile = mongoose.model('Profile');
const ObjectId = mongoose.Types.ObjectId;
const User = mongoose.model('User');


module.exports.createProfile = function(req, res, next) {
  if(req.profile){
    updateProfile(req,res,next);
  }else{
    Profile.create(req.body, function(err, profile) {
    if (err) {
      return next(err);
    }
    res.status(201).json(profile);
  });
  } 
};


module.exports.getById = function(req, res, next,id) {
   if (!ObjectId.isValid(id)) {
    res.status(404).send({ message: 'Not found.'});
  }
User.findById(id,function(err,user){
  if(err){
    next(err);
  }else if(user){
   req.user = user;
  next();
  }else{
    next(new Error('Failed to find profile'));
  }
})
};

module.exports.getProfiles = function(req,res,next){
  var userId = req.user._id.toString();
  User.find({_id:{$ne:userId}},function(err,users){
    if(err){
      throw err;
    }else{
      res.json(users);
    }
  })
}

module.exports.getProfile = function(req,res,next){
  var id = req.params.userId;

  User.findById(id,function(err,user){
    if(err){
      throw err;
    }else{
      user.password = undefined;
      user.passwordSalt = undefined;
      res.json(user);
    }
  })
}

module.exports.followProfile = function(req,res,next){
  var id = req.params.userId;
  var user = req.user;

  var found = findFollowing(user,id);
  if(found>=0){
    res.json(new Error('An error occured.Seems like you are already following this user.'))
  }else{
    req.user.profile.following.push(id);
    req.user.save();
    User.findById(id,function(err,foundUser){
      if(err){
        throw err;
      }else{
        foundUser.profile.followers.push(user._id);
        foundUser.save(function(err,updatedUser){
          if(err){

          }else{
            res.status(200).json(user);
          }
        });
      }
    })
  }
}

module.exports.unfollowProfile = function(req,res,next){
  var id = req.params.userId;
  var user = req.user;
console.log(user,id);
  var found = findFollowing(user,id);
  console.log(found);
  if(found<0){
    res.json(new Error('An error occured.Try again later.'))
  }else{
    user.profile.following.splice(found,1);

    process.nextTick(function(){
      user.save(function(err,updatedUser){
        console.log(updatedUser);
        res.json(updatedUser);
    });
     }); 
    User.findById(id,function(err,foundUser){
      if(err){
        throw err;
      }else{
        var idx = findFollowing(foundUser,user._id);
        foundUser.profile.followers.splice(idx,1);
        foundUser.save(function(err,updatedUser){
          if(err){

          }
        });
      }
    })
  }
}

module.exports.updateProfile = function(req, res, next) {
  var user = req.user;
  var profile = user.profile;
  _.assign(profile, req.body);
  
  user.save(function(err, updatedProfile) {
    if (err) {
      return next(err);
    }
    updatedProfile.password = undefined;
    updatedProfile.passwordSalt = undefined;
    res.json(updatedProfile);
  });
};


function findFollowing(user,id){
  return user.profile.following.findIndex(function(userId){
    return userId.toString() === id;
  })
}
