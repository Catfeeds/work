'use strict';
var _$$_ = false;
if ( typeof jQuery === 'function') _$$_ = jQuery;
if ( typeof Zepto === 'function') _$$_ = Zepto;
;(function ($, undefined) {
  if (!$) return false;

  var DEV = false;

  var ajaxList = {
    url:{
      bankCardList: '/cash/bankCardList' , 
      withdrawCash : '/cash/withDrawCash' , // 提现:withdraw_cash 提现类型(0:转至余额 1:提现至银行卡) 
      editBankCard : '/cash/editBankCard' , // 编辑银行卡:edit_bank_card
      addBankCard : '/cash/addBankCard' , // add银行卡:add_bank_card
      deleteBankCard : '/cash/deleteBankCard' , // 删除银行卡:delete_bank_card
      cashRecord : '/cash/cashRecord' , // 现金帐户变动记录:cash_record
    },
    cashRecord :function(data, success, error){ // 现金帐户变动记录:cash_record
      // if ( DEV ) return success(ajaxFakeData.cashRecord);
      var postData = typeof objMerge == 'function' ? objMerge(data) : data;
      $.ajax({
        url:this.url.cashRecord,
        type:'get',
        data:postData,
        success:success,
        error:error,
      });
    },
    deleteBankCard :function(data, success, error){ // 删除银行卡:delete_bank_card
      // if ( DEV ) return success(ajaxFakeData.deleteBankCard);
      var postData = typeof objMerge == 'function' ? objMerge(data) : data;
      $.ajax({
        url:this.url.deleteBankCard,
        type:'post',
        data:postData,
        success:success,
        error:error,
      });
    },
    addBankCard :function(data, success, error){ // add银行卡:edit_bank_card
      // if ( DEV ) return success(ajaxFakeData.addBankCard);
      var postData = typeof objMerge == 'function' ? objMerge(data) : data;
      $.ajax({
        url:this.url.addBankCard,
        type:'post',
        data:postData,
        success:success,
        error:error,
      });
    },
    editBankCard :function(data, success, error){ // 编辑银行卡:edit_bank_card
      // if ( DEV ) return success(ajaxFakeData.editBankCard);
      var postData = typeof objMerge == 'function' ? objMerge(data) : data;
      $.ajax({
        url:this.url.editBankCard,
        type:'post',
        data:postData,
        success:success,
        error:error,
      });
    },
    bankCardList :function(data, success, error){ // 银行卡列表:bank_card_list
      // if ( DEV ) return success(ajaxFakeData.bankCardList);
      var postData = typeof objMerge == 'function' ? objMerge(data) : data;
      $.ajax({
        url:this.url.bankCardList,
        type:'post',
        data:postData,
        success:success,
        error:error,
      });
    },
    withdrawCash :function(data, success, error){ // 提现:withdraw_cash 提现类型(0:转至余额 1:提现至银行卡) 
      // if ( DEV ) return success(ajaxFakeData.withdrawCash);
      var postData = typeof objMerge == 'function' ? objMerge(data) : data;
      $.ajax({
        url:this.url.withdrawCash,
        type:'post',
        data:postData,
        success:success,
        error:error,
      });
    },
    checkFormat:function(res){
      var data = false;
      if ( typeof res == 'object' ) {
        data = res;
      } else if ( typeof res == 'string' ) {
        try{
          data = JSON.parse(res);
        } catch(e) {
          $.tipsBox.show(e);
          data = false;
        }
      } else {
        data = false
      }
      return data;
    }
  };

  $.ajaxList = ajaxList;

})(_$$_)