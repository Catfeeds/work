'use static';
$(function () {
  
  /* z-index自增 */
  var ZINDEX = 10000000;

  function addZindex(dom) {
      $(dom).css('z-index', ZINDEX);
      ZINDEX++;
  }

  /* 背景遮罩 */

  function showBC(text) {
    var $blackCover = $('#'+text);
    addZindex($blackCover);
    $blackCover.removeClass('hide');
  }

  function hideBC(text) {
    var $blackCover = $('#'+text);
    $blackCover.addClass('hide');
  }

  /* 通用对话框 */
  var commonDialogBox = {
    $dom:$('#commonDialogBox'),
    $sureBtn:$('#commonDialogBoxSure'),
    $cancelBtn:$('#commonDialogBoxCancel'),
    $desc:$('#commonDialogBox .dialogue-desc'),
    $title:$('#commonDialogBox .dialogue-title'),
    callback:function(){},
    show:function(opt,fn){
      this.$title.html(opt.title || '确认操作');
      this.$desc.html(opt.desc || '确认操作?');
      this.$sureBtn.html(opt.sureText || '确认');
      this.$cancelBtn.html(opt.cancelText || '取消');

      showBC('blackCoverForDialog');
      addZindex(this.$dom);
      var that = this;
      this.$dom.removeClass('hide');
      this.callback = function(){
        if ( typeof fn === 'function' ) fn();
        that.hide();
      }
    },
    hide:function(){
      hideBC('blackCoverForDialog');
      this.$dom.addClass('hide');
      this.callback = function(){};
    },
    init:function(){
      var that = this;
      this.$cancelBtn.click(function(){
        that.hide();
      });
      this.$sureBtn.click(function(){
        that.callback();
      });
    }
  }

  commonDialogBox.init();

  /* loadingbox */

  var loadingBox = {
    $dom:$('#loadingBox'),
    $text:$('#loadingBox h3'),
    show:function(text){
      showBC('blackCoverForLoading');
      addZindex(this.$dom);
      this.$dom.removeClass('hide');
      this.$text.html(text || '操作进行中');
    },
    hide:function(){
      hideBC('blackCoverForLoading');
      this.$dom.addClass('hide');
      this.$text.html('');
    }
  }

  /* tips box */

  var tipsBox = {
    $dom:$('#tipsBox'),
    $text:$('#tipsBox h3'),
    $btn:$('#tipsBox .btn'),
    show:function(text){
      
      showBC('blackCoverForTips');
      addZindex(this.$dom);
      this.$dom.removeClass('hide');
      this.$text.html(text);
    },
    hide:function(){
      hideBC('blackCoverForTips');
      this.$dom.addClass('hide');
      this.$text.html('');
    },
    init:function(){
      var that = this;
      this.$btn.click(function(){
        that.hide();
      });
    },
    flush:function(text){
        
        showBC('blackCoverForTips');
        addZindex(this.$dom);
        this.$dom.removeClass('hide');
        this.$text.html(text);
        
        setTimeout(function(){  
        	location.reload();//页面刷新
        	},2000);
      }
  }

  tipsBox.init();


  /* tips box */
  window.$tipsBox = tipsBox;
  /* loadingbox */
  window.$loadingBox = loadingBox;
  /* 通用对话框 */
  window.$commonDialogBox = commonDialogBox;
  // addZindex
  window.$addZindex = addZindex;
  /* 背景遮罩 */
  window.$showBC = showBC;
  window.$hideBC = hideBC;
});