'use strict';
var _$$_ = false;
if ( typeof jQuery === 'function') _$$_ = jQuery;
if ( typeof Zepto === 'function') _$$_ = Zepto;
;(function ($, undefined) {
  if (!$) return false;

  /* z-index自增 */
  var ZINDEX = 10000000;

  $.fn.addZindex = function(opt){
    return this.each(function(index, dom){
      $(dom).css('z-index', ZINDEX);
      ZINDEX++;
    });
  }

  /* 背景遮罩 */

  $.fn.setBC = function(opt){
    var defaults = {
      'position':'fixed',
      'top':'0',
      'left':'0',
      'right':'0',
      'bottom':'0',
      'backgroundColor':'#222',
      'opacity':'0.7',
    }
    var options = $.extend(defaults, opt);
    return this.each(function(index, dom){
      $(dom).css(options);
    });
  }

  $.fn.showBC = function(opt){
    var defaults = {};
    var options = $.extend(defaults, opt);
    return this.each(function(index, dom){
      $(dom).setBC(options).addZindex().show();
    });
  }

  $.fn.hideBC = function(opt){
    var defaults = {};
    var options = $.extend(defaults, opt);
    return this.each(function(index, dom){
      $(dom).setBC(options).addZindex().hide();
    });
  }

  /* 通用对话框 */
  var commonDialogBox = {
    style:{
      'commonDialogBox':{
        'width': '3rem',
        'paddingTop': '0.2rem',
        'backgroundColor': '#fff',
        'position': 'fixed',
        'top': '50%',
        'left': '50%',
        'webkitTransform': 'translate3d(-50% ,-50% ,0)',
        'transform': 'translate3d(-50% ,-50% ,0)',
        'borderRadius': '0.1rem',
        'text-align' : 'center',
        'font-size' : '0.16rem',
        'color' : '#000',
      },
      'commonDialogBoxTitle':{
        'margin': '0.2rem auto',
      },
      'pBtn':{
        'borderTop': '1px solid #eee',
      },
      'sureBtn':{
        'display': 'inline-block',
        'width': '50%',
        'padding': '0.2rem 0',
        'webbkitBoxSizing': 'border-box',
        'boxSizing': 'border-box',
        'borderRight': '1px solid #eee',
      },
      'cancelBtn':{
        'display': 'inline-block',
        'width': '50%',
        'padding': '0.2rem 0',
      },
    },
    isInit:false,
    sureCallback:function(){},
    cancelCallback:function(){},
    show:function(opt,sFn,cFn){
      if ( !this.isInit ) this.init();
      var opt = opt || {};
      var defaults = {
        title:'确认操作？',
        sureTxt:'确认',
        cancelTxt:'取消',
      }
      var options = $.extend(defaults, opt);
      this.$title.html(options.title);
      this.$sureBtn.html(options.sureTxt);
      this.$cancelBtn.html(options.cancelTxt);

      this.$BC.showBC();
      this.$dom.addZindex().show();
      var that = this;
      this.sureCallback = function(){
        if ( typeof sFn === 'function' ) sFn();
        that.hide();
      }
      this.cancelCallback = function(){
        if ( typeof cFn === 'function' ) cFn();
        that.hide();
      }
    },
    hide:function(){
      this.$BC.hideBC();
      this.$dom.hide();
      this.sureCallback = function(){};
      this.cancelCallback = function(){};
    },
    init:function(){
      var that = this;

      this.isInit = true;
      this.$BC = this.create('BC');
      this.$dom = this.create('dom');
      this.$title = this.create('title');
      this.$pBtn = this.create('pBtn');
      this.$cancelBtn = this.create('cancelBtn');
      this.$sureBtn = this.create('sureBtn');

      this.$pBtn.append(this.$sureBtn);
      this.$pBtn.append(this.$cancelBtn);
      this.$dom.append(this.$title);
      this.$dom.append(this.$pBtn);
      $('body').append(this.$dom);



      this.$cancelBtn.click(function(){
        that.cancelCallback();
      });
      this.$sureBtn.click(function(){
        that.sureCallback();
      });
    },
    create:function(type){
      if ( type  === 'dom' ) {
        var $dom = $(document.createElement('div'));
        $dom.css(this.style['commonDialogBox']);
      } 
      if ( type === 'title' ) {
        var $dom = $(document.createElement('h3'));
        $dom.css(this.style['commonDialogBoxTitle']);
      }
      if ( type === 'pBtn' ) {
        var $dom = $(document.createElement('p'));
        $dom.css(this.style['pBtn']);
      }
      if ( type === 'sureBtn' ) {
        var $dom = $(document.createElement('span'));
        $dom.css(this.style['sureBtn']);
      }
      if ( type === 'cancelBtn' ) {
        var $dom = $(document.createElement('span'));
        $dom.css(this.style['cancelBtn']);
      }
      if ( type === 'BC' ) {
        var $dom = $(document.createElement('div'));
        $dom.hideBC().appendTo('body');
      }
      return $dom;
    }
  }

  $.commonDialogBox = commonDialogBox;

  /* loadingBox */

  var loadingBox = {
    isInit:false,
    $BCDOM:null,
    $DOM:null,
    init:function(){
      this.isInit = true;
      this.BCDOM = this.BCDOMcreate();
      this.DOM = this.DOMcreate();
    },
    BCDOMcreate:function(){
      var BCDOM = document.createElement('div');
      $(BCDOM).hideBC();
      document.body.appendChild(BCDOM);
      return BCDOM;
    },
    DOMcreate:function(){
      var DOM = document.createElement('div');
      var HTML = '<div class="loading-icon"></div>';
      $(DOM).css({
        'position':'fixed',
        'top':'0',
        'left':'0',
        'right':'0',
        'bottom':'0',
      }).hide().html(HTML);
      document.body.appendChild(DOM);
      return DOM;
    },
    show:function(){
      if ( !this.isInit ) this.init();
      $(this.BCDOM).showBC();
      $(this.DOM).addZindex().show();
    },
    hide:function(){
      $(this.BCDOM).hideBC();
      $(this.DOM).hide();
    },
    out:function(){
      return 
    }
  }

  $.loadingBox = loadingBox;

  /* tips box */

  var tipsBox = {
    isInit:false,
    unit:'rem',
    style:{
      'tipsBox':{
        'width': '3rem',
        'padding': '0.2rem',
        'backgroundColor': '#fff',
        'position': 'fixed',
        'top': '50%',
        'left': '50%',
        'transform': 'translate3d(-50% ,-50% ,0)',
        'webkitTransform': 'translate3d(-50% ,-50% ,0)',
        'borderRadius': '0.1rem',
        'text-align' : 'center',
        'font-size' : '0.16rem',
        'color' : '#000',
      },
      'tipsBoxText':{
        'margin': 'auto',
        'margin-top': '0.2rem',
        'margin-bottom': '0.2rem',
      },
      'pBtn':{},
      'btn':{
        'lineHeight': '0.45rem',
        'webkitBoxSizing': 'border-box',
        'boxSizing': 'border-box',
        'borderRadius': '3em',
        'backgroundColor': '#009ff0',
        'color': '#fff',
        'display': 'inline-block',
        'margin': '0.1rem',
        'textAlign': 'center',
        'minWidth': '2.5rem',
      },
    },
    init:function(){
      var that = this;

      this.isInit = true;
      this.BC = this.create('BC');
      this.dom = this.create('dom');
      this.text = this.create('text');
      this.pBtn = this.create('pBtn');
      this.btn = this.create('btn');

      this.pBtn.appendChild(this.btn);
      this.dom.appendChild(this.text);
      this.dom.appendChild(this.pBtn);
      $('body').append(this.dom);

      $(this.btn).click(function(){
        that.hide();
      });

    },
    create:function(type){
      
      if ( type  === 'dom' ) {
        var dom = document.createElement('div');
        $(dom).css(this.style['tipsBox']);
      } 
      if ( type === 'text' ) {
        var dom = document.createElement('h3');
        $(dom).css(this.style['tipsBoxText']);
      }
      if ( type === 'pBtn' ) {
        var dom = document.createElement('p');
        $(dom).css(this.style['pBtn']);
      }
      if ( type === 'btn' ) {
        var dom = document.createElement('span');
        $(dom).css(this.style['btn']);
      }
      if ( type === 'BC' ) {
        var dom = document.createElement('div');
        $(dom).hideBC().appendTo('body');
      }
      return dom;
    },
    show:function(text,btnText,unit){
      if ( !this.isInit ) this.init();
      var opt = {
        text : text,
        btnText : btnText,
        unit : unit,
      };
      var defaults = {
        text : '提示',
        btnText : '确认',
        unit : 'rem'
      }
      var options = $.extend(defaults, opt);
      this.changeUnit('px');
      $(this.BC).showBC();
      $(this.dom).addZindex().show();
      this.text.innerHTML = options.text;
      this.btn.innerHTML = options.btnText;
      
    },
    changeUnit:function(type){
      if ( this.unit === type ) return false;
      this.type = type;
      if ( type === 'px' ) {
        changePX(this.style.tipsBox);
        changePX(this.style.tipsBoxText);
        changePX(this.style.btn);
        this.reload();
      }
      if ( type === 'rem' ) {
        changeREM(this.style.tipsBox);
        changeREM(this.style.tipsBoxText);
        changeREM(this.style.btn);
        this.reload();
      }
    },
    hide:function(){
      $(this.BC).hideBC();
      $(this.dom).hide();
      $(this.text).html('');
      $(this.btn).html('');
    },
    reload:function(){
      this.isInit = false;
      this.remove();
      this.init();
    },
    remove:function(){
      $(this.BC).remove();
      $(this.dom).remove();
      $(this.text).remove();
      $(this.pBtn).remove();
      $(this.btn).remove();
    }
  }

  function changePX(obj){
    for ( var name in obj ) {
      if ( obj[name].indexOf('rem') !== -1 ) {
        obj[name] = (obj[name].replace('rem','') * 100) + 'px';
      }
    }
  }

  function changeREM(obj){
    for ( var name in obj ) {
      if ( obj[name].indexOf('px') !== -1 ) {
        obj[name] = (obj[name].replace('px','') / 100) + 'rem';
      }
    }
  }

  $.tipsBox = tipsBox;

})(_$$_)