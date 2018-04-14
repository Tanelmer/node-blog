/**
 * Created by lixinyi on 2017/11/2.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');


router.use(function(req,res,next) {
	if(!req.userInfo.isAdmin){
		return res.send('权限不够啦，请联系elmer同学开通管理员账号');
	}
	next();
});

//admin首页
router.get('/',function (req,res,next) {
	return res.render('admin/index',{
		user:req.userInfo
	});
});

//用户管理
router.get('/user',function (req,res,next) {
	return res.render('admin/manage-user',{
		user:req.userInfo
	});
});

//获取用户表中数据
User.find().then(function (users) {
	
});

module.exports = router;