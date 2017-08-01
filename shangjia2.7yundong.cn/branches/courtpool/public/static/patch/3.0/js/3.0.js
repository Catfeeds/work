'use strict';
$(function () {

/* tips box */
var tipsBox = window.$tipsBox;
/* loadingbox */
var loadingBox = window.$loadingBox;
/* 通用对话框 */
var commonDialogBox = window.$commonDialogBox;

var addZindex = window.$addZindex;
/* 背景遮罩 */
var showBC = window.$showBC;
var hideBC = window.$hideBC;

var fixedCourt = window.$fixedCourt;

fixedCourt.init();

/* 请求接口URL */

var getListURL = '/usercard/getList';
var delURL = '/usercard/del';
var editURL = '/usercard/edit';
var checkURL = '/usercard/check';
var importURL = '/usercard/import';


// page
var nm_page_obj = Object.create(NMPAGE);

function ajaxCheckURL(data,successCallback,errorCallback) {
  $.ajax({
    type:'post',
    url:checkURL,
    data:data,
    success:successCallback,
    error:errorCallback,
  });
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

/* 页面加载完毕请求默认数据 */

var list = {
  data:{
    keyword:'', // 关键词（模糊查询卡号，手机，姓名）
    page:1, // 页码，默认为1，第一页
    page_size:20, // 每页记录数，默认为20
    sort_key:'card_number', // 排序字段，默认为id, 可选：
    sort_value:'DESC' // 排序方式，升序：“ASC”，降序“DESC”，默认DESC
  },
  $tips:$('#memberDataTableTips'),
  $dom:$('#memberDataTable'),
  $page:$('#pagination'),
  init:function(){
    this.getList();
  },
  /* 获取会员卡信息列表并set page */ 
  getList:function(){
    var that = this;
    loadingBox.show();
    var errorCallback = function(res){
      loadingBox.hide();
      tipsBox.show('网络错误');
    }
    var successCallback = function(res){
      if (res.status === '0000') {
        loadingBox.hide();
        if ( res.data.list.length === 0 && that.data.page > 1 ) {
          that.data.page --;
          that.getList();
          return false;
        }
        that.createMemberTable(res.data.list,that.data.sort_key,that.data.sort_value);

        var opt = {
          dom:$('#pagination')[0],
          totlePage:res.data.page_count,
          currentPage:res.data.page,
          callback:function(num){
            opt.currentPage = num;
            that.data.page = num;
            ajaxGetListURL(that.data,successCallback,errorCallback);
            nm_page_obj.setup(opt);
          },
        }

        nm_page_obj.setup(opt);

      } else {
        loadingBox.hide();
        tipsBox.show(res.msg);
      }
    }

    ajaxGetListURL(this.data,successCallback,errorCallback);
  },
  /* 创建会员卡table */
  createMemberTable:function(listData,sort_key,sort_value){
    if ( listData.length === 0 ) {
      this.$tips.removeClass('hide');
      this.$dom.addClass('hide');
      this.$page.addClass('hide');
    } else {
      this.$tips.addClass('hide');
      this.$dom.removeClass('hide');
      this.$page.removeClass('hide');
    }
    var that = this;
    this.$dom.html('');
    var tableDiv = document.createElement('div');
    tableDiv.className = 'table';
    var table = document.createElement('table');
    table.className = 'table table-bordered';
    tableDiv.appendChild(table);
    var sortNumberClass = 'sort-up';
    var sortNumberValue = 'DESC';
    var sortNameClass = 'sort-up';
    var sortNameValue = 'DESC';
    var sortPhoneClass = 'sort-up';
    var sortPhoneValue = 'DESC';
    if ( sort_key === 'card_number' && sort_value === 'ASC') {
      sortNumberClass = 'sort-down';
      sortNumberValue = sort_value;
    }
    if ( sort_key === 'name' && sort_value === 'ASC') {
      sortNameClass = 'sort-down';
      sortNameValue = sort_value;
    }
    if ( sort_key === 'phone' && sort_value === 'ASC') {
      sortPhoneClass = 'sort-down';
      sortPhoneValue = sort_value;
    }
    var tableHead = 
      "<thead class='sp'>"
          +"<tr>"
            +"<th width='160'>会员卡号<i id='sortNumber' data-sort_key='card_number' data-sort_value='"+ sortNumberValue +"'  class='sort "+ sortNumberClass +"'></i></th>"
            +"<th width='210'>会员姓名<i id='sortName' data-sort_key='name' data-sort_value='"+ sortNameValue +"' class='sort "+ sortNameClass +"'></i></th>"
            +"<th width='250'>手机号码<i id='sortPhone' data-sort_key='phone' data-sort_value='"+ sortPhoneValue +"' class='sort "+ sortPhoneClass +"'></i></th>"
            +"<th width='300'>操作</th>"
          +"</tr>"
        +"</thead>"
      +"<tbody>";
    var tableFoot = "</tbody>";
    var tableBody = "";

    $.each(listData,function(index,item){
      var html = 
        "<tr>"
          +"<td>"+String(item.card_number)+"</td>"
          +"<td>"+item.name+"</td>"
          +"<td>"+item.phone+"</td>"
          +"<td>"
            +"<span class='css-table-inline-btn js-fixed-booking'"
            +" data-phone='"+ item.phone +"' " 
            +" data-name='"+ item.name +"' " 
            +" data-card_number='"+ item.card_number +"' " 
            +" data-card_id='"+ item.id +"' " 
            +">固定场</span>"
            +"<span class='css-table-inline-btn js-edit'" 
            +" data-card_id='"+ item.id +"' "
            +" data-name='"+ item.name +"' "
            +" data-phone='"+ item.phone +"' "
            +" data-card_number='"+ item.card_number +"' "
            +">         编辑  </span>"
            +"<span class='css-table-inline-btn js-delete' data-card_id='"+ item.id +"'>       删除  </span>"
          +"</td>"
        +"</tr>";
        tableBody += html;
    });

    var html = tableHead + tableBody + tableFoot;
    $(table).html(html);

    $(table).appendTo(this.$dom);

    // 绑定事件
    $('#sortNumber').click(function () {
      that.sortGetListDataAjax(this);
    });
    $('#sortName').click(function () {
      that.sortGetListDataAjax(this);
    });
    $('#sortPhone').click(function () {
      that.sortGetListDataAjax(this);
    });

    $('#memberDataTable .js-fixed-booking').click(function(){
      that.fixedCourtFn(this);
    });
    $('#memberDataTable .js-edit').click(function(){
      that.editFn(this);
    });
    $('#memberDataTable .js-delete').click(function(){
      that.deteleFn(this);
    });
  },
  /* 改变排序并重新拉取信息 */
  sortGetListDataAjax:function(dom){
    changeSortValue(dom);
    this.data.sort_key = dom.getAttribute('data-sort_key');
    this.data.sort_value = dom.getAttribute('data-sort_value');
    this.data.page = 1;
    this.getList();

    function changeSortValue(dom){
      if ( dom.getAttribute('data-sort_value') === 'ASC' ) {
        dom.setAttribute('data-sort_value','DESC');
      } else {
        dom.setAttribute('data-sort_value','ASC');
      }
    }
  },
  /* 显示固定场模块 */
  fixedCourtFn:function(dom){
    fixedCourt.show({
      type:'edit',
      cat_id:1,
      phone:dom.getAttribute('data-phone'),
      name:dom.getAttribute('data-name'),
      number:dom.getAttribute('data-card_number'),
      card_id:dom.getAttribute('data-card_id'),
    });
  },
  /* 显示会员信息编辑模块 */
  editFn:function(dom){
    memberEdit.show({
      type:'edit',
      card_id:dom.getAttribute('data-card_id'),
      number:dom.getAttribute('data-card_number'),
      name:dom.getAttribute('data-name'),
      phone:dom.getAttribute('data-phone')
    },function(obj){
      var data = {
        card_no:$.trim(obj.$memberNumber.val()),
        phone:$.trim(obj.$memberPhone.val()),
        name:$.trim(obj.$memberName.val()),
        card_id:obj.card_id
      }
      editAjax(data);
    });
  },
  /* 是否删除？ */
  deteleFn:function(dom){
    commonDialogBox.show({
      title:'删除会员',
      desc:'删除会员后，该会员各个卡号的所有固定场都将取消，确定删除吗？',
      sureText:'确认删除'
    },function(){
      deleteAjax(dom.getAttribute('data-card_id'));
    });
  }
}

// 初次拉取信息
list.init();
// window.list = list;

/* 修改会员卡信息组件 */

var memberEdit = {
  $dom:$('#memberEdit'),
  $memberNumber:$('#editMemberNumber'),
  $memberName:$('#editMemberName'),
  $memberPhone:$('#editMemberPhone'),
  $sureBtn:$('#editMemberSure'),
  $cancelBtn:$('#editMemberCancel'),
  $title:$('#memberEdit h2'),
  $showFixedCourtConfig:$('#showFixedCourtConfig'),
  list:list,
  card_id:0,
  type:'edit',
  disabled:false,
  callback:function(){},
  show:function(opt,fn){
    
    showBC('blackCoverForEdit');
    addZindex(this.$dom);
    this.type = opt.type || 'edit';
    this.$memberNumber.val(opt.number || '');
    this.$memberName.val(opt.name || '');
    this.$memberPhone.val(opt.phone || '');
    this.card_id = opt.card_id || 0;
    this.$dom.removeClass('hide');
    this.callback = fn || function(){};
    this.changeText();
    this.checkMember();
    this.checkNecessary();
  },
  checkBlank:function(dom){
    var value = $(dom).val();
    var noBlank = value.replace(/\s+/g,'');
    if ( value.indexOf(' ') !== -1 ) $(dom).val(noBlank);
  },
  checkNumber:function(dom){
    var value = $(dom).val();
    var last = value.substring(value.length - 1 , value.length);
    var noLast = value.substring(0,value.length - 1);
    var number = '1234567890';
    if ( number.indexOf(last) === -1 ) $(dom).val(noLast);
  },
  checkNecessary:function(){
    this.$dom.find('input[type]').each(function(index,item){
      if ( $.trim(this.value) === '' ) {
        $(this).parent().find('i.red').removeClass('hide');
      } else {
        $(this).parent().find('i.red').addClass('hide');
      }
    });
  },
  changeText:function(){
    if ( this.type === 'edit' ) {
      this.$title.html('编辑会员');
      this.$sureBtn.html('保存修改');
    } else if ( this.type === 'add' ) {
      this.$title.html('添加会员');
      this.$sureBtn.html('保存会员');
    }
  },
  hide:function(){
    hideBC('blackCoverForEdit');
    this.$dom.addClass('hide');
    this.$showFixedCourtConfig.addClass('hide');
  },
  init:function(){
    var that = this;
    var list = [this.$memberNumber,this.$memberPhone,this.$memberName];

    $.each(list,function(index,item){
      $(item).on('input propertychange',function(){
        if ( $(this).attr('data-type') === 'phone' ) that.checkNumber(this);
        that.checkBlank(this);
        that.checkNecessary();
        that.checkMember();
      });
    });

    this.$sureBtn.click(function(){
      if ( that.disabled ) return false;
      if ( typeof that.callback == 'function' ) {
        that.callback(that);
        // that.hide();
      }
    });

    this.$cancelBtn.click(function(){
      that.hide();
    });

    this.$showFixedCourtConfig.click(function(){
      loadingBox.show();
      var data = {
        card_no:that.$memberNumber.val()
      }
      var successCallback = function(res){
        if ( res.status === '-3' ) {
          loadingBox.hide();
          fixedCourt.show({
            type:that.type,
            number:that.$memberNumber.val(),
            cat_id:1,
            phone:that.$memberPhone.val(),
            name:that.$memberName.val()
          },function(){
            that.hide();
            that.list.getList();
          });
        } else if ( res.status === '0000' ) {
          loadingBox.hide();
          tipsBox.show('会员卡号已存在');
        } else {
          loadingBox.hide();
          tipsBox.show(res.msg);
        }
      }
      var errorCallback = function(res){
        loadingBox.hide();
        tipsBox.show('网络错误');
      }

      ajaxCheckURL(data,successCallback,errorCallback)
    });
  },
  checkMember:function(){

    if ( $.trim(this.$memberNumber.val()) == '' || !this.checkPhone($.trim(this.$memberPhone.val())) ) {
      this.$sureBtn.attr('disabled','');
      this.disabled = true;
      this.$showFixedCourtConfig.addClass('hide');
    } else {
      this.$sureBtn.removeAttr('disabled');
      this.disabled = false;
      if ( this.type === 'add' ) {
        this.$showFixedCourtConfig.removeClass('hide');
      }
    }
  },
  checkPhone:function(num){
    return !!/1[23456789]{1}\d{9}$/.test(num);
  }
}

memberEdit.init();

/* 关键词搜索 */

$('#keywordSearchBtn').click(keywordGetListDataAjax);

function keywordGetListDataAjax(){
  var keyword = $('#keywordSearchInput').val();
  if ( list.data.keyword ===  $.trim(keyword) ) return false;
  list.data.keyword = $.trim(keyword);
  list.data.page = 1;
  list.getList();
}

/* 删除操作 */

function deleteAjax(id){
  loadingBox.show();
  $.ajax({
    url:delURL,
    type:'post',
    data:{card_id:id},
    success:function(res){
      if ( res.status === '0000' ) {
        loadingBox.hide();
        tipsBox.show('操作成功');
        list.getList();
      } else {
        loadingBox.hide();
        tipsBox.show(res.msg);
      }
    },
    error:function(res){
      loadingBox.hide();
      tipsBox.show(res);
    }
  })
}

/* 添加会员卡 */

$('#addMemberBtn').click(addMember);

function addMember(){
  memberEdit.show({
    type:'add'
  },function(obj){
    var data = {
      card_no:$.trim(obj.$memberNumber.val()),
      phone:$.trim(obj.$memberPhone.val()),
      name:$.trim(obj.$memberName.val()),
    }
    addAjax(data);
  });
}

function addAjax(data){
  loadingBox.show();
  var successCallback = function(res){
    loadingBox.hide();
    if ( res.status == '0000' ) {
      tipsBox.show('会员添加成功');
      list.getList();
      memberEdit.hide();
    } else if ( res.status === '-3' ) {
      tipsBox.show(res.msg);
    } else {
      tipsBox.show(res.msg);
      memberEdit.hide();
    }
  }
  var errorCallback = function(res){
    loadingBox.hide();
    tipsBox.show('网络错误');
    memberEdit.hide();
  }
  addUsercardAjax(data,successCallback,errorCallback);
}

var addURL = '/usercard/add';
function addUsercardAjax(data,successCallback,errorCallback){
  $.ajax({
    type:'post',
    url:addURL,
    data:data,
    success:successCallback,
    error:errorCallback
  });
}

/* 编辑操作 */

function editAjax(data){
  loadingBox.show();
  $.ajax({
    type:'post',
    url:editURL,
    data:data,
    success:function(res){
      loadingBox.hide();
      if ( res.status === '0000' ) {
          tipsBox.show('保存成功，会员资料将更新');
          list.getList();
          memberEdit.hide();
      } else if ( res.status === '-3' ) {
        tipsBox.show(res.msg);
      } else {
        tipsBox.show(res.msg);
        memberEdit.hide();
      }
    },
    error:function(res){
      loadingBox.hide();
      tipsBox.show('网络错误');
      memberEdit.hide();
    }
  });
}

/* 文件导入模块 */

var uploadComponent = {
  $dom:$('#uploadComponent'),
  $btnShowUploadComponent:$('#btnShowUploadComponent'),
  $btnCancelUploadComponent:$('#uploadComponent .btn-cancel'),
  $sureImprot:$('#sureImport'),
  $uploadFile:$('#uploadFile'),
  $uploadFileName:$('#uploadFileName'),
  $form:$('#uploadFileForm'),
  size:0,
  name:'',
  MAX_SIZE:1024*1024,
  show:function(){
    showBC('blackCoverForUpload');
    addZindex(this.$dom);
    this.$dom.removeClass('hide');
  },
  hide:function(){
    hideBC('blackCoverForUpload');
    this.$dom.addClass('hide');
  },
  lowDisplay:function(){
    $('label.pwd[for=uploadFile]').addClass('hide');
    $('#uploadFile').removeClass('hide');
    this.$sureImprot.removeAttr('disabled');
  },
  fileChange:function(input){
    if ( !input.files ) {
      this.lowDisplay();
      return false;
    }
    if ( input.files[0] && input.files[0].name ) {
      this.$sureImprot.removeAttr('disabled');
      this.$uploadFileName.val(input.files[0].name);
      this.name = input.files[0].name;
      this.size = input.files[0].size;
    } else {
      this.$sureImprot.attr('disabled','');
    }
  },
  checkType:function(){
    var nameArray = this.name.split('.');
    if ( this.size > this.MAX_SIZE ) {
      tipsBox.show('请上传小于1M的文件');
      return false;
    }
    if ( nameArray[nameArray.length - 1].toLocaleLowerCase() !== 'csv' ) {
      tipsBox.show('请上传csv文件');
      return false;
    }
    return true;
  },
  upload:function(){
    var that = this;
    loadingBox.show();
    
    var successCallback = function(res){
      loadingBox.hide();
      if ( res.status == '0000' ) {
        tipsBox.show('导入成功');
        list.getList();
        that.hide();
      } else {
        tipsBox.show(res.msg);
      }
    }
    var errorCallback = function(res){
      loadingBox.hide();
      tipsBox.show('网络错误');
    }

    if ( !!window.FormData ) {
    // if ( false ) {
      var data = new FormData(this.$form[0]);
      data.append('is_ajax', '1');
      importAjax(data,successCallback,errorCallback);
    } else {
      this.$form.submit();
      setTimeout(function(){
        loadingBox.hide();
      },1000);
    }
    
  },
  init:function(){
    var that = this;
    this.$btnShowUploadComponent.click(function(){
      that.show();
    });
    this.$btnCancelUploadComponent.click(function(){
      that.hide();
    });
    this.$uploadFile.change(function(){
      that.fileChange(this);
    });
    this.$sureImprot.click(function(){
      if ( this.hasAttribute('disabled') ) return false;
      if ( that.checkType() ) that.upload();
    });
  }
}
uploadComponent.init();

function importAjax(data,successCallback,errorCallback){
  $.ajax({
    type:'post',
    url:importURL,
    data:data,
    async: true,
    cache: false,
    contentType: false,
    processData: false,
    success:successCallback,
    error:errorCallback
  });
}

});
