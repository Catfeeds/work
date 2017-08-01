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

	var _star = __webpack_require__(4);

	var _dprImagesFixed = __webpack_require__(5);

	var _NMDataToPhotoAlbum = __webpack_require__(6);

	var _NMDetailPhotoAlbum = __webpack_require__(8);

	"use strict";
	window.onload = function () {
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
	  setTimeout(function () {
	    $windowWidth = $(window).width();
	    if ($windowWidth > $designWidth) {
	      $windowWidth = $designWidth;
	    }
	    $("html").css("font-size", 100 / ($designWidth / $designdpr) * $windowWidth + "px");

	    var $eventBarUl = $(".event-bar ul");
	    var $eventBarLis = $(".event-bar li");
	    var $bookUl = $(".book ul");
	    var $bookLis = $(".book li");
	    var $windowWidth = $(window).width();
	    var lisWidth = null;

	    for (var i = 0; i < $eventBarLis.length; i++) {
	      // console.log($(".event-bar li").eq(i)[0].clientWidth);
	      lisWidth += $(".event-bar li").eq(i)[0].clientWidth;
	    }

	    // $bookUl.css("width",191*$bookLis.length*0.005+"rem;");

	    // if($bookUl.width() >= $windowWidth){
	    //   $(".book").addClass("NMSlider");
	    // }
	    $bookLis.each(function () {
	      if ($(this).index() > 2 && $(this).index() < $bookLis.length - 1) {
	        $(this).addClass("hide");
	      }
	    });

	    $(".more-date").click(function () {
	      $bookLis.removeClass("hide");
	      $(this).addClass("hide");
	    });

	    $(".location").click(function () {
	      window.location.href = this.dataset.href;
	    });

	    $(".map-stop").click(function () {
	      window.location.href = this.dataset.href;
	    });

	    lisWidth += i;
	    // console.log(lisWidth);
	    $eventBarUl.width(lisWidth);

	    if (lisWidth >= $windowWidth) {
	      // var eventBar = new NMSlider($(".event-bar")[0]);
	      $(".event-bar").addClass("NMSlider");
	    }

	    // var bookBar = new NMSlider($(".book")[0]);

	    $(".header .left").click(function () {
	      window.history.back();
	    });

	    var photoAlbum = new _NMDetailPhotoAlbum.NMDetailPhotoAlbum($(".nm-photo-album")[0]);
	    var $userCommentListAlbums = $(".user-comment-li .photo");

	    $userCommentListAlbums.each(function () {
	      new _NMDataToPhotoAlbum.NMDataToPhotoAlbum(this, $(".nm-photo-album")[0]);
	    });

	    var facePhoto = new _NMDataToPhotoAlbum.NMDataToPhotoAlbum($(".face-photo")[0], $(".nm-photo-album")[0]);
	    $(".face-photo").click(function () {
	      facePhoto.bindThis();
	    });

	    // var sportFacilitiesAlbum = new NMDataToPhotoAlbum($(".sport-facilities .album")[0],$(".nm-photo-album")[0]);
	    $(".sport-facilities .album").click(function () {
	      // sportFacilitiesAlbum.bindThis();
	      facePhoto.bindThis($(this).attr("data-index"));
	    });

	    // var serveFacilitiesAlbum = new NMDataToPhotoAlbum($(".serve-facilities .album")[0],$(".nm-photo-album")[0]);
	    $(".serve-facilities .album").click(function () {
	      // serveFacilitiesAlbum.bindThis();
	      facePhoto.bindThis($(this).attr("data-index"));
	    });

	    // $(".normassage .phone").click(function(){
	    //   $(".nm-cover").removeClass("hide");
	    //   $(".nm-alert").addClass("hide");
	    //   $(".nm-cover .phone").removeClass("hide");
	    // });

	    $(".qu-zone").click(function () {
	      $(".nm-cover").removeClass("hide");
	      $(".nm-alert").addClass("hide");
	      $(".nm-cover .download").removeClass("hide");
	    });

	    // $(".phone .telephone").click(function(){
	    //   window.location.href = "tel:" + this.dataset.phone;
	    //   $(".nm-cover").addClass("hide");
	    // });

	    $(".downloadapp").click(function () {
	      window.location.href = "http://www.quyundong.com/d";
	      $(".nm-cover").addClass("hide");
	    });

	    $(".nm-cover .cancel").click(function () {
	      $(".nm-cover").addClass("hide");
	    });

	    $(".more-info").click(function () {
	      $(this).addClass("hide");
	      $(".info-serve").removeClass("hide");
	    });

	    // $(".nm-alert.phone .msg").html("是否拨打电话<br />"+$(".normassage .phone span").html());

	    $(".NMSlider").each(function () {
	      var w = new _NMSlider.NMSlider(this);
	      var li = $(this).find("li");
	      li.each(function (i) {
	        if ($(this).find("a").hasClass("cur")) {
	          // console.log(i);
	          w.set(i * -this.clientWidth);
	        }
	      });
	    });
	  }, 100);

	  $(window).resize(function () {
	    $windowWidth = $(window).width();
	    if ($windowWidth > $designWidth) {
	      $windowWidth = $designWidth;
	    }
	    $("html").css("font-size", 100 / ($designWidth / $designdpr) * $windowWidth + "px");
	  });

	  var loadInterval = setInterval(function () {
	    if ($(".loading").attr("data-lock") == 1) {
	      $(".loading").addClass("hide");
	      $(".detail-main").removeClass("hide");
	      clearInterval(loadInterval);
	    }
	  }, 500);
	};

	$(document).ready(function () {

	  var detailStarsList = $(".detail-stars");
	  $(".detail-stars").each(function () {
	    new _star.NMStars(this);
	  });

	  (0, _dprImagesFixed.dprImagesFixed)();

	  $(".person-card").click(function (e) {
	    if (!$(e.target).hasClass("buy")) {
	      if (this.dataset.href) {
	        window.location.href = this.dataset.href;
	      }
	    } else {
	      if (e.target.dataset.href) {
	        window.location.href = e.target.dataset.href;
	      }
	    }
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	        $(this.ul).animate({ "transform": "translate3d(" + this.changeX + "px,0,0)", "webkit-transform": "translate3d(" + this.changeX + "px,0,0)" }, 300, "linear", 0);
	      } else if (endTime - this.startTime <= 300 && this.offsetX < 0) {
	        this.changeX = -this.width + this.domWidth;
	        $(this.ul).animate({ "transform": "translate3d(" + this.changeX + "px,0,0)", "webkit-transform": "translate3d(" + this.changeX + "px,0,0)" }, 300, "linear", 0);
	      }
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function isAnimation(dom) {
	  return !!($(dom).attr("style").indexOf("transition") != -1 || $(dom).attr("style").indexOf("webkitTransition") != -1);
	}

	exports.isAnimation = isAnimation;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function NMStars(dom) {
	  this.dom = dom;
	  this.init();
	  this.render();
	}

	NMStars.prototype.init = function () {
	  // console.log(this.dom.dataset);
	  this.point = this.dom.dataset.point * 1;
	  this.showPoint = this.dom.dataset.showpoint;
	  this.totle = 5;
	  this.fullSrc = this.dom.dataset.fullSrc;
	  this.emptySrc = this.dom.dataset.emptySrc;
	  if (this.point >= this.totle) {
	    this.stars = this.totle;
	  } else if (this.point <= 0) {
	    this.stars = 0;
	  } else {
	    this.stars = parseInt(this.point);
	  }
	};

	NMStars.prototype.render = function () {
	  var domList = [];
	  for (var i = 0; i < this.totle; i++) {
	    domList[i] = document.createElement("i");
	    domList[i].innerHTML = "<img data-src='" + this.emptySrc + "' />";
	  }
	  // console.log(this.showPoint);
	  if (this.showPoint == "true") {
	    domList[i] = document.createElement("span");
	    domList[i].innerHTML = this.point + "分";
	  }

	  for (var j = 0; j < this.stars; j++) {
	    domList[j].innerHTML = "<img data-src='" + this.fullSrc + "' />";
	  }

	  for (var k = 0; k < domList.length; k++) {
	    this.dom.appendChild(domList[k]);
	  }
	};

	exports.NMStars = NMStars;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NMDataToPhotoAlbum = undefined;

	var _NMPhotoSlider = __webpack_require__(7);

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
	  // $("body").css("overflow", "hidden");
	  this.albumDom.scrollY = window.scrollY
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NMPhotoSlider = undefined;

	var _isAnimation = __webpack_require__(3);

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
	        that.dom.parentNode.hideCallback && that.dom.parentNode.hideCallback()
	        window.scrollTo(0,that.dom.parentNode.scrollY)
	        // $("body").css("overflow", "visible");
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
/* 8 */
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
	    that.dom.hideCallback && that.dom.hideCallback()
	    // $("body").css("overflow", "visible");
	    window.scrollTo(0,that.scrollY)
	  });
	};

	exports.NMDetailPhotoAlbum = NMDetailPhotoAlbum;

/***/ }
/******/ ]);