$(function(){
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
	
	$(".nav").load("nav.html?_="+Math.random())
	$(".content #classify_menu li").eq(0).css("background","#f1f1f1")
	$(".content #classify_menu li").click(function(){
		$(".content #classify_menu li").css('background', 'white').eq($(this).index()).css("background","#f1f1f1")
		requestAjax($(this).index())
	})
	function requestAjax(x){
	  	$.ajax({
			type:"get",
			url:"libs/data/classify"+(x+1)+".txt",
			async:true,
			beforeSend:function(){
				$("#mask").show();
			},
			success:function(obj){
				$("#mask").hide();
				$(".classify_proList .pro_comment").empty()
				var pro = JSON.parse(obj)
				var i = 0;
				for(var k in pro.pro){
					var html = ""
						html +="<div class='cPro'><img src='"+pro.pro[k].img+"'><p>"+pro.pro[k].brand+"</p></div>" 
					$(".classify_proList .pro_comment").append(html);
					i++;
				}
			}
		})
  	}
  	requestAjax(0)
})