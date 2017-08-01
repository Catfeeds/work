$(function(){
	// 后退
	$(function(){
		$(".back").click(function(){window.history.back(-1)})
	})

	// banner
	 var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		paginationClickable: true,
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: 2500,
		autoplayDisableOnInteraction: false
	});

	 // 头部列表
	var show = true;
	$("#ex_listMenu").on("touchstart",function(){
		if(show){$("#listMenu").show(500);show = false}else{
			$("#listMenu").hide(500);show = true
		}
	})

	// 详情评论转换
	$("#Pro_detail").css({background:"white",color:"purple"})
	$("#Pro_detail").on("touchstart",function(){
		$("#cristic").css({background:"none",color:"white"});
		$(this).css({background:"white",color:"purple"});
		$(".critrcism").hide();
		$(".content").show();
	})
	$("#cristic").on("touchstart",function(){
		$("#Pro_detail").css({background:"none",color:"white"});
		$(this).css({background:"white",color:"purple"});
		$(".content").hide();
		$(".critrcism").show();
		repuestAjax()
	})
	// 评论内容请求
	function repuestAjax(){
		$.ajax({
			type:"get",
			url:"libs/data/critrcism.txt",
			async:true,
			beforeSend:function(){
				$("#mask").show();
			},
			success:function(obj){
				$("#mask").hide();
				var data = JSON.parse(obj)
				for(var k in data.content){
					var html = ""
						html +="<ul class='list-group'>";
					    html +="<li class='list-group-item'>";
					    html +="<img src='"+data.content[k].img+"'>"+data.content[k].anonymity;
					    html +="<span>"+data.content[k].cristic_time+"</span></li>";
					    html +="<li class='list-group-item'><div>";
					    html +="<span class='glyphicon glyphicon-star'></span>";
						html +="<span class='glyphicon glyphicon-star'></span>";
						html +="<span class='glyphicon glyphicon-star'></span>";
						html +="<span class='glyphicon glyphicon-star'></span>";
						html +="<span class='glyphicon glyphicon-star'></span>";
						html +="</div><div>"
					    html +=""+data.content[k].content +"</div>"
					    html +="<div>购买日期："+data.content[k].cristic_time+"</div></li></ul>"
					$(".critrcism").append(html)
				}
				//myScroll.refresh()
			}
		})
	}

	//截取参数
	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
	} 
	var data = getQueryString("data");
	var id = getQueryString("id");

	//详情请求
	var img = "";
	var price="";
	var brand ="";
		$.ajax({
			type:"get",
			url:'libs/data/listPro.txt',
			async:true,
			beforeSend:function(){
				//$("#mask").show();
			},
			success:function(obj){
				//$("#mask").hide();
				var data = JSON.parse(obj)
				$("#pro_brand").html(data.pro[id].brand);
				$("#price").html(data.pro[id].price);
				brand = data.pro[id].brand;
				price = data.pro[id].price;
				img = data.pro[id].img;
			}
		})
		
	// 加入购物车
	//window.localStorage.removeItem("cart")
	$("#add_cart").on("touchstart",function(){
		var obj = {
			"img":img,
			"price":price,
			"brand":brand
		}
		console.log(obj)
		var cart = localStorage.getItem("cart");
		if(cart){
	 			var data = JSON.parse(cart);
		 			data.cart.push(obj);
	 			var info = JSON.stringify(data);
					localStorage.setItem("cart",info);
	 		}else{
	 			var data = {
	 				"cart":[]
	 			}
	 			data.cart.push(obj)
	 			info = JSON.stringify(data)
				localStorage.setItem("cart",info)
				console.log(localStorage.getItem("cart"))
	 		}
	 	cartMount()
	 	alert("你已成功加入购物车")
	 	//window.location.href = "shop_cart.html"
	})

	// 计算购物车数量
	function cartMount(){
		var cart = localStorage.getItem("cart");
		if(cart){
			var data = JSON.parse(cart);
			$("#cart_mount #mount").html(data.cart.length)
		}
	}
	cartMount()
})