'use strict';

const _ = require('lodash');
const passport = require('passport');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const ObjectId = mongoose.Types.ObjectId;
const recordHelper = require('../helpers/library');

module.exports.createPost = function(req,res,next){
	var data=req.body;	
	data.author = req.user.id;
	Post.create(data,function(err,post){
		if(err){
			console.log(err);
			res.status(400).json(err);
		}else{
			console.log(post);
			
			res.status(200).json(post);
		}
	})
} 

module.exports.likePost=function(req,res,next){
var postId = req.params.postId;
Post.findById(postId,function(err,post){
var idx = post.likes.findIndex(function(id){
	return id == req.user._id.toString();
})

if(idx<0){
	post.likes.push(req.user._id);
	post.save(function(err,savedPost){
		if(err){
			res.json(err);
		}else{
			res.status(200).json(savedPost.likes);		
		}	
		
		
})
}else{
	res.json({message:'You have already liked this post.This can do only once per post.'})
}
})
}

module.exports.dislikePost=function(req,res,next){
var postId = req.params.postId;
Post.findById(postId,function(err,post){
var idx = post.dislikes.findIndex(function(id){
	return id == req.user._id.toString();
})

if(idx<0){
	post.dislikes.push(req.user._id);
	post.save(function(err,savedPost){
		if(err){
			res.json(err);
		}else{
			res.status(200).json(savedPost.dislikes);		
		}	
		
})
}else{
	res.json({message:'You have already disliked this post.This can do only once per post.'})
}
})
}


module.exports.getAuthorizedUserPosts = function(req,res,next){
	var id;
if(req.params.userId){
	id = req.params.userId;
}else{
	id = req.user.id;
}
	
	Post.find({author:id})
	.populate(recordHelper.population('comments'))
	.exec(function(err,posts){
		if(err){
			console.log(err);
		}else{
			res.json(posts);
		}
	})
}


module.exports.getById = function(req, res, next,id) {
   if (!ObjectId.isValid(id)) {
    res.status(404).send({ message: 'Not found.'});
  }

Post.findById(id,function(err,post){
  if(err){
    next(err);
  }else if(post){
   req.post = post;
  next();
  }else{
    next(new Error('Failed to find post'));
  }

})
};