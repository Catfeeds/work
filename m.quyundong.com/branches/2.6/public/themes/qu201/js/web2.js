var web2 = {};
var ajaxPage = 1,
    myScroll,
    lock = false;
window.onload = function() {
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
            web2.navSlide = web2.initSlider({
                id: 'web2-navSlider',
                auto: false
            }, $(".web2-nav"))
        }
    }, 500);

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
    setTimeout(function() {
        $windowWidth = $(window).width();
        if ($windowWidth > $designWidth) {
            $windowWidth = $designWidth;
        }
        $("html").css("font-size", (100 / ($designWidth / $designdpr)) * $windowWidth + "px");
    }, 100);


    $(window).resize(function() {
        $windowWidth = $(window).width();
        if ($windowWidth > $designWidth) {
            $windowWidth = $designWidth;
        }
        $("html").css("font-size", (100 / ($designWidth / $designdpr)) * $windowWidth + "px");
    });

    // 判断是否为搜索结果显示页
    web2.isSearchResultPage = false;
    if ($(".web2-header").hasClass("sr-head")) {
        web2.isSearchResultPage = true;
        var urlmsg = getURLInformation();
        searchTxt = unescape(urlmsg.search_text);
        $(".web2-searchInput").val(searchTxt);
        myScroll = new TouchScroll({
            id: 'wrapper',
            'opacity': 0,
            ondrag: function(e, t) {
                if (isBottom()) {
                    setTimeout(loadMoreElement, 1000);
                }
            }
        });
        loadMoreElement();
    }

    $(".web2-searchInput").on("focus", function() {
        $(".web2-coverSprite").removeClass("hide");
        $("body").css("overflow-y", "hidden");
        $(".web2-center").animate({ "width": 0, "opacity": 0 }, 100, function() {
            $(".web2-center").addClass("hide").css({ "width": "0.35rem", "opacity": 1 });
        });
        $(".web2-headSearch-r").removeClass("hide");
    });

    $(".web2-searchInput").on("propertychange input", function() {
        if ($(this).val() != "") {
            $(".web2-headSearch-r").css("color", "#fff");
        } else {
            $(".web2-headSearch-r").css("color", "rgba(255,255,255,.5)");
        }
    })

    $(".web2-searchInput").on("change", function() {
        var that = $(this);
        lock = false;
        
    });
    $(".web2-headSearch-r").on("click", function() {
        if($(".web2-searchInput").val() == $(".web2-searchInput").attr('data-passed-value')) return false
        if ($(".web2-searchInput").val() != "") {
            
            web2.toSearch();
        }
        // $(this).off("click");
    })

    $(".web2-form").on("submit", function(e) {
        e.preventDefault();
        if ($(".web2-searchInput").val() != "") {
            web2.toSearch();
        }
    })

    $(".web2-coverSprite").click(function() {
        $(this).addClass('hide');
        $("body").css("overflow-y","auto");
        $(window).resize();
        $(".web2-center").removeClass("hide");
        $(".web2-headSearch-r").addClass("hide");
    });

    $(".sr-head").on("click", ".web2-headCity", function() {
        var url = "/index";
        // location.href = "/index";
        location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
    })

    $(".web2-list").on("click", "li", function(e) {
        if (e.target.tagName == "I") {
            var url = e.target.getAttribute("data-href");
            // location.href = e.target.getAttribute("data-href");
            location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
        } else {
            var url = $(this).attr("data-href");
            // location.href = $(this).attr("data-href");
            location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
        }
    })
}

web2.initSlider = function(options, parent) {
    options.before = function(onAdSu) {
        $('.web2-pagenav li', parent).removeClass('show');
        $('.web2-pagenav li', parent).eq(onAdSu * 1).addClass('show');
    }
    var slide = new TouchSlider(options);
    var pageNum = $("#" + options.id).find("li").size();
    if (pageNum > 1) {
        var str = "";
        for (var i = 0; i < pageNum; i++) {
            i == 0 ? str += "<li class='show'></li>" : str += "<li></li>";
        }
        parent.append("<ul class='web2-pagenav'>" + str + "</ul>");
    }
    $(".web2-pagenav").on("click", "li", function() {
        var oIndex = $(this).index();
        web2.navSlide.slide(oIndex);
    })

    return slide;
}

web2.toSearch = function() {
    if (web2.isSearchResultPage) {
        $(".sr-list").html("");
        $("#wrapper").removeClass("hide");
        $(".sr-noItem").addClass("hide");
        ajaxPage = 1;
        searchTxt = $(".web2-searchInput").val();
        loadMoreElement();
    } else {
        var url = location.href = "/index/search?search_text=" + escape($(".web2-searchInput").val()) + "&page=" + 1
        // location.href = "/index/search?search_text=" + escape($(".web2-searchInput").val()) + "&page=" + 1
        location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
    }
}

// 下拉加载更多元素
function loadMoreElement() {
    $(".web2-searchInput").attr('data-passed-value',$(".web2-searchInput").val())
    if(!lock){
        var callback = function(res) {
            if(res.data.length<20){
                lock = true;
            }
            var str = "";
            for (var i = 0; i < res.data.length; i++) {
                var iStr = "";
                if (res.data[i].is_support_club == 1) {
                    iStr = "<i>club</i>";
                }
                var sub_region = res.data[i].sub_region ? "[" + res.data[i].sub_region + "]" : "";
                str += "<a href='" + res.data[i].url + "' business_id='" + res.data[i].business_id + "' cid='" + res.data[i].cid + "'><li><div><span>" + res.data[i].name + "</span>" + iStr + "</div><div>" + sub_region + "</div><div>地址：" + res.data[i].address + "</div></li></a>";
            };
            $(".sr-list").append(str);
            if (ajaxPage == 1 && !res.data.length) {
                $("#wrapper").addClass("hide");
                $(".sr-noItem").removeClass("hide");
            }
            ajaxPage++;

            var prevTop = $(".touchscrollelement").position().top;        
            myScroll.resize();
            $(".touchscrollelement").css("top",prevTop);
        };
        var errorBack = errCallback;
        ajaxSearchApi(callback, errorBack);
    }
}

// 链接转码
function getURLInformation() {
    var urlMsg = {};
    if (window.location.href.split('#')[0].split('?')[1]) {
        var urlSearch = window.location.href.split('#')[0].split('?')[1].split('&');
    }

    if (urlSearch) {
        for (var i = 0; i < urlSearch.length; i++) {
            urlMsg[urlSearch[i].split('=')[0]] = urlSearch[i].split('=')[1] || "";
        }
    }
    return urlMsg;
}

// 接口请求
function ajaxSearchApi(callback, errorCallback) {
    var search_text = searchTxt;
    var url = '/index/searchApi/?search_text=' + search_text + "&page=" + ajaxPage + "&client_time=" + newDate()
        url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
    $.ajax({
        type: 'get',
        url: url,
        success: function(data) {
            try {
                var res = data;
                callback(res);
            } catch (e) {
                console.log(e);
                var res = JSON.parse(data);;
                callback(res);
            }
        },
        error: function(xhr, type) {
            errorCallback(type);
            alert('网络错误');
        }
    })
}

function errCallback(res) {
    myScroll.resize();
}

function newDate() {
    return parseInt(new Date().getTime() / 1000);
}

function isBottom() {
    var delta = $(".touchscrollelement").height() - $("#wrapper").height() <= Math.abs($(".touchscrollelement").position().top);
    if (delta)
        return true;
    else
        return false;
}