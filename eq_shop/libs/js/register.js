$(function () {
	$(":input").focus(function(){
		$(this).closest("div").css({border:"1px aqua solid",})
	}).blur(function(){
		$(this).closest("div").css({border:"none",})
	})

	// 后退
	$(function(){
		$(".back").click(function(){window.history.back(-1)})
	})

	// 头部列表
	var show = true;
	$("#ex_listMenu").on("touchstart",function(){
		if(show){$("#listMenu").show(500);show = false}else{
			$("#listMenu").hide(500);show = true
		}
	})

	
	// 验证
	 $( "#register_form" ).validate({
	 	rules: {
				firstname: "required",
      			lastname: "required",
      			tel: {
					required: true,
					rangelength:[11,11],
					digits:true
				},
				code: {
					required: true,
					code:true
				},
				username: {
					required: true,
					rangelength:[4,20]
				},
				password: {
					required: true,
					rangelength:[6,16]
				},
				repassword: {
					required: true,
					rangelength:[6,16],
					equalTo: "#password"
				}
			},
	 	errorPlacement: function(error, element) {
	 		$("#fault_hint").html(" ")  
    		error.appendTo($("#fault_hint"));  
		},
		messages:{
			tel:{
				required:"手机格式不正确",
				rangelength:"手机长度不正确",
				digits:"手机号码只能是数字"
			},
			code:{
				required:"验证码不正确",
				code:"请输入四位数的验证码"
			},
			username:{
				required:"请输入用户名",
				rangelength:"用户名4-16位，包括数字、字母、中文"
			},
			password:{
				required:"请输入密码",
				rangelength:"密码长度6-16位"
			},
			repassword:{
				required: "请再次输入密码",
				rangelength:"密码长度6-16位",
				equalTo: "两次密码不符，请重新输入"
			}
		},
	 });

	 // 验证码验证
	 var str = ""
	function code () {
		    var str=""
                for(i=0;i<4;i++){
                    num = parseInt(Math.random()*62);
                    if(num<=9){
                        str=str+num;
                    }else if(num>=10&&num<36){
                        str = str + String.fromCharCode(num+55);
                    }else if(num>=36&&num<=62){
                        str = str + String.fromCharCode(num+61)
                    }   
                }
            return str;
	}
	$("#register_form tr td span #re_code").click(function(){
		 str = code()
		 $(this).closest('span').prev("input").val(4444)
	})


	 $("#submit").click(function() {
	 	if($("#register_form").valid()){
	 		var obj = {
	 			"username":$("#username").val(),
	 			"password":$("#password").val(),
	 			"tel":$("#tel").val(),
	 		}
	 		var data = localStorage.getItem("userData");

	 		if(data){
	 			var data = JSON.parse(data);
		 			console.log(data);
		 			data.user.push(obj);
	 			var userData = JSON.stringify(data);
					localStorage.setItem("userData",userData);
					console.log(localStorage.getItem("userData"));
	 		}else{
	 			var data = {
	 				"user":[]
	 			}
	 			data.user.push(obj)
	 			userData = JSON.stringify(data)
				localStorage.setItem("userData",userData)
				console.log(localStorage.getItem("userData"))
	 		}
	 		
	 	}
	 });
})