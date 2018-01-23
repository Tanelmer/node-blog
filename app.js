/**
 * Created by lixinyi on 2017/11/1.
 * 入口文件
 */

var express = require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express(); // 服务 - http.createSever
var cookies = require('cookies');
var User = require('./models/User');
/*
	定义模板引擎
	参数：
		1.模板文件后缀
		2.解析模板内容方法
 */
app.engine('html', swig.renderFile);

app.set('views','./views'); // 设置模板存放目录
app.set('view engine','html'); // 注册模板引擎
swig.setDefaults({cache:false});

//bodyParser 设置
app.use(bodyParser.urlencoded({extended:true}));

//cookie设置
app.use(function (req,res,next) {
	req.cookies = new cookies(req,res);
	req.userInfo = {};
	if(req.cookies.get('user')){
		try{
			req.userInfo = JSON.parse(req.cookies.get('user'));

			//获取当前登录用户类型
			User.findById(req.userInfo.id).then(function (userinfo) {
				req.userInfo.isAdmin = Boolean(userinfo.isAdmin);
				next();
			});
		}catch (e){
			next();
		}
	}else{
		next();
	}
})

/*
	路由绑定
	分模块绑定
 */
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));


app.use('/public',express.static(__dirname + '/public')); //静态文件

var options = {
	useMongoClient:true
};
mongoose.connect('mongodb://localhost:27017/blog', options, function(error) {
	// Check error in initial connection. There is no 2nd param to the callback.
	if(error){
		console.log('数据库连接失败');
	}else{
		console.log('数据库连接成功');
		app.listen(8888); // 监听端口
		console.log('blog start on port ' + 8888);
	}
});





