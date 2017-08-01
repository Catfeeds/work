/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      exports: {},
/******/      id: moduleId,
/******/      loaded: false
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.loaded = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }


/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "./js/";

/******/  // Load entry module and return exports
/******/  return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var _NMDataToPhotoAlbum = __webpack_require__(2);

  var _NMDetailPhotoAlbum = __webpack_require__(5);

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
                  new _NMDataToPhotoAlbum.NMDataToPhotoAlbum(this, $(".nm-photo-album")[0]);
              });
              ajaxCommentPage++;
              var prevTop = $(".touchscrollelement").position().top;
              myScroll.resize();
              $(".touchscrollelement").css("top", prevTop);
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
      var photoAlbum = new _NMDetailPhotoAlbum.NMDetailPhotoAlbum($(".nm-photo-album")[0]);
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
          success: function success(data) {
              var res = JSON.parse(data);
              callback(res);
          },
          error: function error(xhr, type) {
              errorCallback(type);
              alert('网络错误');
          }
      });
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NMDataToPhotoAlbum = undefined;

  var _NMPhotoSlider = __webpack_require__(3);

  function NMDataToPhotoAlbum(targetDom, albumDom) {
    this.targetDom = targetDom;
    this.albumDom = albumDom;
    this.$images = $(this.targetDom).find("img");
    this.title = this.targetDom.dataset.title;
    // this.insert();
    // this.render
    this.bindEvent();
  }

  NMDataToPhotoAlbum.prototype.insert = function () {
    var _this = this;

    $(this.albumDom).find("ul").remove();
    this.ul = document.createElement("ul");
    this.albumDom.appendChild(this.ul);
    $(this.albumDom).find("ul").html("");
    this.domList = [];
    $(this.albumDom).find("ul").css("width", 100 * this.$images.length + "%");
    var that = this;

    var _loop = function _loop(i) {
      // console.log(i);
      var li = document.createElement("li");
      var div = document.createElement("div");
      var img = document.createElement("img");
      li.style.width = 100 / _this.$images.length + "%";
      // console.log(that.$images[i]);
      img.onload = function () {
        // 宽高比
        var imgScale = img.width / img.height;
        var windowScale = $(window).width() / $(window).height();

        if (imgScale >= windowScale) {
          div.style.width = "100%";
        } else {
          div.style.width = img.width * $(window).height() / img.height + "px";
          div.style.height = "100%";
        }
      };
      img.src = that.$images[i].dataset.bigSrc;
      li.appendChild(div);
      div.appendChild(img);
      that.domList.push(li);
    };

    for (var i = 0; i < this.$images.length; i++) {
      _loop(i);
    }

    // console.log(that.domList);

    for (var i = 0; i < this.domList.length; i++) {
      // console.log(that.domList[i]);
      $(this.albumDom).find("ul")[0].appendChild(that.domList[i]);
    }
    // console.log($(this.albumDom).find("ul")[0]);
  };

  NMDataToPhotoAlbum.prototype.render = function (index) {
    var index = index || 0;
    $(this.albumDom).removeClass("hide");
    $("body").css("overflow", "hidden");
    $(this.albumDom).find(".index").html(index * 1 + 1);
    $(this.albumDom).find(".totle").html(this.$images.length);
    $(this.albumDom).find(".title").html(this.title);
    this.insert();
  };

  NMDataToPhotoAlbum.prototype.bindEvent = function () {
    var that = this;
    this.$images.each(function (index) {
      this.addEventListener("click", function () {
        // console.log(index);
        that.render(index);
        new _NMPhotoSlider.NMPhotoSlider(that.ul, index, $(that.albumDom).find(".index")[0]);
      }, false);
    });
  };

  NMDataToPhotoAlbum.prototype.bindThis = function (index) {
    var index = index || 0;
    this.render();
    new _NMPhotoSlider.NMPhotoSlider(this.ul, index, $(this.albumDom).find(".index")[0]);
  };

  exports.NMDataToPhotoAlbum = NMDataToPhotoAlbum;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NMPhotoSlider = undefined;

  var _isAnimation = __webpack_require__(4);

  function NMPhotoSlider(dom, index, indexLocation) {
    this.dom = dom;
    this.indexLocation = indexLocation;
    this.index = index || 0;
    this.init();
    this.bindEvent();
  }

  NMPhotoSlider.prototype.init = function () {
    // console.log("init",this.index);
    this.indexLocation.innerHTML = this.index * 1 + 1;
    this.width = this.dom.clientWidth * 1;
    this.liWidth = this.dom.childNodes[0].clientWidth;
    this.totle = this.dom.childNodes.length;
    // console.log(this.liWidth);
    this.dom.style.width = this.width + "px";
    this.windowWidth = $(window).width();
    this.lastOffset = this.index * -1 * (this.width / this.dom.childNodes.length);;
    this.changeX = 0;
    this.end = false;
    this.isMove = false;
    // console.log(this.starOffset);
    this.dom.style.webkitTransform = 'translate3d(' + this.lastOffset + 'px, 0, 0)';
    this.dom.style.transform = 'translate3d(' + this.lastOffset + 'px, 0, 0)';
    // console.log(this);
  };

  NMPhotoSlider.prototype.bindEvent = function () {
    var startEvent = function startEvent(event) {
      event.preventDefault();
      // event.target.addEventListener("touchmove",moveEvent,false);
      // event.target.addEventListener("touchend",endEvent,false);
      // console.log("startEvent",event);
      //记录刚刚开始按下的时间
      this.startTime = new Date() * 1;
      this.end = false;
      //记录手指按下的坐标
      if (event.touches) {
        this.startX = event.touches[0].pageX;
      } else {
        this.startX = event.pageX;
      }

      // console.log(this.startX);
    }.bind(this);

    var moveEvent = function moveEvent(event) {
      event.preventDefault();
      // console.log("moveEvent",event);
      //计算手指的偏移量
      this.isMove = true;
      if (!!this.end) return false;
      if (event.touches) {
        this.offsetX = event.targetTouches[0].pageX - this.startX;
      } else {
        this.offsetX = event.pageX - this.startX;
      }

      this.changeX = this.offsetX + this.lastOffset;

      if (this.changeX >= 0) {
        this.changeX = 0;
      } else if (this.changeX <= -(this.width - this.windowWidth)) {
        this.changeX = -(this.width - this.windowWidth);
      }

      this.dom.style.webkitTransform = 'translate3d(' + this.changeX + 'px, 0, 0)';
      this.dom.style.transform = 'translate3d(' + this.changeX + 'px, 0, 0)';

      // console.log("offsetX:",this.offsetX);
    }.bind(this);

    var endEvent = function endEvent(event) {
      event.preventDefault();
      // console.log("endEvent",event);
      var endTime = new Date() * 1;

      this.end = true;

      if (endTime - this.startTime < 200 && !this.isMove) {
        var that = this;
        setTimeout(function () {
          that.dom.parentNode.className += " hide";
          $("body").css("overflow", "scroll");
        }, 0);
      }
      // console.log(this);
      // console.log(this.index);
      // console.log(!isAnimation(this.dom));
      if (!(0, _isAnimation.isAnimation)(this.dom) && this.changeX - this.lastOffset != 0) {
        if (endTime - this.startTime <= 300 && this.offsetX > 0 || Math.abs(this.offsetX) >= this.liWidth / 6 && this.offsetX > 0) {
          this.index = this.index - 1;
          if (this.index < 0) this.index = 0;
        } else if (endTime - this.startTime <= 300 && this.offsetX < 0 || Math.abs(this.offsetX) >= this.liWidth / 6 && this.offsetX < 0) {
          this.index = this.index * 1 + 1;
          // console.log(this.index,this.totle);
          if (this.index > this.totle - 1) this.index = this.totle - 1;
        }

        // console.log(this.index);
        // if( endTime - this.startTime <= 300 && this.offsetX > this.liWidth/6){
        //   this.changeX = 0;
        // }else if(endTime - this.startTime <= 300 && this.offsetX < 0){
        //   this.changeX = -this.width+this.windowWidth;
        // }
        this.changeX = this.index * -this.liWidth;
        this.indexLocation.innerHTML = this.index * 1 + 1;
        $(this.dom).animate({ "transform": "translate3d(" + this.changeX + "px,0,0)", "-webkit-transform": "translate3d(" + this.changeX + "px,0,0)" }, 300, "linear", 0);
      }

      this.lastOffset = this.changeX;
      this.isMove = false;
    }.bind(this);

    this.dom.addEventListener("touchstart", startEvent, false);
    // this.dom.addEventListener("mousedown",startEvent,false);
    this.dom.addEventListener("touchmove", moveEvent, false);
    // this.dom.addEventListener("mousemove",moveEvent,false);
    this.dom.addEventListener("touchend", endEvent, false);
    // this.dom.addEventListener("mouseup",endEvent,false);
  };

  exports.NMPhotoSlider = NMPhotoSlider;

/***/ },
/* 4 */
/***/ function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function isAnimation(dom) {
    return !!($(dom).attr("style").indexOf("transition") != -1 || $(dom).attr("style").indexOf("webkitTransition") != -1);
  }

  exports.isAnimation = isAnimation;

/***/ },
/* 5 */
/***/ function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function NMDetailPhotoAlbum(dom) {
    this.dom = dom;
    this.init();
  }

  NMDetailPhotoAlbum.prototype.init = function () {
    var that = this;
    $(this.dom).find(".close").click(function () {
      $(that.dom).find("ul").remove();
      $(that.dom).addClass("hide");
      $("body").css("overflow", "scroll");
    });
  };

  exports.NMDetailPhotoAlbum = NMDetailPhotoAlbum;

/***/ }
/******/ ]);