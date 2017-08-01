'use strict';

$(function () {
  // $.tipsBox.show('111');
  // $.loadingBox.show();
  // $.commonDialogBox.show();
  // 
  // 
  // 
  function error(res){
    $.loadingBox.hide();
    alert('网络错误');
  }
  // 
  var main = {
    init:function(){
      bigTitle.show();
      bigTitle.init();
      takeMoneySuccess.init();
      empty.init();
      centerTitle.val('提现');
      bankList.init();
      bankList.getList();
      bankCardInfo.init();
      barLeft.init();
      money.init();
    }
  } 
  var money = {
    $dom:$('#bigTitle em b'),
    $btn:$('#takeMoneyBtn'),
    init:function(){
      this.checkMoney();
    },
    checkMoney:function(){
      if ( Number(this.$dom.html() >= 50 )) {
        this.$btn.removeAttr('disabled');
      } else {
        this.$btn.attr('disabled','');
      }
    }
  };


  var barLeft = {
    $dom:$('#barLeft'),
    bindBack:function(){},
    bindReload:function(){},
    onClickBack:function(){
      this.$dom.on('click',this.bindBack);
    },
    offClickBack:function(){
      this.$dom.off('click',this.bindBack);
    },
    onClickReload:function(){
      this.$dom.on('click',this.bindReload);
    },
    offClickReload:function(){
      this.$dom.off('click',this.bindReload);
    },
    init:function(){
      this.bindBack = this.back.bind(this);
      this.bindReload = this.reload.bind(this);
      this.change('back');
    },
    change:function(type){
      this.offClickBack();
      this.offClickReload();
      if ( type === 'back' ) {
        this.onClickBack();
      }
      if ( type === 'reload' ) {
        this.onClickReload();
      }
    },
    back:function(){
      window.history.go(-1);
    },
    reload:function(){
      window.location.reload();
    }
  }

  var centerTitle = {
    $dom:$('#centerTitle'),
    val:function(text){
      this.$dom[0].innerHTML = text;
    }
  }

  var bankList = {
    $dom:$('#bankList'),
    $list:$('#bankList .list'),
    $takeMoneyBtn:$('#takeMoneyBtn'),
    radioList:[],
    init:function(){
      var that = this;
      this.radioList = [];
      this.$list.html('');
      this.$takeMoneyBtn.on('click',function(){
        that.takeMoney(this);
      });
    },
    checkBankCardId:function(){
      var checked = this.radioList.filter(function(item){
        return item.checked;
      });
      if ( checked.length === 0 ) return false;
      return checked[0].value;
    },
    takeMoney:function(dom){
      if ( dom.hasAttribute('disabled') ) return false;
      var that = this;
      var bank_card_id = this.checkBankCardId();
      if ( bank_card_id === false ) return $.tipsBox.show('请选择银行卡');
      
      var data = {
        type:1,
        bank_card_id:bank_card_id,
      };
      var success = function(res){
        $.loadingBox.hide();
        var res = $.ajaxList.checkFormat(res);
        if ( !res ) return $.tipsBox.show('格式错误，请刷新重试'); 
        if ( res.status == '0000' ) {
          takeMoneySuccess.show();
        } else {
          $.tipsBox.show(res.msg);
        }
      };
      var error = error;

      $.commonDialogBox.show({
        title:'确定将所有金额提现到银行卡吗？',
        sureTxt:'确定提现',
        cancelTxt:'取消',
      },function(){
        $.loadingBox.show();
        $.ajaxList.withdrawCash(data, success, error);
      },function(){});
      
    },
    show:function(){
      centerTitle.val('提现');
      this.$dom.removeClass('hide');
    },
    hide:function(){
      this.$dom.addClass('hide');
      centerTitle.val('');
    },
    getList:function(){
      var that = this;
      $.loadingBox.show();
      var success = function(res){
        // console.log(res);
        $.loadingBox.hide();
        bigTitle.show();
        var res = $.ajaxList.checkFormat(res);
        if ( !res ) return $.tipsBox.show('格式错误，请刷新重试'); 
        if ( res.status == '0000' ) {
          if ( res.data.lists.length > 0 ) {
            that.craeteLists(res.data.lists);
            that.show();
          } else {
            that.hide();
            empty.show();
          }
        } else {
          $.tipsBox.show(res.msg);
        }
      };
      var error = error;
      var data = {};
      $.ajaxList.bankCardList(data, success, error);
    },
    craeteLists:function(lists){
      var that = this;
      lists.forEach(function(item,index){
        var li = that.craeteList(item,index);
        that.$list.append(li);
      });
    },
    craeteList:function(item,index){
      var that = this;
      var li = document.createElement('li');
      var div = document.createElement('div');
      var bankName = document.createElement('span');
      bankName.innerHTML = item.bank_name + '(' + lastFour(item.card_number) + ')' ;
      var iconEdit = document.createElement('i');
      iconEdit.className = 'icon-edit';
      $(iconEdit).on('click',function(e){
        that.edit(item);
      });
      var radio = document.createElement('input');
      radio.name = 'bank';
      radio.value = item.bank_card_id;
      radio.type = 'radio';
      radio.id = 'bank_' + item.bank_card_id;
      if ( index === 0 ) radio.setAttribute('checked','');
      this.radioList.push(radio);
      var label = document.createElement('label');
      label.className = 'icon-radio';
      label.setAttribute('for','bank_' + item.bank_card_id);
      div.className = 'inner';

      div.appendChild(bankName);
      div.appendChild(radio);
      div.appendChild(label);
      div.appendChild(iconEdit);
      li.appendChild(div);
      return li;
    },
    edit:function(item){
      this.hide()
      bankCardInfo.show('edit', item);
    }
  }

  var bankCardInfo = {
    $editBtnP:$('.editBtnP'),
    $addBtnP:$('.addBtnP'),
    $dom:$('#bankCardInfo'),
    $addSave:$('.addBtnP .save-btn'),
    $editSave:$('.editBtnP .save-btn'),
    $cardNumber:$('#cardNumber'),
    $cardUser:$('#cardUser'),
    $cardLocation:$('#cardLocation'),
    $cardBank:$('#cardBank'),
    $option:$('#bankSelect option'),
    $select:$('#bankSelect'),
    $unbind:$('#unbind'),
    data:{},
    init:function(){
      var that = this;
      this.$addSave.on('click',function(){
        that.save('add');
      });
      this.$editSave.on('click',function(){
        that.save('edit');
      });
      this.$unbind.on('click',function(){
        that.unbind();
      });
    },
    unbind:function(){
      var data = {
        bank_card_id:this.data.bank_card_id,
      };
      var success = function(res){
        $.loadingBox.hide();
        var res = $.ajaxList.checkFormat(res);
        if ( !res ) return $.tipsBox.show('格式错误，请刷新重试'); 
        if ( res.status == '0000' ) {
          $.tipsBox.show('删除成功');
          setTimeout(function(){
            window.location.reload();
          },1000);
        } else {
          $.tipsBox.show(res.msg);
        }
      };
      var error = error;
      
      $.commonDialogBox.show({
        title:'确定要解除该银行卡的绑定吗？',
        sureTxt:'解除银行卡',
        cancelTxt:'取消',
      },function(){
        $.loadingBox.show();
        $.ajaxList.deleteBankCard(data, success, error);
      },function(){});
      
    },
    checkAllInput:function(){
      var that = this;
      var checkCardNumberTrue = !(/\D/.test(this.$cardNumber.val()));
      var checkCardNumber = function(){
        if ( that.$cardNumber.val() === '' ) return false;
        return true;
      }
      var checkCardUser = function(){
        if ( that.$cardUser.val() === '' ) return false;
        return true; 
      }
      var checkCardLocation = function(){
        if ( that.$cardLocation.val() === '' ) return false;
        return true; 
      }
      var checkCardBank = function(){
        if ( that.$cardBank.val() === '' ) return false;
        return true; 
      }
      var checkSelect = function(){
        if ( that.$select.val() === '' ) return false;
        return true;
      }
      switch(false) {
        case checkCardNumber(): return $.tipsBox.show('请输入银行卡号') && false;
        case checkCardNumberTrue: return $.tipsBox.show('请输入正确的银行卡号') && false;
        case checkCardUser(): return $.tipsBox.show('请输入持卡人姓名') && false;
        case checkCardLocation(): return $.tipsBox.show('请输入开户地') && false;
        case checkCardBank(): return $.tipsBox.show('请输入开户行') && false;
        case checkSelect(): return $.tipsBox.show('请选择所属银行') && false;
        default:return true;
      }
    },
    save:function(type){
      if ( !this.checkAllInput() ) return false;
      $.loadingBox.show();
      var data = {
        bank_card_id : this.data.bank_id,
        card_number : this.$cardNumber.val(),
        card_holder : this.$cardUser.val(),
        bank_branch : this.$cardBank.val(),
        bank_address : this.$cardLocation.val(),
        bank_id : this.$select.val(),
      };
      
      var success = function(res){
        // console.log(res);
        var text = '添加成功';
        if ( type === 'edit' ) text = '修改成功';
        $.loadingBox.hide();
        var res = $.ajaxList.checkFormat(res);
        if ( !res ) return $.tipsBox.show('格式错误，请刷新重试'); 
        if ( res.status == '0000' ) {
          $.tipsBox.show(text);
          setTimeout(function(){
            window.location.reload();
          },1000);
        } else {
          $.tipsBox.show(res.msg);
        }
      };
      var error = error;
      if ( type === 'edit') return $.ajaxList.editBankCard(data, success, error);
      if ( type === 'add') return $.ajaxList.addBankCard(data, success, error);
      
    },
    show:function(type, data){
      // console.log(type, data);
      barLeft.change('reload');
      this.data = data || {};
      bigTitle.hide();
      empty.hide();
      bankList.hide();
      this.$dom.removeClass('hide');
      if ( type === 'edit' ) {
        centerTitle.val('修改银行卡');
        this.$editBtnP.removeClass('hide');
        this.$addBtnP.addClass('hide');
      } 
      if ( type === 'add' ) {
        centerTitle.val('添加银行卡');
        this.$addBtnP.removeClass('hide');
        this.$editBtnP.addClass('hide');
      }
      this.setValue();
    },
    setValue:function(){
      var card_number = this.data.card_number || '';
      var card_holder = this.data.card_holder || '';
      var bank_address = this.data.bank_address || '';
      var bank_branch = this.data.bank_branch || '';
      var bank_id = this.data.bank_id || '';

      // console.log(bank_id);
      this.$cardNumber.val(card_number);
      this.$cardUser.val(card_holder);
      this.$cardLocation.val(bank_address);
      this.$cardBank.val(bank_branch);
      this.$select.val(bank_id);
    },
    hide:function(){
      this.$dom.addClass('hide');
      centerTitle.val('');
    }
  }

  var bigTitle = {
    $dom:$('#bigTitle'),
    $add:$('#bigTitle .icon-add'),
    init:function(){
      var that = this;
      this.$add.on('click',function(){
        bankCardInfo.show('add');
      });
    },
    show:function(){
      this.$dom.removeClass('hide');
    },
    hide:function(){
      this.$dom.addClass('hide');
    }
  }

  var empty = {
    $dom:$('#empty'),
    $add:$('#add'),
    init:function(){
      var that = this;
      this.$add.on('click',function(){
        bankCardInfo.show('add');
      });
    },
    show:function(){
      this.$dom.removeClass('hide');
      centerTitle.val('提现');
    },
    hide:function() {
      this.$dom.addClass('hide');
      centerTitle.val('');
    }
  }

  var takeMoneySuccess = {
    $dom:$('#takeMoneySuccess'),
    $btn:$('#takeMoneySuccess .btn'),
    init:function(){
      var that = this;
      this.$btn.on('click',function(){
        window.location.href = '/cash/index';
      });
    },
    show:function(){
      bankList.hide();
      bigTitle.hide();
      this.$dom.removeClass('hide');
      centerTitle.val('提现');
    },
    hide:function() {
      this.$dom.addClass('hide');
      centerTitle.val('');
    }
  }

  function lastFour(str){
    return str.substr(str.length-4);
  }

  main.init();
 
})