'use strict';

$(function () {
  
var getListURL = '/usercard/getListByKey';
var data = {
    keyword:'', // 关键词（模糊查询卡号，手机，姓名）
    // page:1, // 页码，默认为1，第一页
    // page_size:20, // 每页记录数，默认为20
    // sort_key:'card_number', // 排序字段，默认为id, 可选：
    // sort_value:'DESC', // 排序方式，升序：“ASC”，降序“DESC”，默认DESC
    type:1
  }

function ajaxGetListURL(getListData,successCallback,errorCallback) {
  $.ajax({
    type:'get',
    url:getListURL,
    data:getListData,
    success:successCallback,
    error:errorCallback,
  });
}

var inputSearch = {
  $inputCardNumber:$('#locked_card_number'),
  $inputName:$('#locked_name_in'),
  $inputPhone:$('#locked_mobile_in'),
  inputList:[$('#locked_card_number'),$('#locked_name_in'),$('#locked_mobile_in')],
  data:data,
  listData:[],
  index:null,
  WAIT_TIME:100,
  timer:null,
  canISendAjax:function(){
    var that = this;
    if ( !this.timer ) {
    this.timer = setTimeout(function(){
      that.timer = null;
    },this.WAIT_TIME);
      return true;
    } else {
      return false;
    }
  },
  format:function(){
    $.each(this.inputList,function(index,item){
      $(item).removeAttr('disabled');
      $(item).val('').parent().find('.nm-inputsearch').html('');
    });
    this.listData = [];
    this.index = null;
    $('.pop-validorder2 .money').removeClass('hide');
  },
  init:function(){
    var that = this;
    this.$inputCardNumber.attr('data-type','1');
    this.$inputName.attr('data-type','1');
    this.$inputPhone.attr('data-type','2');
    $.each(this.inputList,function(index,item){
      $(item).attr('data-type',index);
      $(item).after('<div class="nm-inputsearch"></div>');
      $(item).on('input propertychange',function(){
        that.inputChange(this);
      });
      $(item).on('blur',function(){
        that.inputBlur(this);
      });
      $(item).on('focus',function(){
        that.inputFocus(this);
      });
    });
  },
  hide:function(dom){
    $(dom).parent().find('.nm-inputsearch').addClass('hide');
  },
  show:function(dom){
    $(dom).parent().find('.nm-inputsearch').removeClass('hide');
  },
  inputBlur:function(dom){
    this.hide(dom);
    if ( this.index  && this.listData[this.index] ) {
      this.inputSetValue({
        card_number:this.listData[this.index].card_number,
        name:this.listData[this.index].name,
        phone:this.listData[this.index].phone
      },$(dom).attr('data-type'));
    }
  },
  inputSetValue:function(obj,type){
    var that = this;
    var data = obj || {};
    var card_number = data.card_number || '';
    var phone = data.phone || '';
    var name = data.name || '';
    this.$inputCardNumber.val(card_number);
    this.$inputName.val(name);
    this.$inputPhone.val(phone);
    this.$inputPhone.change();
    setTimeout(function(){
      // check(that.$inputPhone[0]);
      that.afterSetValue(type);
    },100);
  },
  afterSetValue:function(type){
    $.each(this.inputList,function(index,item){
      if ( index != type ) {
        $(item).attr('disabled','');
      }
    });
    $('#bookSubmit').attr('disabled','');
    $('.pop-validorder2 .money').addClass('hide');
  },
  inputFocus:function(dom){
    if ( $.trim(dom.value) === '' ) {
      this.inputClear();
    }
    if ( this.listData[0] ) {
      this.show(dom);
    }
  },
  inputClear:function(dom){
    this.listData = [];
    var that = this;
    $.each(this.inputList,function(index,item){
      // item.val('');
      item.removeAttr('disabled');
      that.hide(item);
    });
  },
  bindLi:function(li){
    var that = this;
    $(li).mouseenter(function(){
      that.index = $(this).attr('data-index') || null;
    });
    $(li).mouseleave(function(){
      that.index = null;
    });
  },
  deleteAllValue:function(){
    $.each(this.inputList,function(index,item){
      $(item).val('').removeAttr('disabled').parent().find('.nm-inputsearch').addClass('hide');
    });
  },
  inputChange:function(dom){
    if ( $.trim(dom.value) === '' ) {
      this.deleteAllValue();
      return false;
    }
    if ( $(dom).attr('name') === 'locked_number' ) {
      $('#bookSubmit').attr('disabled',''); 
    }
    $.each(this.inputList,function(index,item){
      if ( $(item).attr('name') !== $(dom).attr('name') && item[0].hasAttribute('disabled') ) {
        $(item).removeAttr('disabled').val('');
      }
    });
    var getListData = this.data;
    var that = this;
    getListData.keyword = $(dom).val();
    getListData.type = $(dom).attr('data-type');
    var successCallback = function(res){
      // console.log(res);
      if ( res.status === '0000' ) {
        that.listData = res.data.list;

        var card_html = document.createElement('ul');
        card_html.className = 'nm-inputsearch-ul';
        $.each(res.data.list,function(index,item){
          var li = document.createElement('li');
          that.bindLi(li);
          li.className = 'nm-inputsearch-li';
          li.setAttribute('data-index',index);
          li.innerHTML = item.card_number +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ item.name;
          card_html.appendChild(li);
        }); 
        

        var name_html = document.createElement('ul');
        name_html.className = 'nm-inputsearch-ul'
        $.each(res.data.list,function(index,item){
          var li = document.createElement('li');
          that.bindLi(li);
          li.className = 'nm-inputsearch-li';
          li.setAttribute('data-index',index);
          li.innerHTML = item.name +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ item.card_number;
          name_html.appendChild(li);
        }); 

        
        var phone_html = document.createElement('ul');
        phone_html.className = 'nm-inputsearch-ul';
        $.each(res.data.list,function(index,item){
          var li = document.createElement('li');
          that.bindLi(li);
          li.className = 'nm-inputsearch-li';
          li.setAttribute('data-index',index);
          li.innerHTML = item.phone +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ item.card_number;
          phone_html.appendChild(li);
        }); 

        that.$inputCardNumber.parent().find('.nm-inputsearch').html('').append(card_html);
        that.$inputName.parent().find('.nm-inputsearch').html('').append(name_html);
        that.$inputPhone.parent().find('.nm-inputsearch').html('').append(phone_html);

        if ( res.data.list.length > 0 ) {
          $(dom).parent().find('.nm-inputsearch').removeClass('hide');
        } else {
          $(dom).parent().find('.nm-inputsearch').addClass('hide');
        }

      }
    } 
    var errorCallback = function(res){
      alert('网络错误');
    }
    if ( this.canISendAjax() ) ajaxGetListURL(getListData,successCallback,errorCallback);
  }
}

inputSearch.init();

window.inputSearch = inputSearch;

});