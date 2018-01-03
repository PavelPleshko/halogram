var express = require('express');
var router = express.Router();
var postCtrl = require('../controllers/post');
var commentCtrl = require('../controllers/comment');
var auth = require('../middlewares/authentication');

router.param('postId',postCtrl.getById);

router.post('/:postId/comment',auth.bearer(),commentCtrl.postComment);
router.delete('/:postId/comment/:commentId',auth.bearer(),commentCtrl.getById,commentCtrl.deleteComment);
router.post('/:postId/comment/:commentId/like',auth.bearer(),commentCtrl.getById,commentCtrl.likeComment);
router.post('/:postId/comment/:commentId/unlike',auth.bearer(),commentCtrl.getById,commentCtrl.unlikeComment);
module.exports = router;