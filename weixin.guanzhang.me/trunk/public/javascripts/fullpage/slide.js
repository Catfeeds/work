/*
 * 基于jquery的slide插件
*/
;(function(window){
	'use strict';
	function slide(el, opt){
		this.el = $(el);
		this.opt = opt;
		this.item = $(this.opt.item, this.el);
		this.len = this.item.length;
		this.prevTime = new Date().getTime();
		this.curIndex = 0;
		this.setScroll = true;
		this.setdom();
	}
	//完善dom
	slide.prototype.setdom = function(){
		var _html = this.el.html(),
			_this = this;
		this.container = $('<div></div>').attr('class', this.opt.container).html(_html).css('width',this.len*100+'%');
		this.prev = $('<span>').attr('class', this.opt.prevClass).on('click',function(){
			_this.scrolling('left');
		});
		this.next = $('<span>').attr('class', this.opt.nextClass).on('click',function(){
			_this.scrolling('right');
		});
		this.el.empty().append(this.container).append(this.prev).append(this.next);
		this.item = $(this.opt.item, this.container);
		this.item.css('width',100/this.len + '%');
	}
	//滚动
	slide.prototype.scrolling = function(type){
		var curTime = new Date().getTime();
		if(curTime-this.prevTime<200 || !this.setScroll){
        	return;
        }
		var _left = this.container.css('left'),
			_width = this.el.width(),
			_this = this;
		this.setScroll = false;
		if(type=='left'){
			this.curIndex = this.curIndex - 1;
			this.curIndex = this.curIndex>=0?this.curIndex:(this.len-1);
		}else if(type=='right'){
			this.curIndex = this.curIndex + 1;
			this.curIndex = this.curIndex<=(this.len-1)?this.curIndex:0;
		}
		
		_left = this.curIndex*_width;
		this.container.animate({left:-_left},1000,function(){
			_this.setScroll = true;
		});
	}
	window.slide = slide;
})(window)
