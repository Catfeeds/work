$(function(){

	//滚动加载
	var myScroll = new IScroll('#wrapper', { 
		bounceTime: 1200,
		scrollbars:false,
		 mouseWheel: true,
		 click:true
	});
	myScroll.on("scrollEnd",function(){
		if(myScroll.y <= myScroll.maxScrollY){
			requestAjax();
		}
	})


	$("#back_top").on("touchstart",function(){
		$("#content").css('transform', ' translate(0px, 0px)');;
	})
	
	
	//轮播图
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
	
  // ajax请求
 	function requestAjax(){
	  	$.ajax({
			type:"get",
			url:"libs/data/homePro.txt",
			async:true,
			beforeSend:function(){
				$("#mask").show();
			},
			success:function(obj){
				$("#mask").hide();
				var pro = JSON.parse(obj)
				var i = 0;
				console.log(pro)
				for(var k in pro.pro){
					var html = ""
						html +="<div class='thumbnail'>"
						html +="<a href='product_detail.html?data=libs/data/homePro.txt&&id="+i+"'>"
			        	html +="<img src='"+pro.pro[k].img+"'>"
			            html +="<div class='caption'>"
			            html +="<p>"+pro.pro[k].brand+"</p>"
			            html +="<p>￥<span id='price'>"+pro.pro[k].price+"</span><span>"+pro.pro[k].comment+"人已购买</span></p></div></a></div>"    
					$("#pro_list").append(html)
					i = i + 1;
				}
				myScroll.refresh()
			}
		})
  	}
})


