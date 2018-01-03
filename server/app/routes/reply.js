var express = require('express');
var router = express.Router();
var commentCtrl = require('../controllers/comment');
var replyCtrl = require('../controllers/reply');
var auth = require('../middlewares/authentication');

router.post(
	'/comment/:commentId/reply',
	auth.bearer(),commentCtrl.getById,
	replyCtrl.postReply);


router.delete(
	'/comment/:commentId/:replyId',
	auth.bearer(),replyCtrl.getById,
	replyCtrl.deleteReply);


router.post(
	'/comment/:commentId/:replyId/like',
	auth.bearer(),replyCtrl.getById,
	replyCtrl.likeReply);


router.post(
	'/comment/:commentId/:replyId/unlike',
	auth.bearer(),replyCtrl.getById,
	replyCtrl.unlikeReply);


module.exports = router;