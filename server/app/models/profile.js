var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Profile = require('./profile');
const ObjectId = Schema.Types.ObjectId;
var _ = require('lodash');

var ProfileSchema = new Schema({
username:{
  type:String
},
profileImg:{
  type:String
},
 
  followers:{
    type:[{type:ObjectId,ref:'User'}],
    default:[]
  },
   following:{
    type:[{type:ObjectId,ref:'User'}],
    default:[]
  },
  phoneNumber: {
    type: String
  }
});


module.exports = mongoose.model('Profile', ProfileSchema);