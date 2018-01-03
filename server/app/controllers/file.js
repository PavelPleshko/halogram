'use strict';

const cloudinary= require('cloudinary');
const cloudConfig = require('../../config/cloudinary');


module.exports.deleteFileFromCloud= function(req,res,next){
	var public_id = req.params.publicId;
	console.log(public_id);
	if(!public_id){
		res.status(400).json({message:'No id was received'});
	}else{
		cloudinary.v2.uploader.destroy(public_id,cloudConfig.config,function(err,result){
			console.log('result is ',result);
			if(err){
				res.status(400).json(err);
			}else{

				res.status(200).json(result);
			}
		})
	}
}