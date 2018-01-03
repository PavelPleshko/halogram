'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const Post = mongoose.model('Post');
const ObjectId = mongoose.Types.ObjectId;
const recordHelper = require('../helpers/library');

module.exports.postComment= function(req,res,next){
	console.log(req.body);
	var comment = {};
	comment.body = req.body.data;
	comment.user = req.user.id;
	comment.post = req.post.id;
	console.log(comment);
	Comment.create(comment,function(err,newComment){
		console.log(err,newComment);
		if(err){
			res.json(err);
		}else{
			Comment.findById(newComment._id)
			.populate(recordHelper.population('user')).exec(function(err,populatedComment){
			req.post.comments.push(newComment._id);
			req.post.save();
			res.json(populatedComment);
			})
			
		}
	})
}


module.exports.getById = function(req, res, next) {
	var id = req.params.commentId;
   if (!ObjectId.isValid(id)) {
    res.status(404).send({ message: 'Not found.'});
  }

Comment.findById(id)
.populate(recordHelper.population('user'))
.populate(recordHelper.population('replies'))
.exec(function(err,comment){
  if(err){
    next(err);
  }else if(comment){
  	console.log(comment);
   req.comment = comment;

  next();
  }else{
    next(new Error('Failed to find comment'));
  }

})
};

module.exports.deleteComment = function(req,res,next){
	Comment.remove({_id:req.comment._id},function(err,deleted){
		if(err){
			throw err;
		}else{
			res.status(200).json(deleted);
		}
	});
}


module.exports.likeComment=function(req,res,next){
var comment = req.comment;
var idx = comment.likes.findIndex(function(id){
	return id == req.user._id.toString();
})
if(idx<0){
	comment.likes.push(req.user._id);
	comment.save(function(err,savedComment){
		if(err){
			res.json(err);
		}else{
			Comment.findById(savedComment._id)
			.populate(recordHelper.population('user'))
			.populate(recordHelper.population('replies')).exec(function(err,comment){
				console.log(comment);
				res.status(200).json(comment);
			})			
		}		
	})
}else{
	res.status(500).json(new Error('It seems like the error occured that can be connected with the server...'))
}


}


module.exports.unlikeComment=function(req,res,next){
	var comment = req.comment;
	var userId = req.user._id.toString();

	var idx = comment.likes.findIndex(function(id){
		return id == userId;
	})
	if(idx >= 0){
		comment.likes.splice(idx,1);
		comment.save(function(err,savedComment){
			if(err){
				res.json(err);
			}else{
				res.status(200).json(savedComment);
			}
		});
	}else{
		res.status(500).json(new Error('Internal server error occured'));
	}
}


module.exports.getRepliesForComment = function(req,res,next){

}







