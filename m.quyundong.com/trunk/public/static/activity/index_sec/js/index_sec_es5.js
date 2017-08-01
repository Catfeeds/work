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

	var _NMDataToPhotoAlbum = __webpack_require__(2);

	var _NMDetailPhotoAlbum = __webpack_require__(5);

	/*
	  requestAnimationFrame 兼容性代码
	 */

	(function () {
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
	})();

	$(document).ready(function (data) {
	  var photoAlbum = new _NMDetailPhotoAlbum.NMDetailPhotoAlbum($(".nm-photo-album")[0]);
	  setTimeout(function () {
	    // window.requestAnimationFrame(checkBottom);
	     moreList();
	  }, 1000);
	  // console.log(data.count);
	});

	var main = document.getElementById('main');
	var srList = document.getElementById('srList');
	var alMore = document.getElementById('alMore');

	var NMDataToPhotoAlbumFn;
	function checkBottom() {
	  if (main.clientHeight - window.scrollY < document.body.clientHeight + 50) {
	    moreList();
	  } else {
	    window.requestAnimationFrame(checkBottom);
	  }
	}

	function moreList() {
	  // console.log('快到底了')
	  var callback = function callback(data) {
	    $("span#count").html(data.count);
	    // console.log(data);
	    if (data.count == " ") {
	      $("#lcount").addClass("hide");
	    }
	    if (data.code == '0000') {
	      if (data.data.length > 0) {
	        for (var k = 0; k < data.data.length; k++) {
	          var li = document.createElement('li');
	          var imgList = "";
	          for (var j = 0; j < data.data[k].images.length; j++) {
	            imgList += '\n            <li>\n              <img data-big-src="' + data.data[k].images[j].url + '" src="' + data.data[k].images[j].thumb_url + '">\n            </li>';
	          }
	          var avatar = data.data[k].avatar;
	          li.className = 'allcomment';
	          li.innerHTML = '\n        <div class="allcomment-box">\n          <div class="allcomment-fl"> \n            <div class="allcomment-tx">\n              <img src=' + (avatar != "" ? avatar : "/static/activity/index/images/tx.png") + '>\n             </div>\n          </div>\n          <div class="allcomment-fr">\n            <h2>' + (data.data[k].nick_name || data.data[k].username) + '</h2>\n            <h3>' + data.data[k].add_time + '</h3>\n            <p>' + data.data[k].content + '</p>\n            <div class="photo">\n            <ul class="photo-ul">\n              ' + imgList + '   \n            </ul>\n            </div>\n          </div>\n        </div>';
	          srList.insertBefore(li, alMore);
	        }

	        page = Number(data.current_page) + 1;

	        $(li).find(" .photo").each(function () {
	          NMDataToPhotoAlbumFn = new _NMDataToPhotoAlbum.NMDataToPhotoAlbum(this, $(".nm-photo-album")[0]);
	        });
	        window.requestAnimationFrame(checkBottom);
	      } else {
	        $("#alMore").html("暂时木有更多评论辣~~");
	        if (data.count == "0") {
	          $(".act-comment").addClass("hide");
	          $("#alMore").addClass("hide");
	        }
	      }
	    } else {
	      showToast(data.msg);
	    }
	  };
	  var errorCallback;
	  ajaxLoadmore(callback, errorCallback);
	}

	// 接口请求
	function ajaxLoadmore(callback, errorCallback) {
		var url = '/Commoncomment/getCommentList'
				url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
	  $.ajax({
	    type: 'get',
	    dataType: 'json',
	    url: url,
	    cache: false,
	    data: {
	      relation_id: relation_id,
	      page: page,
	      page_size: page_size,
	      comment_type: comment_type
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
	    }
	  });
	}

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

	  for (var _i = 0; _i < this.domList.length; _i++) {
	    // console.log(that.domList[i]);
	    $(this.albumDom).find("ul")[0].appendChild(that.domList[_i]);
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