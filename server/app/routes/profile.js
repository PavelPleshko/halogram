var express = require('express');
var router = express.Router();
var profileCtrl = require('../controllers/profile');
var auth = require('../middlewares/authentication');

router.param('userId',profileCtrl.getById);

router.post('/:userId/update', profileCtrl.updateProfile);
router.get('/profiles',auth.bearer(),profileCtrl.getProfiles);
router.post('/profiles/:userId/follow',auth.bearer(),profileCtrl.followProfile);
router.post('/profiles/:userId/unfollow',auth.bearer(),profileCtrl.unfollowProfile);
router.get('/profiles/:userId',profileCtrl.getProfile);
module.exports = router;