'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const Reply = mongoose.model('Reply');
const ObjectId = mongoose.Types.ObjectId;
const recordHelper = require('../helpers/library');

module.exports.postReply= function(req,res,next){
	console.log(req.body);
	var reply = {};
	reply.body = req.body.body;
	reply.user = req.user.id;
	reply.to = req.body.to;
	reply.comment = req.comment.id;
	console.log(reply);
	Reply.create(reply,function(err,newReply){
		console.log(err,newReply);
		if(err){
			res.json(err);
		}else{
			Reply.findById(newReply._id)
			.populate(recordHelper.population('user'))
			.populate(recordHelper.population('to'))
			.exec(function(err,populatedReply){
				populatedReply.user.password = undefined;
				populatedReply.user.passwordSalt=undefined;
				req.comment.replies.push(newReply._id);
				req.comment.save();
				res.json(populatedReply);
			})
			
		}
	})
}


module.exports.getById = function(req, res, next) {
	var id = req.params.replyId;
   if (!ObjectId.isValid(id)) {
    res.status(404).send({ message: 'Not found.'});
  }

Reply.findById(id)
.populate(recordHelper.population('user'))
.exec(function(err,reply){
  if(err){
    next(err);
  }else if(reply){
   req.reply = reply;
	console.log(reply);
  next();
  }else{
    next(new Error('Failed to find reply'));
  }
})
};

module.exports.deleteReply = function(req,res,next){
	console.log(req.reply);
	Reply.remove({_id:req.reply._id},function(err,deleted){
		if(err){
			throw err;
		}else{
			res.status(200).json(deleted);
		}
	});
}


module.exports.likeReply=function(req,res,next){
	console.log('its working');
var reply = req.reply;

var idx = reply.likes.findIndex(function(id){
	return id == req.user._id.toString();
})
console.log(idx);
if(idx<0){
	reply.likes.push(req.user._id);
	reply.save(function(err,reply){
		if(err) throw err;
Reply.findById(reply._id)
	.populate(recordHelper.population('user'))
			.populate(recordHelper.population('to')).exec(function(err,savedReply){
		if(err){
			res.json(err);
		}else{
			res.status(200).json(savedReply);
		}		
	})
})
}else{
	
	res.status(500).json(new Error('It seems like the error occured that can be connected with the server...'))
}


	
	
}


module.exports.unlikeReply=function(req,res,next){
	var reply = req.reply;
	var userId = req.user._id.toString();

	var idx = reply.likes.findIndex(function(id){
		return id == userId;
	})
	console.log(idx);
	if(idx >= 0){
		reply.likes.splice(idx,1);
		reply.save(function(err,reply){
		if(err) throw err;
Reply.findById(reply._id)
	.populate(recordHelper.population('user'))
			.populate(recordHelper.population('to')).exec(function(err,savedReply){
		if(err){
			res.json(err);
		}else{
			res.status(200).json(savedReply);
		}		
	})
})
	}else{
		res.status(500).json(new Error('Internal server error occured'));
	}
}





