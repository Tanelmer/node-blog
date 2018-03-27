/**
 * Created by lixinyi on 2017/11/2.
 */
var express = require('express');
var router = express.Router();

router.use(function(req,res,next) {
	if(!req.userInfo.isAdmin){
		return res.send('权限不够啦，请联系elmer同学开通管理员账号');
	}
	next();
});

router.get('/',function (req,res,next) {
	return res.render('admin/index',{
		user:req.userInfo
	});
});

module.exports = router;