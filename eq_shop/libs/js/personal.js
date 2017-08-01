$(function () {
	// 后退
	$(function(){
		$(".back").click(function(){window.history.back(-1)})
	})

	$(".nav").load("nav.html?_="+Math.random())

	// 头部列表
	var show = true;
	$("#ex_listMenu").on("touchstart",function(){
		if(show){$("#listMenu").show(500);show = false}else{
			$("#listMenu").hide(500);show = true
		}
	})

	var user = localStorage.getItem("curUser");
	if(user){
		$("#username").html(user);
	}else{
		$("#username").html("未登录");
	}
})