"use strict";

window.onload = (function () {
    var loadInterval = setInterval(function () {
        if ($(".loading").attr("data-lock") == 1) {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    $("#court-sengMsg").click(function () {
        $(".nm-cover").removeClass('hide');
    });

    $(".nm-cover .cancel").click(function () {
        $(".nm-cover").addClass('hide');
    });

    function remToPx(rem) {
        var win = $('body').width();
        return 100 / 375 * win * rem;
    }

    var oList = $(".court-list");
    var aJoinCount = $("li", oList).size();

    if (aJoinCount == 0) {
        oList.addClass('hide');
    } else if (aJoinCount <= 4) {
        $(".court-arrow-l,.court-arrow-r").addClass('hide');
    }

    var currentIndex = 0;
    $("ul", oList).css('width', aJoinCount * remToPx(0.87));

    $(".court-arrow-l").click(function () {
        if (currentIndex > 0) {
            currentIndex--;
            $("ul", oList).animate({ marginLeft: -currentIndex * remToPx(0.87) + 'px' }, 300);
        }
    });

    $(".court-arrow-r").click(function () {
        if (aJoinCount - currentIndex > 4) {
            currentIndex++;
            $(".court-arrow-l").removeClass('hide');
            $("ul", oList).animate({ marginLeft: -currentIndex * remToPx(0.87) + 'px' }, 300);
        }
    });

    $(".court-join").click(function () {
        $.ajax({
            type: "GET",
            url: "",
            dataType: 'JSON',
            cache: false,
            success: function success(res) {
                if (res && res.status == '0000') {}
            },
            error: function error(res) {}
        });
    });
}

/*
  requestAnimationFrame 兼容性代码
 */

)((function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
        window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
})());

$(document).ready(function () {
    setTimeout(function () {
        // window.requestAnimationFrame(checkBottom)
        var page = 1;
        moreList(page);
    }, 500);
    // console.log(data.count);
});

var main = document.getElementById('main');
var srList = document.getElementById('srList');
var alMore = document.getElementById('alMore');
function checkBottom(page) {
    if (main.clientHeight - window.scrollY < document.body.clientHeight + 50) {
        moreList(page);
    } else {
        window.requestAnimationFrame(function () {
            checkBottom(page);
        });
    }
}

function moreList(page) {
    // console.log(page);
    // console.log('快到底了')
    var callback = function callback(res) {
        if (res.code == '0000') {
            if (res.data.length > 0) {
                var data;
                var lis;

                (function () {
                    var func = function func(str) {
                        return "<div class=\"court-comment-answer-msg\">" + str + "</div>";
                    };

                    data = res.data;
                    lis = [];

                    data.map(function (item, index, array) {
                        var li = document.createElement('li');
                        li.innerHTML = "<div class=\"court-comment-user\">\n                <div style=\"background-image:url(" + (item.avatar ? item.avatar : '/static/appwebview/courtjoin/images/avator.jpg') + ");\" class=\"court-comment-user-avatar\"> </div>\n                <div class=\"court-comment-user-info\">\n                  <div class=\"court-comment-user-name\">" + item.nick_name + "<b>" + (item.user_id == launch_user_id ? '（发起者）' : '') + "</b></div>\n                  <div class=\"court-comment-user-time\">" + item.time + "</div>\n                </div>\n                <div class=\"court-comment-user-talk\"><img src=\"/static/appwebview/courtjoin/images/icon-comment.png\"></div>\n              </div>\n              <div class=\"court-comment-msg\"> \n                <div class=\"court-comment-user-msg\">" + item.content + "</div>\n                " + (item.parent_msg && item.parent_msg.content ? func(item.parent_msg.nick_name + ':' + item.parent_msg.content) : '') + "\n              </div>";
                        lis.push(li);
                    });
                    lis.forEach(function (item) {
                        srList.insertBefore(item, alMore);
                    });
                    window.requestAnimationFrame(function () {
                        checkBottom(++page);
                    });
                })();
            } else {

                if (page == "1") {
                    var html = "<p>你可以在这里发表或解答任何对该球局的疑问</p>\n              <p>例如：球局现在已经有多少人了？</p>";
                    $("#alMore").html(html);
                } else {
                    $("#alMore").html("暂时木有更多评论辣~").addClass('hide');
                }
            }
        } else {
            if (res.code == '3036' && page == 1) {
                var html = "<p>你可以在这里发表或解答任何对该球局的疑问</p>\n              <p>例如：球局现在已经有多少人了？</p>";
                $("#alMore").html(html);
                
            } else if(res.code == '3036'){
                $("#alMore").html("暂时木有更多评论辣~").addClass('hide');
            }
            // showToast(data.msg);
        }
    };
    var errorCallback;
    ajaxLoadmore(callback, errorCallback, page);
}

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
function ajaxLoadmore(callback, errorCallback, page) {
    var url = '/Courtjoin/getCjms'
        url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: url,
        cache: false,
        data: {
            id: getURLInformation().id,
            page: page
        },
        success: function success(data) {
            // try {
            var res = data;
            callback(res);
            // } catch (e) {
            //     console.log(e);
            //     // var res = JSON.parse(data);
            //     if(typeof callback == 'function'){
            //       callback(res);
            //     }
        },
        error: function error(xhr, type) {
            if (typeof errorCallback == 'function') {
                errorCallback(type);
            }
            alert('网络错误');
        }
    });
}
