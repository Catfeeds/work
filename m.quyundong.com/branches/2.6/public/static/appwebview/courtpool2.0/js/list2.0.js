import { NMSlider } from '../../../../themes/qu201/js/includes/NMSlider';
import { dprImagesFixed } from '../../../../themes/qu201/js/includes/dprImagesFixed';
import { ShowErrorMsg } from '../../../../js-lib/showErrorMsg';
// import { testData2 } from '../../../../js-lib/testData';

window.onload = function() {
    document.addEventListener("touchmove", function(e) {
        e.preventDefault();
    });



    var $windowWidth = $(window).width();
    var $designWidth = $("body").attr("data-design-width");
    var $designdpr = $("body").attr("data-design-dpr");
    $("html").attr("data-dpr", window.devicePixelRatio);
    if (!$designWidth) {
        $designWidth = 640;
    }
    if (!$designdpr) {
        $designdpr = 2;
    }
    // console.log($windowWidth,$designWidth,$designdpr);
    $(window).resize(function() {
        $windowWidth = $(window).width();
        if ($windowWidth > $designWidth) {
            $windowWidth = $designWidth;
        }
        $("html").css("font-size", (100 / ($designWidth / $designdpr)) * $windowWidth + "px");
    });


    var nmToast = new ShowErrorMsg($(".nm-toast")[0]);

    var ajaxCallback = function(res) {
        $(".main").attr("data-ajax-lock", "false");
        if (res.status == "0000") {
            window.page_current++;
            // if(window.page_current*1 >= window.page_total*1){
            //   $(".players-list-tips").addClass("hide");
            // }
            var lists = [];
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
                var listVenues = document.createElement("div");
                listVenues.className = "list-venues";
                var div = document.createElement("div");
                div.className = "list-venues-name borderBottom1px";
                div.innerHTML = `
              ${res.data[i].venues_name} <span>${res.data[i].region_name}</span>
            `;
                listVenues.appendChild(div);
                var ul = document.createElement("ul");
                for (let j = 0; j < res.data[i].court_pools.length; j++) {
                    ul.innerHTML += `
                <li><a>
                    <div data-src="url('/static/appwebview/courtpool2.0/images/list2.0/${res.data[i].court_pools[j].day_icon}')" class="list-venues-left use-background"><span>${res.data[i].court_pools[j].start_hour}<i>点</i></span></div>
                    <div class="list-venues-right">
                      <p class="top"><i style="color:#009ff0;">${res.data[i].court_pools[j].price}</i><i style="font-size:0.12rem;">元/人</i>&nbsp;${res.data[i].court_pools[j].time_str}</p>
                      <p class="bottom">${res.data[i].court_pools[j].tips}</p>
                    </div>
                    <div class="icon-right"><img data-src="/themes/qu201/images/qu_detail/icon-right.png"></div></a></li>
              `;
                }
                listVenues.appendChild(ul);
                lists.push(listVenues);
            }
            for (let i = 0; i < lists.length; i++) {
                $("#scroller")[0].appendChild(lists[i]);
            }
            dprImagesFixed();
            var prevTop = $(".touchscrollelement").position().top;
            myScroll.resize();
            $(".touchscrollelement").css("top", prevTop);
        } else {
            nmToast.show(res.msg);
        }
    };



    function ajaxTranslist(callback, errorCallback) {
        // setTimeout(function() {
        //     var data = testData2;
        //     callback(data);
        // }, 2000);
        var page = window.page_current * 1 + 1;
        $.ajax({
            type: 'get',
            url: page_url + "&page=" + page,
            success: function(data) {
                console.log(data);
                try {
                    var res = JSON.parse(data);
                    callback(res);
                } catch (e) {
                    console.log(e);
                }
            },
            error: function(xhr, type) {
                errorCallback(xhr.status);
                // alert('网络错误');
            }
        })
    }

    function loadMoreElement() {
        // console.log("more")
        // console.log("window.page_current*1===",window.page_current*1)
        // console.log("window.page_total*1=====",window.page_total*1)
        // console.log("data-ajax-lock=====",$(".main").attr("data-ajax-lock"))
        if (window.page_current * 1 < window.page_total * 1 && $(".main").attr("data-ajax-lock") == "false") {
            $(".main").attr("data-ajax-lock", "true");
            ajaxTranslist(ajaxCallback, errCallback);
        }
    }

    function errCallback(res) {
        $(".main").attr("data-ajax-lock", "false");
        nmToast.show(res);
    }

    if (!![].forEach) {
        window.myScroll = new TouchScroll({
            id: 'wrapper',
            'opacity': 0,
            ondrag: function(e, t) {
                // console.log(t);
                if (isBottom()) {
                    setTimeout(loadMoreElement, 100);
                }
            }
        });
    } else {
        window.myScroll = {};
        window.myScroll.resize = function() {};
    }

    function isBottom() {
        var delta = $(".touchscrollelement").height() - $("#wrapper").height() <= Math.abs($(".touchscrollelement").position().top);
        if (delta)
            return true;
        else
            return false;
    }

    // ;(function(){
    //   if(window.page_current*1 >= window.page_total*1){
    //     $(".players-list-tips").addClass("hide");
    //   }
    // })();

    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == 1) {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
            
            setTimeout(function() {
                var $windowWidth = $(window).width();
                if ($windowWidth > $designWidth) {
                    $windowWidth = $designWidth;
                }
                $("html").css("font-size", (100 / ($designWidth / $designdpr)) * $windowWidth + "px");

                myScroll.resize();
                
                var $listDayUl = $(".list-day ul");
                var $listDayLis = $(".list-day li");

                var $windowWidth = $(window).width();
                var lisWidth = null;

                for (var i = 0; i < $listDayLis.length; i++) {
                    // console.log($(".list-day li").eq(i)[0].clientWidth);
                    $(".list-day li").each(function() {
                        $(this).css("width", this.clientWidth);
                    });
                    lisWidth += $(".list-day li").eq(i)[0].clientWidth;
                }

                lisWidth += i * 1;
                // console.log(lisWidth);
                $listDayUl.width(lisWidth);

                if (lisWidth >= $windowWidth) {
                    // var eventBar = new NMSlider($(".event-bar")[0]);
                    $(".list-day").addClass("NMSlider");
                }

                $(".NMSlider").each(function() {
                    var w = new NMSlider(this);
                    window.li = $(this).find("li");
                    li.each(function(i) {
                        if ($(this).find("a").hasClass("cur")) {
                            // console.log(i);
                            w.set(i * -this.clientWidth);
                        }
                    });
                    // w.set(width);
                });
            }, 100);
        }
    }, 500);

}

$(document).ready(function() {

    dprImagesFixed();

});
