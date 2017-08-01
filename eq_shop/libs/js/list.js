$(function(){
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

	// ajax请求
 	function requestAjax(){
	  	$.ajax({
			type:"get",
			url:"libs/data/listPro.txt",
			async:true,
			beforeSend:function(){
				$("#mask").show();
			},
			success:function(obj){
				$("#mask").hide();
				var	data = JSON.parse(obj)
				var i = 0;
				var up = true;
				function creatPro(pro){
					for(var k in pro.pro){
						var html = ""
							html +="<div class='col-xs-6 col-md-3'>"
							html +="<a href='product_detail.html?data=libs/data/listPro.txt&&id="+i+"'>"
							html +="<div class='thumbnail'>"
				        	html +="<img src='"+pro.pro[k].img+"'>"
				            html +="<div class='caption'>"
				            html +="<p>"+pro.pro[k].brand+"</p>"
				            html +="<p>￥<span id='price'>"+pro.pro[k].price+"</span></p></div></div></a></div>"    
						$("#pro_list").append(html);
						i++;
					}
				}
				creatPro(data)
				// 价格排序
			  	$(".list_nav div:nth-child(3)").on("touchstart",function(){
			  		$("#list_nav_content").hide()
			  		var attr = data;
			  		for(var j=0;j<=attr.pro.length-1;j++){
			  			for(var k=1+j;k<=attr.pro.length-1;k++){
			  				if(parseInt(attr.pro[j].price)>parseInt(attr.pro[k].price)){
			  					var l = attr.pro[j];
			  						attr.pro[j] = attr.pro[k];
			  						attr.pro[k] = l;
			  				}
			  			}
			  		}
			  		var trr = attr;
			  		if(up){
			  			attr.pro.reverse();
			  			$("#pro_list").empty();
			  			creatPro(attr);
			  			up = false;
			  		}else{
			  			$("#pro_list").empty();
			  			creatPro(trr);
			  			up = true;
			  		}
			  	})
			
			}
		})
  	}
  	requestAjax()
  //	myScroll.refresh();
  	// list_nav分类导航
  	$(".list_nav div:nth-child(1)").click(function(){
  			$("#list_nav_content").show().children('div').hide();
  			$("#list_nav_content .classify").show();	
  	})
  	$(".list_nav div:nth-child(2)").click(function(){
  		$("#list_nav_content").show().children('div').hide();
  		$("#list_nav_content #classify_brand").show();
  	})
  	$("#list_nav_content #classify_brand li").click(function() {
  		$("#list_nav_content").hide()
  	});
  	// 分类查询
  	$("#list_nav_content .classify ul:first li").eq(0).css("background","#f1f1f1");
  	$("#list_nav_content .classify .classify_1").eq(0).show().children('li').eq(0).css("background","white");
  	$("#list_nav_content .classify .classify_2").eq(0).show();
  	$("#list_nav_content .classify ul:first li").on("touchstart",function(){
  		$("#list_nav_content .classify ul:first li").css("background","#ccc");
  		$(this).css("background","#f1f1f1");
  		$("#list_nav_content .classify .classify_1").hide().eq($(this).index()).show().children('li').eq(0).css("background","white");
  		$("#list_nav_content .classify .classify_2").hide().eq($(this).index()).show();
  	})
  	$("#list_nav_content .classify .classify_1 li").on("touchstart",function(){
  		$("#list_nav_content .classify .classify_1 li").css("background","#f1f1f1");
  		$(this).css("background","white");
  	})
  	$("#list_nav_content .classify .classify_2 li").click(function(){
  		$("#list_nav_content").hide()
  	})	


  	// 滚动加载
	var myScroll = new IScroll('#wrapper', { 
		bounceTime: 1200,
		scrollbars:false,
		 mouseWheel: true,
		 click:true
	});
	
	myScroll.on("scrollEnd",function(){
		myScroll.refresh();
		if(myScroll.y <= myScroll.maxScrollY){
			requestAjax();
		}
	})
	myScroll.on('scrollStart',function(){
		myScroll.refresh();
	})
})




