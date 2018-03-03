var express = require('express');
var router = express.Router();
var fileCtrl = require('../controllers/file');
var auth = require('../middlewares/authentication');
var multer= require('multer');

var storage = multer.memoryStorage()
var upload = multer({storage:storage});



router.post(
	'/cloudinary/destroy/:publicId',
	auth.bearer(),
	fileCtrl.deleteFileFromCloud);
router.post(
	'/image/upload',upload.single('file'),
	fileCtrl.uploadImageToCloud
	);

module.exports = router;