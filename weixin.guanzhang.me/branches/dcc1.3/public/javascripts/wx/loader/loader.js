;(function(window) {
	'use strict';
	function loader(el){
		this.el = el;
		this.init();
		var _this = this;
		window.onresize = function(){
			_this.init();
		}
		setTimeout(function(){
			_this.show();
		},10);
	}
	loader.prototype.init = function() {
		var maxW = window.innerWidth,
			maxH = window.innerHeight,
			r,
			_this = this;
		if(maxW>maxH){
			r = maxW + maxH/2;
		}else{
			r = maxH + maxW/2;
		}
		this.el.style.width = r + 'px';
		this.el.style.height = r + 'px';
		this.el.style.marginLeft = - r/2 + 'px';
		this.el.style.marginTop = - r/2 + 'px';
	}
	loader.prototype.show = function() {
		this.el.className = 'show';
	}
	loader.prototype.hide = function() {
		this.el.className = 'hide';
	}
	window.loader = loader;
})(window);