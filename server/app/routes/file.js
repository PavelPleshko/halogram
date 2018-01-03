var express = require('express');
var router = express.Router();
var fileCtrl = require('../controllers/file');
var auth = require('../middlewares/authentication');

router.post(
	'/cloudinary/destroy/:publicId',
	auth.bearer(),
	fileCtrl.deleteFileFromCloud);


module.exports = router;