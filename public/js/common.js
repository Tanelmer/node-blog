/**
 * Created by lixinyi on 2017/11/3.
 */

// 回到顶部
$(".foot .back").click(function () {
	$("body,html").animate({scrollTop: 0}, 1000)
	return false;
});


//banner
var t = 0, n = 0, count;
$(document).ready(function () {
	count = $("#banner_list a").length;
	$("#banner_list a:not(:first-child)").hide();
	$("#banner_info").html($("#banner_list a:first-child").find("img").attr('alt'));
	$("#banner_info").click(function () {
		window.open($("#banner_list a:first-child").attr('href'), "_blank")
	});
	$("#banner li").click(function () {
		var i = $(this).text() - 1; //获取Li元素内的值，即1，2，3，4
		n = i;
		if (i >= count) return;
		$("#banner_info").html($("#banner_list a").eq(i).find("img").attr('alt'));
		$("#banner_info").unbind().click(function () {
			//unbind()方法用来删除指定元素的所有事件处理程序
			window.open($("#banner_list a").eq(i).attr('href'), "_blank")
		})
		$("#banner_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
		//filter() 方法允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。
		document.getElementById("banner").style.background = "";
		$(this).toggleClass("on");
		$(this).siblings().removeAttr("class");
	});
	t = setInterval("showAuto()", 3000);
	$("#banner").hover(function () {
			clearInterval(t)
		},
		function () {
			t = setInterval("showAuto()", 4000);
		}
	);

	//登录注册事件绑定
	$('#loginModal .login-btn').on('click',function () {
		var username = $('#username').val();
		var password = $('#password').val();
		login(username,password)
	});
	$('#registerModal .register-btn').on('click',function () {
		var username = $('#inputUsername').val();
		var password = $('#inputPassword').val();
		var passwordReq = $('#inputPasswordReq').val();
		register(username,password,passwordReq)
	});
	$('#loginout').on('click',function () {
		loginOut();
	});
});

function showAuto() {
	n = n >= (count - 1) ? 0 : ++n;
	$("#banner li").eq(n).trigger('click');
}

//登录注册

function login(username,password) {
	$.ajax({
		type:'post',
		url:'/api/user/login',
		data:{
			username:username,
			password:password
		},
		dataType:'json',
		success:function (data) {
			if(data.errorCode == 0){
				// $('.login').hide();
				// $('.register').hide();
				// $('.login').parent().append('<li><span class="nav_bar">'+data.username+'</span><a href="javascript:;" class="loginout nav_bar">登出</a></li>');
				// $('#loginModal').modal('hide');
				window.location.reload();
			}else{
				alert({
					tit:'登录失败',
					con:data.msg,
					btn:['OK'],
					evenTrue:function(){
					}
				});
			}
		}
	});
}

function register(username,password,passwordReq) {
	$.ajax({
		type:'post',
		url:'/api/user/register',
		data:{
			username:username,
			password:password,
			passwordReq:passwordReq
		},
		dataType:'json',
		success:function (data) {
			if(data.errorCode == 0){
				alert({
					tit:'注册成功',
					con:'大家一起来学习Node~',
					btn:['OK'],
					evenTrue:function(){
						$('.register').hide();
						$('#registerModal').modal('hide');
						// login(data.username,data.password);
						window.location.reload();
					}
				});
			}else{
				alert({
					tit:'注册失败',
					con:data.msg,
					btn:['OK'],
					evenTrue:function(){
						$('#registerModal').modal('hide');
					}
				});
			}
		}
	});
}

function loginOut() {
	$.ajax({
		type:'get',
		url:'/api/user/loginout',
		dataType:'json',
		success:function (data) {
			if(data.errorCode == 0){
				window.location.reload();
			}
		}
	});
}

/*
	window.alert from alltuu
 */
window.alert = function(options){
	if(typeof(options) != 'object'){
		options = {con: options};
	}

	var opts = $.extend({
		tit: '温馨提示',					//标题
		con: '',						//内容
		btn: ['确定'],					//按钮（最多2个按钮）
		width: 210,						//弹窗宽度
		height: 77,						//弹窗高度
		evenTrueClose: true,			//触发确定事件后是否关闭弹窗
		evenFalseClose: true,			//触发取消事件后是否关闭弹窗
		classTrue: '' || 'btn-primary',	//确定按钮添加 class
		classFalse: '' || 'btn-gray',	//取消按钮添加 class
		evenTrue: function(){},			//确定事件函数
		evenFalse: function(){},		//取消事件函数
	}, options);

	var btnStr = '',
		btnCount=opts.btn.length,
		btnWidth = (opts.width - 24 * (btnCount -1)) / btnCount;

	alertClose();

	for(var i=0; i<btnCount; i++){
		if(i==0){
			btnStr += '<button class="btn btn-sm ' + opts.classTrue + '" id="alertTrue" style="width:' + btnWidth + 'px">' + opts.btn[i] + '</button>';
		}else{
			btnStr += '<button class="btn btn-sm ' + opts.classFalse + '" id="alertFalse" style="margin-left:24px;width:' + btnWidth + 'px">' + opts.btn[i] + '</button>';
		}
	}

	var alertStr = ''
		+ '<div class="layout">'
		+ '<div class="alert-box" style="width:' + (opts.width + 50) + 'px; height:' + (opts.height + (opts.tit ? 95 : 66)) + 'px;">'
		+ (opts.tit ? '<div class="alert-title">' + opts.tit + '</div>': '')
		+ '<div class="alert-content" style="width:' + opts.width + 'px; height:' + opts.height + 'px;">' + opts.con + '</div>'
		+ '<div class="alert-button">' + btnStr + '</div>'
		+ '</div>'
		+ '</div>';
	$('body').append(alertStr);

	$('#alertTrue').unbind('click').click(function(){
		opts.evenTrue && opts.evenTrue();
		if(opts.evenTrueClose){
			alertClose();
		}
	});
	$('#alertFalse').unbind('click').click(function(){
		opts.evenFalse && opts.evenFalse();
		if(opts.evenFalseClose){
			alertClose();
		}
	});

	function alertClose(){
		$('.alert-box').parent().remove();
	}
}