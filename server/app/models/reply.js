'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ReplySchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  to:{
    type:ObjectId,
    ref:'User',
    required:true
  },
  comment:{
    type:ObjectId,
    ref:'Comment'
  },
  body: {
    type: String,
    required:true
  },
  likes:[
  {type:ObjectId,
    ref:'User'}
    ],
    dislikes:[
  {type:ObjectId,
    ref:'User'}
    ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});



module.exports = mongoose.model('Reply', ReplySchema);