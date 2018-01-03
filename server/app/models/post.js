var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
var _ = require('lodash');

var PostSchema = new Schema({
  author:{
    type:ObjectId,
    ref:'User'
  },
url:{
  type:String,
  required:true
},

title:{
  type:String,
  required:false
},
description:{
  type:String,
  required:false
},
likes:{
  type:[{type:ObjectId,ref:'User'}],
  default:[]
},
dislikes:{
  type:[{type:ObjectId,ref:'User'}],
  default:[]
},
comments:[
{type:ObjectId,ref:'Comment'}
],
createdAt:{
  type:Date,
  default:Date.now(),
  required:true
},
updatedAt:{
  type:Date
}
});


module.exports = mongoose.model('Post', PostSchema);