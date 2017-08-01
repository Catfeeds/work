'use static';
$(function () {
  
/* tips box */
var tipsBox = window.$tipsBox;
/* loadingBox */
var loadingBox = window.$loadingBox;
/* 通用对话框 */
var commonDialogBox = window.$commonDialogBox;
var addZindex = window.$addZindex;
/* 背景遮罩 */
var showBC = window.$showBC;
var hideBC = window.$hideBC;

/* ajax列表模块 */
var ajax = window.$ajaxlist;
var checkFormat = window.$ajaxlist.checkFormat;

function error(res){
  loadingBox.hide();
  alert('网络错误');
}

var bindPhoneBox = {
  $dom:$('#bindPhoneBox'),
  $nav_a:$('#bindUser'),
  $close:$('#bindPhoneBox .close'),
  $bindPhoneNumber:$('#bindPhoneNumber'),
  $checkCode:$('#checkCode'),
  $getCheckCode:$('#getCheckCode'),
  $sureBindBtn:$('#sureBindBtn'),
  bindPhone:null,
  timer:null,
  clickBindFn:function(){},
  sureClickBindFn:function(){},
  getCheckCodeClickBindFn:function(){},
  init:function(){
    var that = this;

    this.clickBindFn = this.click.bind(this);
    this.sureClickBindFn = this.sureClick.bind(this);
    this.getCheckCodeClickBindFn = this.getCheckCodeClick.bind(this);

    this.$getCheckCode.on('click',this.getCheckCodeClickBindFn);
    this.$sureBindBtn.on('click',this.sureClickBindFn);
    this.$nav_a.on('click',this.clickBindFn);
    
    this.$close.on('click',function(){
      that.hide();
    });

  },
  show: function() {
      showBC('blackCoverForBindPhoneBox');
      addZindex(this.$dom);
      this.$dom.removeClass('hide');
  },
  hide: function() {
      hideBC('blackCoverForBindPhoneBox');
      this.$dom.addClass('hide');
  },
  click:function(e){
    var that = this;
    if ( this.bindPhone !== null ) return tipsBox.show('已绑定手机号码'+this.bindPhone);
    loadingBox.show();
    var data = {};
    var success = function(res){
      loadingBox.hide();
      var res = checkFormat(res);
      if ( !res ) return tipsBox.show('格式错误，请刷新重试');
      if ( res.status == '0000' ) {
        that.bindPhone = res.data.phone;
        tipsBox.show('已绑定手机号码'+that.bindPhone);
      } else if ( res.status == '4001' ) {
        that.show();
      } else {
        tipsBox.show(res.msg);
      }
    }
    var error = error;
    ajax.user(data, success, error);
  },
  sureClick:function(e){
    var that = this;
    var bool = this.checkPhone(this.$bindPhoneNumber.val());
    var bool2 = this.isCheckCode(this.$checkCode.val());
    if ( this.$sureBindBtn[0].hasAttribute('disabled') ) return false;
    if ( !bool ) return tipsBox.show('请输入正确的手机号码');
    if ( bool2 ) return tipsBox.show('请输入验证码');

    loadingBox.show();
    this.$sureBindBtn.attr('disabled');

    var data = {
      phone:this.$bindPhoneNumber.val(),
      sms_code:this.$checkCode.val(),
    };
    var success = function(res){
      loadingBox.hide();
      that.$sureBindBtn.removeAttr('disabled');
      var res = checkFormat(res);
      if ( !res ) return tipsBox.show('格式错误，请刷新重试');
      if ( res.status == '0000' ) {
        tipsBox.show('绑定成功');
        that.hide();
        setTimeout(function(){window.location.reload()},300);
      } else {
        tipsBox.show(res.msg);
      }
    }
    var error = function(res){
      loadingBox.hide();
      alert('网络错误');
      that.$sureBindBtn.removeAttr('disabled');
    }
    ajax.bindUser(data, success, error);
  },
  getCheckCodeSheep:function(num){
    var sheepTime = num;
    var that = this;
    clearInterval(this.timer);
    this.$getCheckCode.attr('disabled','').text(sheepTime+'s后可重新获取');
    this.timer = setInterval(function(){
      sheepTime --;
      that.$getCheckCode.text(sheepTime+'s后可重获');
      if ( sheepTime <= 0 ) {
        clearInterval(that.timer);
        that.$getCheckCode.removeAttr('disabled').text('获取验证码');
      }
    },1000);
  },
  getCheckCodeClick:function(e){
    var that = this;
    var bool = this.checkPhone(this.$bindPhoneNumber.val());
    if ( this.$getCheckCode[0].hasAttribute('disabled') ) return false;
    if ( !bool ) return tipsBox.show('请输入正确的手机号码');
    loadingBox.show();
    var data = {
      phone:this.$bindPhoneNumber.val(),
    };
    var success = function(res){
      loadingBox.hide();
      var res = checkFormat(res);
      if ( !res ) return tipsBox.show('格式错误，请刷新重试');
      if ( res.status == '0000' ) {
        that.getCheckCodeSheep(60);
        tipsBox.show('发送成功，请留意短信');
      } else {
        that.getCheckCodeSheep(60);
        tipsBox.show(res.msg);
      }
    }
    var error = error;
    ajax.sendSms(data, success, error);
  },
  checkPhone:checkPhone,
  isCheckCode:isCheckCode,
}

bindPhoneBox.init();

function checkPhone(phoneNumber){
  return !!/1[2345678]{1}\d{9}$/.test(phoneNumber);
}
function isCheckCode(str){
  var boolen = false;
  if ( str === '' || str === null || str === undefined ) boolen = true;
  return boolen;
}

window.$bindPhoneBox = bindPhoneBox;

});