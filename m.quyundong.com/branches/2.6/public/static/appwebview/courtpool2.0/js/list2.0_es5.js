/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
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

	var _NMSlider = __webpack_require__(2);

	var _dprImagesFixed = __webpack_require__(4);

	var _showErrorMsg = __webpack_require__(5);

	// import { testData2 } from '../../../../js-lib/testData';

	window.onload = function () {
	    document.addEventListener("touchmove", function (e) {
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
	    $(window).resize(function () {
	        $windowWidth = $(window).width();
	        if ($windowWidth > $designWidth) {
	            $windowWidth = $designWidth;
	        }
	        $("html").css("font-size", 100 / ($designWidth / $designdpr) * $windowWidth + "px");
	    });

	    var nmToast = new _showErrorMsg.ShowErrorMsg($(".nm-toast")[0]);

	    var ajaxCallback = function ajaxCallback(res) {
	        $(".main").attr("data-ajax-lock", "false");
	        if (res.status == "0000") {
	            window.page_current++;
	            // if(window.page_current*1 >= window.page_total*1){
	            //   $(".players-list-tips").addClass("hide");
	            // }
	            var lists = [];
	            console.log(res.data);
	            for (var i = 0; i < res.data.length; i++) {
	                var listVenues = document.createElement("div");
	                listVenues.className = "list-venues";
	                var div = document.createElement("div");
	                div.className = "list-venues-name borderBottom1px";
	                div.innerHTML = '\n              ' + res.data[i].venues_name + ' <span>' + res.data[i].region_name + '</span>\n            ';
	                listVenues.appendChild(div);
	                var ul = document.createElement("ul");
	                for (var j = 0; j < res.data[i].court_pools.length; j++) {
	                    ul.innerHTML += '\n                <li><a>\n                    <div data-src="url(\'/static/appwebview/courtpool2.0/images/list2.0/' + res.data[i].court_pools[j].day_icon + '\')" class="list-venues-left use-background"><span>' + res.data[i].court_pools[j].start_hour + '<i>点</i></span></div>\n                    <div class="list-venues-right">\n                      <p class="top"><i style="color:#009ff0;">' + res.data[i].court_pools[j].price + '</i><i style="font-size:0.12rem;">元/人</i>&nbsp;' + res.data[i].court_pools[j].time_str + '</p>\n                      <p class="bottom">' + res.data[i].court_pools[j].tips + '</p>\n                    </div>\n                    <div class="icon-right"><img data-src="/themes/qu201/images/qu_detail/icon-right.png"></div></a></li>\n              ';
	                }
	                listVenues.appendChild(ul);
	                lists.push(listVenues);
	            }
	            for (var i = 0; i < lists.length; i++) {
	                $("#scroller")[0].appendChild(lists[i]);
	            }
	            (0, _dprImagesFixed.dprImagesFixed)();
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
	            success: function success(data) {
	                console.log(data);
	                try {
	                    var res = JSON.parse(data);
	                    callback(res);
	                } catch (e) {
	                    console.log(e);
	                }
	            },
	            error: function error(xhr, type) {
	                errorCallback(xhr.status);
	                // alert('网络错误');
	            }
	        });
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
	            ondrag: function ondrag(e, t) {
	                // console.log(t);
	                if (isBottom()) {
	                    setTimeout(loadMoreElement, 100);
	                }
	            }
	        });
	    } else {
	        window.myScroll = {};
	        window.myScroll.resize = function () {};
	    }

	    function isBottom() {
	        var delta = $(".touchscrollelement").height() - $("#wrapper").height() <= Math.abs($(".touchscrollelement").position().top);
	        if (delta) return true;else return false;
	    }

	    // ;(function(){
	    //   if(window.page_current*1 >= window.page_total*1){
	    //     $(".players-list-tips").addClass("hide");
	    //   }
	    // })();

	    var loadInterval = setInterval(function () {
	        if ($(".loading").attr("data-lock") == 1) {
	            $(".loading").addClass("hide");
	            $(".main").removeClass("hide");
	            clearInterval(loadInterval);

	            setTimeout(function () {
	                var $windowWidth = $(window).width();
	                if ($windowWidth > $designWidth) {
	                    $windowWidth = $designWidth;
	                }
	                $("html").css("font-size", 100 / ($designWidth / $designdpr) * $windowWidth + "px");

	                myScroll.resize();

	                var $listDayUl = $(".list-day ul");
	                var $listDayLis = $(".list-day li");

	                var $windowWidth = $(window).width();
	                var lisWidth = null;

	                for (var i = 0; i < $listDayLis.length; i++) {
	                    // console.log($(".list-day li").eq(i)[0].clientWidth);
	                    $(".list-day li").each(function () {
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

	                $(".NMSlider").each(function () {
	                    var w = new _NMSlider.NMSlider(this);
	                    window.li = $(this).find("li");
	                    li.each(function (i) {
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
	};

	$(document).ready(function () {

	    (0, _dprImagesFixed.dprImagesFixed)();
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.NMSlider = undefined;

	var _isAnimation = __webpack_require__(3);

	function NMSlider(dom) {
	  this.dom = dom;
	  this.init();
	  this.bindEvent();
	}

	NMSlider.prototype.init = function () {
	  this.ul = $(this.dom).find("ul")[0];
	  this.width = this.ul.clientWidth;
	  this.ul.style.width = this.width + "px";
	  this.domWidth = this.dom.clientWidth;
	  this.lastOffset = 0;
	  this.changeX = 0;
	  this.end = false;
	  // console.log(this);
	};

	NMSlider.prototype.bindEvent = function () {

	  var startEvent = function startEvent(event) {
	    // event.preventDefault();
	    // event.target.addEventListener('touchmove', moveEvent);
	    // event.target.addEventListener('touchend', endEvent);
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

	    this.offsetX = 0;
	  }.bind(this);

	  var moveEvent = function moveEvent(event) {
	    event.preventDefault();
	    // console.log("moveEvent",event);
	    //计算手指的偏移量
	    if (!!this.end) return false;
	    if (event.touches) {
	      this.offsetX = event.targetTouches[0].pageX - this.startX;
	    } else {
	      this.offsetX = event.pageX - this.startX;
	    }

	    if (this.offsetX + this.lastOffset <= 0 && this.offsetX + this.lastOffset >= -(this.width - this.domWidth)) {

	      this.changeX = this.offsetX + this.lastOffset;
	    }

	    this.ul.style.webkitTransform = 'translate3d(' + this.changeX + 'px, 0, 0)';
	    this.ul.style.transform = 'translate3d(' + this.changeX + 'px, 0, 0)';

	    // console.log("offsetX:",this.offsetX);
	  }.bind(this);

	  var endEvent = function endEvent(event) {
	    // console.log("endEvent",event);
	    var endTime = new Date() * 1;
	    this.end = true;
	    // console.log(this);
	    // console.log(!isAnimation(this.dom));
	    if (!(0, _isAnimation.isAnimation)(this.ul)) {
	      if (endTime - this.startTime <= 300 && this.offsetX > 0) {
	        this.changeX = 0;
	      } else if (endTime - this.startTime <= 300 && this.offsetX < 0) {
	        this.changeX = -this.width + this.domWidth;
	      }
	      $(this.ul).animate({ "transform": "translate3d(" + this.changeX + "px,0,0)", "webkit-transform": "translate3d(" + this.changeX + "px,0,0)" }, 300, "linear", 0);
	    }

	    this.lastOffset = this.changeX;
	  }.bind(this);

	  this.dom.addEventListener("touchstart", startEvent);
	  // this.dom.addEventListener("mousedown",startEvent,false);
	  this.dom.addEventListener("touchmove", moveEvent, false);
	  // this.dom.addEventListener("mousemove",moveEvent,false);
	  this.dom.addEventListener("touchend", endEvent, false);
	  // this.dom.addEventListener("mouseup",endEvent,false);
	  this.dom.addEventListener("click", function () {
	    // console.log("click");
	  }, false);
	};

	NMSlider.prototype.set = function (width) {
	  // var width = -Math.abs(width);
	  // console.log(width);
	  if (width < -(this.width - this.domWidth)) {
	    width = -(this.width - this.domWidth);
	  } else if (width > 0) {
	    width = 0;
	  }
	  this.lastOffset = width;
	  this.ul.style.webkitTransform = 'translate3d(' + width + 'px, 0, 0)';
	  this.ul.style.transform = 'translate3d(' + width + 'px, 0, 0)';
	};

	exports.NMSlider = NMSlider;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";


	function isAnimation(dom) {
	  return !!($(dom).attr("style").indexOf("transition") != -1 || $(dom).attr("style").indexOf("webkitTransition") != -1);
	}

	exports.isAnimation = isAnimation;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function dprImagesFixed() {
	  var dDpr = window.devicePixelRatio * 1;
	  $("img").each(function () {
	    var dpr;
	    if (dDpr > 2) {
	      dpr = "dpr3x";
	    } else {
	      dpr = "dpr2x";
	    }

	    if (this.getAttribute("data-src")) {
	      var src = this.getAttribute("data-src").replace(/dpr2x/, dpr);
	      this.src = src;
	    }
	  });
	  $(".use-background").each(function () {
	    var dpr;
	    if (dDpr > 2) {
	      dpr = "dpr3x";
	    } else {
	      dpr = "dpr2x";
	    }
	    if (this.getAttribute("data-src") && this.getAttribute("data-src") != "url()") {
	      var src = this.getAttribute("data-src").replace(/dpr2x/, dpr);
	      this.style.backgroundImage = src;
	    }
	  });
	}

	exports.dprImagesFixed = dprImagesFixed;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	function ShowErrorMsg(dom) {
	  this.dom = dom;
	  this.errorTimer = null;
	}

	ShowErrorMsg.prototype.show = function (str, callback) {
	  clearTimeout(this.errorTimer);
	  $(this.dom).removeClass("hide");
	  this.dom.innerHTML = str || "";
	  var that = this;
	  setTimeout(function () {
	    $(that.dom).addClass("opacity0");
	  }, 1000);
	  this.errorTimer = setTimeout(function () {
	    $(that.dom).addClass("hide");
	    $(that.dom).removeClass("opacity0");
	    if (typeof callback == "function") {
	      callback();
	    }
	  }, 4000);
	};
	exports.ShowErrorMsg = ShowErrorMsg;

/***/ }
/******/ ]);