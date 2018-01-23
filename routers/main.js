/**
 * Created by lixinyi on 2017/11/2.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next) {
	return res.render('main/index',{
		user:req.userInfo
	});
});
module.exports = router;