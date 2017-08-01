'use strict';

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

$(function () {
  
  var list = {
    $dom:$('#list'),
    $loading:$('#_loading'),
    $nomore:$('#nomore'),
    $main:$('#main'),
    page:1,
    count:20,
    onAjaxing:false,
    bindFn:function(){},
    init:function(){
      this.getList();
      this.bindScrollEvent();
    },
    bindScrollEvent:function(){
      this.bindFn = this.scrollEvent.bind(this);
      $(window).on('scroll',this.bindFn);
    },
    unbindScrollEvent:function(){
      $(window).off('scroll',this.bindFn);
    },
    scrollEvent:function(e){
      var that = this;
      this.unbindScrollEvent();
      window.requestAnimationFrame(function(){
        that.bindScrollEvent();
        // console.log(that.onAjaxing);
        if ( that.onAjaxing ) return false;
        if ( that.onBottom() ) return setTimeout(function(){
          that.getList();
        },0);
      });
    },
    onBottom:function(){
      if (this.$main[0].clientHeight - window.scrollY < document.body.clientHeight + 50) return true;
      return false;
    },
    nomore:function(){
      this.loadingHide();
      this.$nomore.removeClass('hide');
      this.unbindScrollEvent();
    },
    getList:function(){
      var that = this;
      this.loadingShow();
      this.onAjaxing = true;
      var data = {page:this.page,count:this.count};
      var success = function(res){
        that.loadingHide();
        that.onAjaxing = false;
        var res = $.ajaxList.checkFormat(res);
        if ( !res ) return $.tipsBox.show('格式错误，请刷新重试');
        if ( res.status == '0000' ) {
          that.page ++;
          if ( res.data.lists.length > 0 ) {
            that.create(res.data.lists);
          } else {
            that.nomore();
          }
        } else {
          $.tipsBox.show(res.msg);
        }
      };
      var error = function(res){
        that.loadingHide();
        that.onAjaxing = false;
        alert('网络错误');
      };
      $.ajaxList.cashRecord(data, success, error);
    },
    loadingShow:function(){
      this.$loading.removeClass('hide');
    },
    loadingHide:function(){
      this.$loading.addClass('hide');
    },
    create:function(lists){
      var that = this;
      var l = lists.map(function(item){
        var des = item.description;
        var amount = Number(item.amount);
        var time = item.add_time_str;
        // var time = timeFormat(item.add_time);
        var orange = '';
        if ( amount > 0 ) { amount = '+' + amount; orange = 'orange'; }
        item._html = '<li><div class="inner"><div class="msg">'+des+'</div><div class="time">'+time+'</div><div class="count '+orange+'">'+amount+'</div></div></li>';
        return item;
      });
      l.forEach(function(item){
        that.$dom.append(item._html);
      });
    },
  }

  function timeFormat(time){
    var ts = time * 1000;
    var date = new Date(ts);
    var yyyy = date.getFullYear();
    var mm = date.getMonth();
    var dd = date.getDate();
    var hh = date.getHours();
    var min = date.getMinutes();
    return yyyy + '年' + mm + '月' + dd + '日' + ' ' + hh + ':' + min;
  }

  list.init();

});