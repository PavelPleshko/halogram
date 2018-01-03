var express = require('express');
var router = express.Router();
var postCtrl = require('../controllers/post');
var auth = require('../middlewares/authentication');



router.post('/post/new',auth.bearer(), postCtrl.createPost);
router.get('/posts/',auth.bearer(),postCtrl.getAuthorizedUserPosts);
router.get('/:userId/posts',auth.bearer(),postCtrl.getAuthorizedUserPosts);
router.post('/post/:postId/like',auth.bearer(), postCtrl.likePost);
router.post('/post/:postId/dislike',auth.bearer(), postCtrl.dislikePost);
module.exports = router;