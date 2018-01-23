/**
 * Created by lixinyi on 2017/11/2.
 */
var express = require('express');
var router = express.Router();

var User = require('../models/User');

var responseData;
router.use(function (res,req,next) {
	responseData = {
		errorCode:0,
		msg:''
	};
	next();
});

//登录
router.post('/user/login',function (req,res,next) {

	var username = req.body.username;
	var password = req.body.password;

	if(username == ''){
		responseData.errorCode = 1;
		responseData.msg = '用户名不能为空';
		res.json(responseData);
		return;
	}

	if(password == ''){
		responseData.errorCode = 2;
		responseData.msg = '密码不能为空';
		res.json(responseData);
		return;
	}

	//查询用户名密码是否相等
	User.findOne({
		username:username,
		password:password
	}).then(function (userInfo) {
		if(!userInfo){
			responseData.errorCode = 2;
			responseData.msg = '用户名密码错误';
			res.json(responseData); // 给客户端发送返回值
			return;
		}
		responseData.errorCode = 0;
		responseData.msg = '登录成功';
		responseData.username = userInfo.username;
		responseData.id = userInfo._id;
		var user = {
			username:userInfo.username,
			id:userInfo._id
		};
		req.cookies.set('user',JSON.stringify(user));
		res.json(responseData);
		return;
	});
});

// 注册
router.post('/user/register',function (req,res,next) {

	var username = req.body.username;
	var password = req.body.password;
	var pwdreq = req.body.passwordReq;

	if(username == ''){
		responseData.errorCode = 1;
		responseData.msg = '用户名不能为空';
		res.json(responseData);
		return;
	}

	if(password == ''){
		responseData.errorCode = 2;
		responseData.msg = '密码不能为空';
		res.json(responseData);
		return;
	}

	if(pwdreq != password){
		responseData.errorCode = 3;
		responseData.msg = '两次密码输入不一样';
		res.json(responseData);
		return;
	}

	// 用户名是否已注册
	User.findOne({
		username:username
	}).then(function (userInfo) {
		if(userInfo){
			responseData.errorCode = 4;
			responseData.msg = '用户名已注册';
			res.json(responseData); // 给客户端发送返回值
			return;
		}
		//存到数据库中
		var user = new User({
			username:username,
			password:password
		});
		return user.save();

	}).then(function (newInfo) {
		responseData.errorCode = 0;
		responseData.msg = '注册成功';
		var usermsg = {
			username:newInfo.username,
			id:newInfo._id
		};
		req.cookies.set('user',JSON.stringify(usermsg));
		res.json(responseData);
	});
});

// 退出
router.get('/user/loginout',function (req,res,next) {
	req.cookies.set('user',null);
	res.json(responseData);
});

module.exports = router;