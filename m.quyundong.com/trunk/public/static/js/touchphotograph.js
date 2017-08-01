(function(){
	var $myul = $("#photograph ul"),
		$mylis = $("#photograph ul li"),
		$cover = $("#photographCover"),
		$photoAlbum = $(".photoAlbum"),
		$page = $(".page"),
		$photoAlbumClose = $(".photoAlbumClose"),
		starX = null,
		dX = null,
		delta = null,
		starXtrue = null,
		starTime = null,
		endTime = null,
		animateTime = 300,
		animateTimeEdge = 1000,
		page = 1;

	$myul.css("width",$mylis.length * 100 + "%");
	$mylis.each(function(){
		$(this).css({"width":100/$mylis.length + "%"});
	});

	$photoAlbum.click(function(){
		$cover.css("display","block");
	});

	// touchstart
	$cover[0].addEventListener('touchstart', function(event) {
		var finger = event.touches[0];	//获得手指
		console.log('touchstart',finger.pageX,event);
		event.preventDefault();
		starX = finger.pageX;
		starXtrue = finger.pageX;
		starTime = event.timeStamp;
	});


	// touchmove
	$cover[0].addEventListener('touchmove', function(event) {
		var finger = event.touches[0];	//获得手指
		console.log('touchmove',finger.pageX);
		event.preventDefault();
		if(myulIsNotAnimate()){
			if(dX < 0 && dX > ($mylis.eq(0).width() - $myul.width())){
	    		dX = dX + (finger.pageX - starX) * 1;
	    	}else{
	    		dX = dX + (finger.pageX - starX) / 2;
	    	}
		}
		starX = finger.pageX;
		console.log("dX=",dX);
		$myul.css({"-webkit-transform":"translateX("+dX+"px)","transform":"translateX("+dX+"px)"});
	});


	// touchend
	$cover[0].addEventListener('touchend', function(event) {
		var finger = event.touches[0];	//获得手指
		endTime = event.timeStamp;
		console.log('touchend',event);
		event.preventDefault();
		delta = starXtrue - starX ;
		console.log("delta=",delta,"starXtrue=",starXtrue,"starX=",starX,"dX=",dX);
		if(myulIsNotAnimate()){
			if(dX > 0){
	    		$myul.animate({"transform":"translateX(0px)","-webkit-transform":"translateX(0px)"},animateTimeEdge,"ease");
	    		dX = 0;
	    	}else if(dX <= -$myul.width() + $mylis.eq(0).width() ){
	    		console.log("move",$mylis.eq(0).width() - $myul.width());
	    		$myul.animate({"transform":"translateX(" + ($mylis.eq(0).width() - $myul.width()) + "px)","-webkit-transform":"translateX(" + ($mylis.eq(0).width() - $myul.width()) + "px)"},animateTimeEdge,"ease");
	    		dX = -$myul.width() + $mylis.eq(0).width();
	    	}else if(delta > 0){
	    		page = Math.abs(Math.ceil(dX / $mylis.eq(0).width())) + 1;
	    		$page.html(page+1);
	    		$myul.animate({"transform":"translateX(" + ( - $mylis.eq(0).width()) * page + "px)","-webkit-transform":"translateX(" + ( - $mylis.eq(0).width()) * page + "px)"},animateTime,"ease");
	    		dX = - $mylis.eq(0).width() * page ;
	    		console.log("dX=",dX,"page=",page);
	    	}else if(delta < 0){
	    		page = Math.abs(Math.ceil(dX / $mylis.eq(0).width()));
	    		$page.html(page+1);
	    		$myul.animate({"transform":"translateX(" + ( - $mylis.eq(0).width()) * page + "px)","-webkit-transform":"translateX(" + ( - $mylis.eq(0).width()) * page + "px)"},animateTime,"ease");
	    		dX = - $mylis.eq(0).width() * page ;
	    		console.log("dX=",dX,"page=",page);
	    	}
	    	if(delta == 0 && endTime - starTime > 0){
	    		
	    		$cover.css("display","none");
	    	}
		}
	});

	function myulIsNotAnimate (){
		if($myul.attr("style").indexOf("transition") == -1){
			return true;
		}else{return false}
	}	
})()
