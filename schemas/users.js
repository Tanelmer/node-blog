/**
 * Created by lixinyi on 2017/11/3.
 */
var mongoose = require('mongoose');
// 定义用户表结构
module.exports = new mongoose.Schema({
	username:  String, //用户名
	password: String, //密码
	isAdmin:{
		type: Boolean,
		default: false
	}
});