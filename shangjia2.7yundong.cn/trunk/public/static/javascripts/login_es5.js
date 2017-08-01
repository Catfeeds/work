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
/******/ 	__webpack_require__.p = "";

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

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _awAjax = __webpack_require__(2);

	$(document).ready(function () {

	  $("#awLoginSure").click(loginClick);
	  $("#inputPassword").on('input', inputChange);
	  $("#inputUserName").on('input', inputChange);
	  $("#inputCheckCode").on('input', inputChange);
	});

	function inputChange() {
	  if ($(this).val() != "") {
	    clearMsg([$(this).parents(".form-group")]);
	  }
	}

	function loginClick() {
	  init();

	  var callback = function callback(res) {
	    if ((typeof res === "undefined" ? "undefined" : _typeof(res)) != "object") {
	      try {
	        res = JSON.parse(res);
	      } catch (e) {
	        // console.log(e);
	        showServerError("输出格式错误");
	        return false;
	      }
	    }
	    if (res.status === "0000") {
	      window.location.href = "/";
	    } else if (res.status == "0217") {
	      showInputError($(".aw-login-checkCode")[0], "验证码错误");
	    } else if (res.status == "0208") {
	      showInputError($(".aw-login-userName")[0], "用户名或者密码错误");
	      showInputError($(".aw-login-password")[0], "用户名或者密码错误");
	    } else if (res.status == "10086"){
	    	showServerError(res.msg);
	    	window.location.reload()
	    } else {

	      showServerError(res.msg);
	    }
	  };

	  var errorCallback = function errorCallback(data) {
	    // console.log(data);
	    showServerError(data.statusText + "_" + data.status);
	  };

	  var url = $("#awLoginForm").attr("data-action");

	  var formData = window.FormData ? new FormData($("#awLoginForm")[0]) : false ;
	  if (check()) {
	  	if(!formData){
	  		formData = {};
	  		var inputList = [];
	  		var inputTextList = Array.prototype.slice.call($('#awLoginForm input[type="text"]'));
	  		var inputPasswordList = Array.prototype.slice.call($('#awLoginForm input[type="password"]'));
	  		var inputTestList = Array.prototype.slice.call($('#awLoginForm input[type="test"]'));
	  		var inputHiddenList = Array.prototype.slice.call($('#awLoginForm input[type="hidden"]'));
	  		inputList = inputList.concat(inputTextList,inputPasswordList,inputTestList,inputHiddenList);

	  		$.each(inputList,function (index,item) {
	  			formData[item.name] = item.value;
	  		})

	  		$.ajax({
	  		    url: url,
	  		    type: 'POST',
	  		    data: formData,
	  		    success: function(data){
	  		      callback(data);
	  		    },
	  		    error: function(data){
	  		      errorCallback(data);
	  		    }
	  		  });

	  	}else{
	  		(0, _awAjax.postAsync)(callback, errorCallback, url, formData);
	  	}
	    
	  }

	  function init() {
	    $("#spanMessage").attr("class", "").html("");

	    var list = [$(".aw-login-password")[0], $(".aw-login-checkCode")[0], $(".aw-login-userName")[0]];

	    clearMsg(list);
	  }

	  function check() {
	    if (!userNameCheck()) {
	      showInputError($(".aw-login-userName")[0], "用户名不能为空");
	    }

	    if (!passwordCheck()) {
	      showInputError($(".aw-login-password")[0], "密码不能为空");
	    }

	    if (!codeCheck()) {
	      showInputError($(".aw-login-checkCode")[0], "验证码不能为空");
	    }

	    if (passwordCheck() && userNameCheck() && codeCheck()) return true;

	    return false;
	  }
	}

	function passwordCheck() {
	  return isEmpty($("#inputPassword").val());
	}

	function userNameCheck() {
	  return isEmpty($("#inputUserName").val());
	}

	function codeCheck() {
	  return isEmpty($("#inputCheckCode").val());
	}

	function isEmpty(val) {
	  if (val === "") return false;
	  return true;
	}

	function clearMsg(domList) {
	  $.each(domList,function (index,v) {
	    $(v).removeClass("has-error");
	    $(v).find("span").removeClass("glyphicon-remove");
	    $(v).find(".help-block").html("");
	  });
	}

	function showServerError(msg) {
	  $("#spanMessage").addClass("alert alert-warning").html(msg);
	}

	function showInputError(dom, text) {
	  $(dom).addClass("has-error");
	  $(dom).find("span").addClass("glyphicon-remove");
	  $(dom).find(".help-block").html(text);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// Object.defineProperty(exports, "__esModule", {
	//   value: true
	// });
	function postAsync(callback, errorCallback, url, formData) {
	  $.ajax({
	    url: url,
	    type: 'POST',
	    data: formData,
	    async: true,
	    cache: false,
	    contentType: false,
	    processData: false,
	    success: function success(data) {
	      callback(data);
	    },
	    error: function error(data) {
	      errorCallback(data);
	    }
	  });
	}

	function postAsyncFalse(callback, errorCallback, url, formData) {
	  $.ajax({
	    url: url,
	    type: 'POST',
	    data: formData,
	    async: false,
	    cache: false,
	    contentType: false,
	    processData: false,
	    success: function success(data) {
	      callback(data);
	    },
	    error: function error(data) {
	      errorCallback(data);
	    }
	  });
	}

	function getAsync(callback, errorCallback, url, data) {
	  $.ajax({
	    url: url,
	    type: 'GET',
	    data: data,
	    async: true,
	    cache: false,
	    contentType: false,
	    processData: true,
	    success: function success(data) {
	      callback(data);
	    },
	    error: function error(data) {
	      errorCallback(data);
	    }
	  });
	}

	exports.postAsync = postAsync;
	exports.postAsyncFalse = postAsyncFalse;
	exports.getAsync = getAsync;

/***/ }
/******/ ]);