/**
 * @author Mr.Tu
 * http://www.loveweb8.com/
 *
 * Version 1.1 (2014-2-26)
 * 增加了beforeCreate，showSuccess，beforeHide，removeSuccess四个事件
 *
 * Version 1.0 (2014-2-21)
 * Copyright (c) 2014 我爱Web吧
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2014-2-21 15:30
 */
(function($){
	
	var options;
	
	$.messager = { 
		defaults: {
				version: '1.0',
				className: 'messager',
				title: '信息提示',
				content: 'loading...',
				width: 200,
				height: 100,
				time: 3000,
				autoClose: false,
				animsType: 'slide',
				animsSpeed: 600,
				beforeCreate: function(){},
				showSuccess: function(){},
				beforeHide: function(){},
				removeSuccess: function(){}
		},
		show: function(config){
			// 判断是否已经生成
			if ($("#messager").is("div")) return;
			
			if (typeof config === 'string') {
				config = {content: config};
			};
			// 合并配置
			options = $.extend({}, $.messager.defaults, config);
			if(typeof options.content === "object"){
				options.content = $(options.content).html();
			}
			options.beforeCreate(options);
			// 生成div
			init();
			// 显示方式
			switch (options.animsType) {
				case "slide":
					$("#messager").slideDown(options.animsSpeed);
					break;
				case "fade":
					$("#messager").fadeIn(options.animsSpeed);
					break;
				case "show":
					$("#messager").show(options.animsSpeed);
					break;
				default:
					$("#messager").slideDown(options.animsSpeed);
					break;
			};
			// 设置关闭
			$("#messager .msg_title_close").click(function(){
				$.messager.hide();
			});

			// 自动关闭
			if(!(options.autoClose === false)){
				setTimeout('$.messager.hide();', options.time);
			}
			setTimeout(function(){options.showSuccess($("#messager"), options);}, options.animsSpeed);
		},
		hide: function(){
			// 判断是否生成提示
			if(options === undefined) return;
			// 判断是否停止
			if(options.beforeHide($("#messager"), options) === false) return;
			// 关闭方式
			switch (options.animsType) {
				case "slide":
					$("#messager").slideUp(options.animsSpeed);
					break;
				case "fade":
					$("#messager").fadeOut(options.animsSpeed);
					break;
				case "show":
					$("#messager").hide(options.animsSpeed);
					break;
				default:
					$("#messager").slideUp(options.animsSpeed);
					break;
			};
			setTimeout('$.messager.remove();', options.animsSpeed);
		},
		remove: function(){
			$("#messager").remove();
			options.removeSuccess();
		}};
		// 创建窗口
		function init(){
			var msg = $('<div id="messager" style="width:'+options.width+'px; height:'+options.height+'px; display:none;"></div>');
			var title = $('<div class="msg_title"><div class="closepop cur pa msg_title_close" style="background:none;top:12px;right:12px;"><img src="/static/shangjia/images/closebtn.jpg" alt=""></div><em style="display:inline-block;font-weight:bold;margin-top:12px;">'+options.title+'</em></div>');
			var content = $('<div class="msg_content">'+options.content+'</div>');
			msg.append(title).append(content).addClass(options.className);
			$(document.body).append(msg);
		};
})(jQuery);