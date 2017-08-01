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
	        var filesArr = [];
	        var imgContainerList = [];
	        var selectImg = 0;

	        /*
	          每个选择好的图片的载体构造器
	         */
	        function CreateImgContainer(index) {
	            var _this = this;

	            // 状态参数
	            this.isUpload = false;
	            this.index = index;
	            this.errorTimes = 0;
	            this.file;
	            this.data = {};
	            this.uploadError = false;

	            // 创建dom结构
	            this.li = document.createElement('li');
	            this.li.className = 'hide';
	            this.errorDom = document.createElement('div');
	            this.errorDom.className = 'error hide';

	            this.deleteDom = this.createDeleteDom();

	            this.img = document.createElement('img');
	            this.img.style.display = 'block';
	            this.img.setAttribute('height', '100%');
	            this.li.appendChild(this.errorDom);
	            this.li.appendChild(this.img);

	            this.li.addEventListener('click', function () {

	                _this.deleteDom.className = 'delete';
	            });

	            document.body.appendChild(this.deleteDom);
	        }

	        // 创建删除框的dom结构，及绑定事件
	        //
	        CreateImgContainer.prototype.createDeleteDom = function () {
	            var _this2 = this;

	            var deleteDom = document.createElement('div');
	            deleteDom.className = 'delete hide';
	            deleteDom.style.top = '0';
	            deleteDom.style.left = '0';
	            deleteDom.style.right = '0';
	            deleteDom.style.bottom = '0';
	            var deleteTc = document.createElement('div');
	            deleteTc.className = 'delete-tc';
	            var p = document.createElement('p');
	            p.innerHTML = '确定要删除吗？';
	            var ul = document.createElement('ul');
	            var ok = document.createElement('li');
	            ok.innerHTML = '确认';
	            var cancel = document.createElement('li');
	            cancel.innerHTML = '取消';
	            ul.appendChild(ok);
	            ul.appendChild(cancel);
	            deleteTc.appendChild(p);
	            deleteTc.appendChild(ul);
	            deleteDom.appendChild(deleteTc);

	            ok.addEventListener('click', function () {
	                deleteImg(_this2.index);
	                _this2.deleteDom.className = 'delete hide';
	            });

	            cancel.addEventListener('click', function () {
	                _this2.deleteDom.className = 'delete hide';
	            });

	            return deleteDom;
	        };

	        CreateImgContainer.prototype.changeIndex = function (index) {
	            this.index = index;
	        };

	        // 删除选定图片
	        function deleteImg(index) {
	            // 移除相关dom
	            $(imgContainerList[index].li).remove();
	            $(imgContainerList[index].deleteDom).remove();

	            // 在相关数组中移除载体实例及文件
	            imgContainerList.splice(index, 1);
	            filesArr.splice(index, 1);

	            // 重新赋值已经选择的图片数量
	            selectImg = filesArr.length;

	            if (selectImg < 9) {
	                $(".addbtn").removeClass('hide');
	            }

	            // 剩下的实例索引重写
	            imgContainerList.forEach(function (item, index) {
	                item.changeIndex(index);
	            });
	        }

	        function F_Open_dialog() {
	            document.getElementById("imgOne").click();
	        }

	        $(".addbtn").click(function () {
	            F_Open_dialog();
	        });
	        $("#imgOne").bind("change", function () {
	            if (selectImg + this.files.length <= 9) {

	                selectImg += this.files.length;

	                if (selectImg >= 9) {
	                    $(".addbtn").addClass('hide');
	                }
	                // 选了多少个图就 new 多少个 CreateImgContainer 并push到imgContainerList
	                // imgContainerList.length为索引

	                for (var i = 0; i < this.files.length; i++) {
	                    imgContainerList.push(new CreateImgContainer(imgContainerList.length));
	                }

	                // 并将li插入页面中
	                imgContainerList.forEach(function (item, index, array) {
	                    $('.addpic-box')[0].appendChild(item.li);
	                });

	                // 将文件的file相关属性赋值到 CreateImgContainer实例的相关地方
	                filesArr = filesArr.concat(Array.prototype.slice.call(document.getElementById('imgOne').files));
	                filesArr.forEach(function (item, index, array) {
	                    imgContainerList[index].file = item;
	                    imgContainerList[index].img.src = window.URL.createObjectURL(item);
	                    imgContainerList[index].li.className = '';
	                });
	            } else {
	                (0, _showToast2.default)("上传图片最多9张！");
	            }
	        });

	        $("#publish").click(function () {
	            if (status == "0519") {
	                (0, _showToast2.default)(msg);
	                return false;
	            }
	            if (this.hasAttribute('publishing')) return false;

	            if ($('.conmenttxt').val().trim() == '') {
	                (0, _showToast2.default)("发布内容不能为空");
	                return false;
	            }
	            $("#waitting").removeClass("hide");

	            this.setAttribute('publishing', '');

	            // $('.addbtn').addClass('hide');

	            /*
	              从0开始
	             */
	            var index = 0;

	            // console.log(filesArr)

	            pushData();

	            /*图片压缩处理*/
	            function ysfn(list) {
	                // console.log(index)
	                if (list[index].isUpload) {
	                    // console.log('next')
	                    index++;
	                    if (index < list.length) {
	                        ysfn(list);
	                    } else {
	                        pushData();
	                    }

	                    return false;
	                }
	                // console.log('up')
	                lrz(list[index].file).then(function (rst) {
	                    // 处理成功会执行
	                    var xhr = new XMLHttpRequest();
	                    xhr.open('POST', '/Commonupload/commonUploadImage');
	                    xhr.onload = function () {
	                        if (xhr.status === 200) {
	                            // console.log(xhr.response)
	                            var res = JSON.parse(xhr.response);
	                            if (res.status == '0000') {
	                                // console.log('success')
	                                imgContainerList[index].isUpload = true;
	                                imgContainerList[index].errorDom.className = 'error hide';
	                                imgContainerList[index].data["thumb_url"] = res.data["thumb_url"];
	                                imgContainerList[index].data["image_url"] = res.data["image_url"];
	                                imgContainerList[index].data["attach_id"] = res.data["attach_id"];
	                            } else {
	                                // console.log('error:', index)
	                                imgContainerList[index].errorDom.className = 'error';
	                                imgContainerList[index].errorTimes += 1;
	                                imgContainerList[index].uploadError = true;
	                            }
	                            index++;
	                            setTimeout(function () {
	                                if (index < list.length) {
	                                    ysfn(list);
	                                } else {
	                                    pushData();
	                                }
	                            }, 0);
	                        }
	                    };

	                    xhr.onerror = function () {

	                        alert('网络错误');
	                        // 处理错误
	                    };

	                    xhr.upload.onprogress = function (e) {
	                        // 上传进度
	                        // console.log(e)
	                        var percentComplete = (e.loaded / e.total || 0) * 100;
	                        // console.log(percentComplete)
	                    };

	                    // 添加参数
	                    rst.formData.append('fileLen', rst.fileLen);

	                    // 触发上传
	                    xhr.send(rst.formData);
	                    /* ==================================================== */

	                    return rst;
	                }).catch(function (err) {
	                    // console.log(err)
	                    // 处理失败会执行
	                }).always(function () {
	                    // 不管是成功失败，都会执行
	                });
	            }

	            /*
	              判断是否所有的选择的图片都上传成功
	             */
	            function isAllPhotoUpload() {

	                var errorTimesList = imgContainerList.filter(function (item, index) {
	                    return index < filesArr.length;
	                }).filter(function (item, index) {
	                    return item.errorTimes > 2;
	                });

	                if (errorTimesList.length > 0) {
	                    return true;
	                }

	                var checkList = imgContainerList.filter(function (item, index) {
	                    return index < filesArr.length;
	                }).filter(function (item, index) {
	                    return item.isUpload == false;
	                });

	                if (checkList.length == 0) {
	                    return true;
	                } else {
	                    return false;
	                }
	            }

	            /*发布评论接口*/
	            function pushData() {
	                // console.log('push')
	                if (!isAllPhotoUpload()) {
	                    index = 0;
	                    ysfn(imgContainerList.filter(function (item, index) {
	                        return index < filesArr.length;
	                    }));
	                    return false;
	                }

	                var $conmenttxt = $(".conmenttxt");
	                var $addpicbox = $(".addpic-box");
	                var imgList = [];
	                imgContainerList.forEach(function (item, index) {
	                    if (item.isUpload) {
	                        imgList.push(item.data);
	                    }
	                });
	                var postData = {
	                        'id': cat_id,
	                        'comment': $conmenttxt.val(),
	                        'images': imgList,
	                        'type': cat_type
	                    }
	                    postData = typeof objMerge == 'function' ? objMerge(postData) : postData
	                $.ajax({
	                    url: "/commoncomment/addComment",
	                    type: 'post',
	                    dataType: 'JSON',
	                    cache: false,
	                    data: postData,
	                    success: function success(res) {
	                        // var data = JSON.parse(res);
	                        var data = res;
	                        $("#publish").removeAttr('publishing');
	                        if (data.code == "0000") {
	                            $("#waitting").addClass("hide");

	                            (0, _showToast2.default)("发布成功");
	                            if (data.data.redirect_url) {
	                                window.location.href = data.data.redirect_url;
	                            }
	                        } else {
	                            $("#waitting").addClass("hide");
	                            (0, _showToast2.default)(data.msg);
	                        }
	                    },
	                    error: function error(res) {
	                        $("#publish").removeAttr('publishing');
	                    }
	                });
	            }
	        });

	        /*倒计字数*/
	        $(".conmenttxt").on("input",function () {
	            checkLength(this);
	        });

	        function checkLength(gm) {
	            var maxChars = 140;
	            if (gm.value.length > maxChars) {
	                gm.value = gm.value.substring(0, maxChars);
	            }
	            var curr = maxChars - gm.value.length;
	            document.getElementById("ct-wordsNum").innerHTML = "还可输入" + curr.toString() + "字";
	        }
	    });
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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