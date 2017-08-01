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

	var _slideBar = __webpack_require__(2);

	var _slideBar2 = _interopRequireDefault(_slideBar);

	var _mobileResponsive = __webpack_require__(3);

	var _mobileResponsive2 = _interopRequireDefault(_mobileResponsive);

	var _showToast = __webpack_require__(4);

	var _showToast2 = _interopRequireDefault(_showToast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.showToast = _showToast2.default;

	$(document).ready(function () {
	  (0, _mobileResponsive2.default)(cb);
	});

	var cb = function cb() {
	  $(document).ready(function () {
	    var loadInterval = setInterval(function () {
	      if ($(".loading").attr("data-lock") == 1) {
	        $(".loading").addClass("hide");
	        $(".main").removeClass("hide");
	        clearInterval(loadInterval);
	        callback();
	      }
	    }, 500);
	  });
	};

	var callback = function callback() {
	  $(document).ready(function () {

	    $('.act-address').click(function () {
	    	var url = this.dataset['url'];
	      // window.location.href = this.dataset['url'];
	      window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
	    });

	    var slideBarDom = $('.slide-bar')[0];
	    var leftBtn = $('.l-btn')[0];
	    var rightBtn = $('.r-btn')[0];
	    if (slideBarDom) {
	      var actGroupSlidebar = new _slideBar2.default(slideBarDom, leftBtn, rightBtn);
	    }

	    var $actButton = $('#actButton');
	    var $actAlertMsg = $('#actAlertMsg');
	    var $actAlert = $('#actAlert');
	    var $actFooter = $('.act-footer');
	    var actid = document.body.dataset['act_id'];

	    var callback = function callback(data) {
	      var res = JSON.parse(data);
	      if (res.code == '0000') {
	        if(res.data.comment==1) {
				$actButton.html('我要评论');
			}else{
				$actButton.html('我要参与');
			}
	      } else {
			$actButton.html(res.msg);
  	        $actButton.attr('disabled', '');
	      }
	      if (res.code != '0514') {
	        $actFooter.removeClass('hide');
	      }
	    };
	    ajaxCheckActivityState(actid, callback);

	    $actButton.click(function () {
	      var _this = this;

	      if (this.hasAttribute('disabled')) return false;
	      this.setAttribute('disabled', '');
	      var that = this
	      var cb = function cb(data) {
	        var res = JSON.parse(data);
	        if (res.code == '0000') {
				if(res.data.comment==1) {
    				$actButton.html('我要评论');
    			}else{
    				$actButton.html('我要参与');
    			}	
    				if(res.data.comment && res.data.comment == 1 && getCookie('app_flag') == '1'){
    					that.removeAttribute('disabled', '');
							window.location.href = 'gosport://h5_comment?actid=' + actid      
    				}else{
    					window.location.href = res.data.redirect_url;
    				}
	        }else{
	          $actButton.html(res.msg);
	          $actButton.attr('disabled', '');
	          showActAlert($actAlert, $actAlertMsg, res.msg );
	        }
	      };

	      ajaxCheckActivityState(actid, cb);
	    });

	    function getCookie(name) {
    		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    			if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    			else
        return null;
			}
	    /**
	     * [showActAlert description]
	     * @param  {jquery element} dom    [description]
	     * @param  {jquery element} msgDom [description]
	     * @param  {String} msg    [description]
	     * @param  {Number} time   [description]
	     * @return {[type]}        [description]
	     */
	    function showActAlert($dom, $msgDom, msg) {
	      var time = arguments.length <= 3 || arguments[3] === undefined ? 1000 : arguments[3];

	      console.log($dom);
	      $dom.removeClass('hide');
	      $msgDom.html(msg);
	      var timer = setTimeout(function () {
	        $dom.addClass('hide');
	      }, time);
	    }

	    /**
	     * [ajaxCheckActivityState description]
	     * depend $.ajax
	     * @param  {[function]} callback [description]
	     * @return {[type]}          [description]
	     */
	    function ajaxCheckActivityState(actid, callback) {
	      // checkStatus
	      var url = '/activitycommon/checkstatus?client_time=' + Date.now() + '&id=' + actid
	      		url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
	      $.ajax({
	        type: 'get',
	        url: url,
	        success: function success(data) {
	          if (typeof callback === 'function') {
	            callback(data);
	          }
	        },
	        error: function error(xhr, type) {
	         // (0, _showToast2.default)(type);
	        }
	      });
	    }
	  });
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * [slideBar description]
	 * `.slide-bar
	 *   .slide-bar-item cur
	 *   .slide-bar-item
	 *   .slide-bar-item`
	 * @param  {element} slideBarDom [description]
	 * @param  {element} leftBtn     [description]
	 * @param  {element} rightBtn    [description]
	 * @param  {String} index    [description]
	 * @return {[type]}             [description]
	 */

	var SlideBar = function () {
	  function SlideBar(slideBarDom, leftBtn, rightBtn) {
	    var index = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

	    _classCallCheck(this, SlideBar);

	    this.dom = slideBarDom;
	    this.leftBtn = leftBtn;
	    this.rightBtn = rightBtn;
	    this.index = index;
	    this.slideBarItem = Array.prototype.slice.call(this.dom.childNodes).filter(function (item) {
	      return item.nodeType == 1;
	    });
	    this.move = 0;
	    this.findCur();
	    this.init();
	  }

	  _createClass(SlideBar, [{
	    key: 'init',
	    value: function init() {

	      this.widthInit();

	      this.moveInit();

	      this.btnInit();

	      this.btnBind();
	    }
	  }, {
	    key: 'widthInit',
	    value: function widthInit() {
	      var itemWidth = this.slideBarItem.reduce(function (prev, curr) {
	        return prev + curr.clientWidth;
	      }, 0);
	      var width = itemWidth + 10;
	      this.dom.style.width = width + 'px';
	    }
	  }, {
	    key: 'moveInit',
	    value: function moveInit() {
	      var index = this.cur || this.index;

	      this.moveDom(index);
	    }
	  }, {
	    key: 'moveDom',
	    value: function moveDom(index) {
	      var step = index;
	      this.move = -1 * this.slideBarItem.filter(function (item, index) {
	        return index < step;
	      }).reduce(function (prev, curr) {
	        return prev + curr.clientWidth;
	      }, 0);
	      if (this.move >= 0) {
	        this.move = 0;
	        if (!this.leftBtn.hasAttribute('disabled')) {
	          this.leftBtn.setAttribute('disabled', '');
	        }
	      }
	      this.dom.style.webkitTransform = 'translateX(' + this.move + 'px)';

	      this.dom.style.transform = 'translateX(' + this.move + 'px)';

	      this.btnDisable(this.index);
	    }
	  }, {
	    key: 'btnInit',
	    value: function btnInit() {
	      var index = this.cur || this.index;

	      this.btnDisable(index);
	    }
	  }, {
	    key: 'btnDisable',
	    value: function btnDisable(index) {
	      if (index <= 0) {
	        if (!this.leftBtn.hasAttribute('disabled')) {
	          this.leftBtn.setAttribute('disabled', '');
	        }
	      } else {
	        if (this.leftBtn.hasAttribute('disabled')) {
	          this.leftBtn.removeAttribute('disabled');
	        }
	      }

	      if (index >= this.slideBarItem.length - 1) {
	        if (!this.rightBtn.hasAttribute('disabled')) {
	          this.rightBtn.setAttribute('disabled', '');
	        }
	      } else {
	        if (this.rightBtn.hasAttribute('disabled')) {
	          this.rightBtn.removeAttribute('disabled');
	        }
	      }
	    }
	  }, {
	    key: 'btnBind',
	    value: function btnBind() {
	      var _this = this;

	      this.leftBtn.addEventListener('click', function () {
	        _this.btnClickEvent('left');
	      });
	      this.rightBtn.addEventListener('click', function () {
	        _this.btnClickEvent('right');
	      });
	    }
	  }, {
	    key: 'btnClickEvent',
	    value: function btnClickEvent(type) {
	      this.widthInit();
	      // type = 'left' or 'right'
	      if (type === 'left') {
	        var btn = this.leftBtn;
	      } else if (type === 'right') {
	        var btn = this.rightBtn;
	      }

	      var index = this.index;

	      this.btnDisable(index);
	      if (btn.hasAttribute('disabled')) return false;
	      if (type === 'left') {
	        this.index--;
	      } else if (type === 'right') {
	        this.index++;
	      }

	      this.moveDom(this.index);
	    }
	  }, {
	    key: 'findCur',
	    value: function findCur() {
	      var _this2 = this;

	      this.slideBarItem.forEach(function (item, index, array) {
	        if (item.className.indexOf('cur') != -1) {
	          var ind = index - 1 < 0 ? 0 : index - 1;
	          return _this2.cur = ind, _this2.index = ind;
	        }
	      });
	    }
	  }]);

	  return SlideBar;
	}();

	exports.default = SlideBar;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function mbr(cb) {
	  $(document).ready(function () {

	    var $designWidth = $("body").attr("data-design-width") || 640;
	    var $designdpr = $("body").attr("data-design-dpr") || 2;
	    $("html").attr("data-dpr", window.devicePixelRatio);

	    // console.log($windowWidth,$designWidth,$designdpr);
	    setTimeout(function () {
	      setRem();
	    }, 100);

	    $(window).resize(function () {
	      setRem();
	    });

	    $(window).on('load', function () {

	      setTimeout(function () {
	        setRem();
	      }, 500);
	    });

	    function setRem() {
	      var $windowWidth = $(window).width();
	      if ($windowWidth > $designWidth) {
	        $windowWidth = $designWidth;
	      }
	      $("html").css("font-size", 100 / ($designWidth / $designdpr) * $windowWidth + "px");
	    }

	    if (typeof cb === 'function') {
	      cb();
	    }
	  });
	}

	exports.default = mbr;
	exports.mbr = mbr;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = showToast;
	/**
	 * [showToast description]
	 * [depend JQuery or Zepto]
	 * @param  {String} msg [description]
	 * @return {[type]}     [description]
	 */
	function showToast(errMsg) {
	    $(".toast .toast-msg").text(errMsg);
	    $(".toast").removeClass('hide');
	    setTimeout(function () {
	        $(".toast").animate({ "opacity": 0 }, 300, function () {
	            $(this).css("opacity", 1).addClass("hide");
	        });
	    }, 1000);
	}

/***/ }
/******/ ]);
