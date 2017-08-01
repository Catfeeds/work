$(function(){
	// 后退
	$(".back").click(function(){
		window.history.back(-1)
	})

	var data = localStorage.getItem("userData");
	console.log(data)
	 	if(data){
	 		var data = JSON.parse(data);
	 	}	
	 	$("#login_form #login_ing").click(function(){
	 		for(var i=0;i<data.user.length;i++){
		 			if($("#login_username").val()==data.user[i].username&&$("#login_username").val()==data.user[i].password){				
		 				localStorage.setItem("curUser",$("#login_username").val());
		 				window.location.href = "index.html";
		 				break;
		 			}else{
		 				$("#fault_hint").html("用户不存在")
		 			}
		 	}
	 	})	
		 		
	 	
})