import { NMDataToPhotoAlbum } from './includes/NMDataToPhotoAlbum';
import { NMDetailPhotoAlbum } from './includes/NMDetailPhotoAlbum';

var ajaxCommentPage = 1,
    business_id = "",
    myScroll;
// 下拉加载更多元素
function loadMoreElement() {
    var callback = function callback(res) {
        console.log(res);
        if (res.data.length > 0) {
            var str = "",
                imgStr = "",
                star_str = "";
            for (var i = 0; i < res.data.length; i++) {
                star_str = "";
                // console.log(res.data[i].comment_rank);
                for (var j = 0; j < res.data[i].comment_rank; j++) {
                    star_str += '<i><img data-src="/themes/qu201/images/qu_detail/fullstar.png" src="/themes/qu201/images/qu_detail/fullstar.png"></i>';
                }
                for (var w = res.data[i].comment_rank; w < 5; w++) {
                    star_str += '<i><img data-src="/themes/qu201/images/qu_detail/fullstar.png" src="/themes/qu201/images/qu_detail/emptystar.png"></i>';
                }

                var newDate = new Date(),
                    imgStr = "";
                newDate.setTime(res.data[i].create_time * 1000);
                if (res.data[i].image_list.length > 0) {
                    imgStr = "";
                    for (var k = 0; k < res.data[i].image_list.length; k++) {
                        // console.log(res.data[i].image_list[k].thumb_url );
                        imgStr += '<li class="photo-li"><img data-src="' + res.data[i].image_list[k].thumb_url + '" data-big-src="' + res.data[i].image_list[k].image_url + '" src="' + res.data[i].image_list[k].thumb_url + '"></li>';
                    }
                    imgStr = '<div data-title="评论图片" class="photo"><ul class="photo-ul">' + imgStr + '</ul></div>';
                }
                str += "<li class='user-comment-li borderBottom1px'><div class='avatar'><i style='background-image:url(" + res.data[i].avatar + ")'></i></div><div class='msg'>" + res.data[i].content + "<div data-point='4.3' data-showpoint='false' data-full-src='/themes/qu201/images/qu_detail/fullstar.png' data-empty-src='/themes/qu201/images/qu_detail/emptystar.png' class='detail-stars'>" + star_str + "</div><div class='date'>" + newDate.format('yyyy年MM月dd日 h:m') + "</div></div>" + imgStr + "</li>";
            };
            $(".user-comment-ul").append(str);
            $(".user-comment-ul .photo").each(function () {
                new NMDataToPhotoAlbum(this, $(".nm-photo-album")[0]);
            });
            ajaxCommentPage++;
            var prevTop = $(".touchscrollelement").position().top;        
            myScroll.resize();
            $(".touchscrollelement").css("top",prevTop);
        } else {
            if (ajaxCommentPage == 1 && !res.data.length) {
                $("#wrapper").addClass("hide");
                $(".sr-noItem").removeClass("hide");
            }
            // else if (ajaxCommentPage != 1 && !res.data.length) {
            //     $("#pullUp span").addClass("hide");
            //     $("#pullUp div").removeClass("hide");
            // }
        }
    };
    var errorBack = errCallback;
    ajaxComment(callback, errorBack);
}

$(document).ready(function () {
    var url = getURLInformation();
    business_id = url.business_id;
    var photoAlbum = new NMDetailPhotoAlbum($(".nm-photo-album")[0]);
    myScroll = new TouchScroll({
        id: 'wrapper',
        'opacity': 0,
        ondrag: function ondrag(e, t) {
            if (isBottom()) {
                setTimeout(loadMoreElement, 1000);
            }
        }
    });
    loadMoreElement();
});

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

function ajaxComment(callback, errorCallback) {
    var url = '/court/getCommentApi/?business_id=' + business_id + "&page=" + ajaxCommentPage + "&client_time=" + newDate()
        url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
    $.ajax({
        type: 'get',
        url: url,
        success: function(data) {
            var res = JSON.parse(data);
                        callback(res);
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

Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

function isBottom() {
    var delta = $(".touchscrollelement").height() - $("#wrapper").height() <= Math.abs($(".touchscrollelement").position().top);
    if (delta) return true;else return false;
}

// export { loadMoreElement };
