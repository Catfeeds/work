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

	var _dprImagesFixed = __webpack_require__(2);

	var _time = __webpack_require__(3);

	window.onload = function () {
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
	    var $windowWidth = $(window).width();
	    if ($windowWidth > $designWidth) {
	      $windowWidth = $designWidth;
	    }
	    $("html").css("font-size", 100 / ($designWidth / $designdpr) * $windowWidth + "px");
	  });
	  var loadInterval = setInterval(function () {
	    if ($(".loading").attr("data-lock") == "1") {
	      $(".loading").addClass("hide");
	      $(".main").removeClass("hide");
	      clearInterval(loadInterval);
	      setTimeout(function () {
	        var $windowWidth = $(window).width();
	        if ($windowWidth > $designWidth) {
	          $windowWidth = $designWidth;
	        }
	        $("html").css("font-size", 100 / ($designWidth / $designdpr) * $windowWidth + "px");
	      }, 100);
	    }
	  }, 500);
	};

	$(document).ready(function () {

	  (0, _dprImagesFixed.dprImagesFixed)();
	  $(".timeout").each(function () {
	    var callback = function callback() {
	      // console.log("finish");
	      window.location.reload();
	    };
	    new _time.TimestampToMinutesComponent(this, callback);
	  });
	});

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	"use strict";


	function TimestampToMinutesComponent(dom, callback) {
	  this.dom = dom;
	  this.time = dom.dataset.time * 1 || 0;
	  this.setInterval = null;
	  this.init();
	  this.go(callback);
	}

	TimestampToMinutesComponent.prototype.init = function () {
	  var minutes = parseInt(this.time / 60);
	  var seconds = parseInt(this.time % 60);
	  for (var i = 0; i < this.dom.childNodes.length; i++) {
	    if (this.dom.childNodes[i].className === "minutes") {
	      this.dom.childNodes[i].innerHTML = minutes + "分" + seconds + "秒";
	    }
	  }
	};

	TimestampToMinutesComponent.prototype.go = function (callback) {
	  clearInterval(this.setInterval);
	  var that = this;
	  this.setInterval = setInterval(function () {
	    if (that.time == 0) {
	      callback();
	      clearInterval(that.setInterval);
	      return false;
	    }
	    that.time--;
	    that.init();
	  }, 1000);
	};

	exports.TimestampToMinutesComponent = TimestampToMinutesComponent;

/***/ }
/******/ ]);