var scroll,lock=false,page = 1,nomore=false;
window.onload = function() {
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);
 
    document.ontouchmove = function(e){
        e.preventDefault();
    }

    scroll = new TouchScroll({
        id: 'wrapper',
        ondrag: function(){
            
            if (isBottom()) {
                
                setTimeout(function(){
                    loadMoreElement()
                }, 1000);
            }
        }
    })

    selectScroll = new TouchScroll({
        id: 'list-selection',
    })
    
    var tempTimer = setInterval(function(){
        var touchH = $("#list-selection .touchscrollwrapper").height();
        if(touchH == 0){
            selectScroll.resize();
        }
        else{
            selectScroll.resize();
            clearInterval(tempTimer);
        }
    },100);

    loadMoreElement();

    $(".header .center").on("click",function(){
        var _this = $(this);
        _this.toggleClass("expend");
        if(!_this.hasClass("expend")){
            $(".list-sprite").addClass("hide");
        }else{
            $(".list-sprite").removeClass("hide");
            selectScroll.resize();
        }
    })

    $("#list-rule").on("mousedown touchstart","li",function(){
        $(this).addClass("selected").siblings("li").removeClass("selected");
        var className = $(this).attr("id");
        $("."+className).removeClass("hide").siblings("ul").addClass("hide");
        selectScroll.resize();
    })

    $("#list-selection").on("click","li",function(){
        var _this = $(this);
        var dataType = _this.parent("ul").attr("data-type");
        var value = _this.attr(dataType);
        var oldValue = $("#"+dataType).val();
        $("#"+dataType).val(value);
        if(oldValue != value){
            //筛选条件改变
            page = 1;
            $(".list-info").html("");
            $(".touchscrollelement").css("top",0);
            lock = false;
            nomore = false;
            $(".list-noItem").addClass("hide");
            loadMoreElement();
        }
        $(".center").find("."+dataType).text(_this.text());
        hideSelection();
    })

    $(".list-sprite").click(function(e){
        if(e.target == this){
            hideSelection();
        }
    })
    function hideSelection(){
        $(".list-sprite").addClass('hide');
        $(".center").removeClass("expend");
        $("#list-rule li").eq(0).addClass("selected").siblings("li").removeClass("selected");
        $("#list-selection ul").eq(0).removeClass("hide").siblings("ul").addClass("hide");
    }

    $('.list-info').on("click","li",function(){
        var url = '/court/detail?id=' + $(this).attr('bid') + '&cid='+ $(this).attr('cid');
        // window.location.href = '/court/detail?id=' + $(this).attr('bid') + '&cid='+ $(this).attr('cid');
        window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
    });
}
function noMoreAll(){
    lock = true
    $('#isButtom').removeClass('hide').text('暂无更多场馆')
}
function loadMoreElement(){
    $(".list-info p").remove();
    if(lock){ 
        if(nomore){
        //     $('#isButtom').remove()
        //     $(".list-info").append("<p style='color:#222;'>暂无更多场馆</p>")
        return noMoreAll();
        }
    }
    lock = true;
    $(".list-info p").remove();
    $('#isButtom').remove()
    $(".list-info").append("<p><img style='width:0.2rem;color:#222;' src='/static/images/loading.gif'> 正在加载更多场馆</p>");
    scroll.resize();
    var callback = function(res){
        if(res.data.businesses.length < 20){
            nomore = true;
            lock = true;
            if(res.data.businesses.length == 0 && res.data.page_data.current_page == 1){
                $(".list-noItem").removeClass("hide");
                $('#isButtom').addClass('hide')
            }
        }else{
            lock = false;
        }
        if(res.code && res.code == 1){
            var str = "";
            for(var i = 0;i<res.data.businesses.length;i++){
                var srcStr='',addr,promote_price,price,promote_list,cid,bid;
                cid = res.data.businesses[i].category_id;
                bid = res.data.businesses[i].business_id;
                if(res.data.businesses[i].is_card_user && res.data.businesses[i].is_card_user == "1"){
                    srcStr += "<img src='/themes/qu204/court/list/images/v.png'/>";
                }else if(res.data.businesses[i].is_often && res.data.businesses[i].is_often == "1"){
                    srcStr += "<img src='/themes/qu204/court/list/images/chang.png'/>";
                }else{
                    srcStr = "";
                }
                if(res.data.businesses[i].sub_region){
                    addr = "["+res.data.businesses[i].sub_region+"]";
                }else{
                    addr = "";
                }
                if(res.data.businesses[i].promote_price){
                        promote_price = "￥"+res.data.businesses[i].promote_price;
                    price = "<span>￥"+res.data.businesses[i].price+"</span>";
                }else{
                    promote_price = "";
                    price = "<span style='text-decoration: none;margin-left:0;'>￥"+res.data.businesses[i].price+"</span>";
                }

                if(res.data.businesses[i].promote_list && res.data.businesses[i].promote_list.length>1){
                    var act = "";
                    for(var j=0;j<res.data.businesses[i].promote_list.length;j++){
                        act += "<span>"+res.data.businesses[i].promote_list[j]+"</span>";
                    }
                    promote_list = "<div>"+act+"</div>";
                }else{
                    promote_list = "";
                }
                str += "<li bid="+bid+" cid="+cid+"><div>"+srcStr+"<span>"+res.data.businesses[i].name+"</span></div><div>"+addr+"</div><div><span>"+promote_price+"</span>"+price+"</div>"+promote_list+"</li>";
            }
            page++;
            $(".list-info").append(str);
            $(".list-info p").remove();
            var prevTop = $("#wrapper .touchscrollelement").position().top;        
            var scrollInterval = setInterval(function(){
                var touchH = $("#wrapper .touchscrollwrapper").height();
                if(touchH == 0){
                    scroll.resize();
                }
                else{
                    if($('#wrapper li').length >= 20){
                        if(!nomore){
                            $('#scroller').append('<p id="isButtom" style="color:#222;padding:0.2rem 0;" onclick="loadMoreElement()">上拉加载更多</p>')
                        }else{
                            $('#scroller').append('<p id="isButtom" style="color:#222;padding:0.2rem 0;" onclick="loadMoreElement()">暂无更多场馆</p>')
                        }
                        
                    }
                    scroll.resize();

                    clearInterval(scrollInterval);
                    $("#wrapper .touchscrollelement").css("top",prevTop);
                }
            },100);
        }
    }
    ajaxloadMoreElement(callback);
}

function ajaxloadMoreElement(callback){
    var category_id = $("#category_id").val();
    var region_id = $("#region_id").val();
    var sort = $("#sort").val();
    var url = "/court/getnext?category_id=" + category_id + "&region_id=" + region_id + "&sort=" + sort + "&page=" + page
            url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
    $.ajax({
        type: 'get',
        url: url,
        success: function(data) {
            var res = JSON.parse(data);;
            callback(res);
        },
        error: function(xhr, type) {
            lock = false;
            alert("网络错误");
        }
    })
}


function isBottom() {
    // return false
    var delta = $(".touchscrollelement").height() - $("#wrapper").height() <= Math.abs($(".touchscrollelement").position().top);
    if (delta)
        return true;
    else
        return false;
}