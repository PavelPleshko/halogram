'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  post:{
    type:ObjectId,
    ref:'Post'
  },
  body: {
    type: String,
    required:true
  },
  likes:[
  {type:ObjectId,
    ref:'User'}
    ],
    replies:[
    {type:ObjectId,
      ref:'Reply'
    }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});



module.exports = mongoose.model('Comment', CommentSchema);