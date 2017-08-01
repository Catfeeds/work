'use static';

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

  /* 日期 */
  function today(y){
    var y = y || 0;
    y = Number(y);
    var d = new Date(new Date().getTime() + y * (365*24*60*60*1000));
    return d.format('yyyy-MM-dd');
  }

  var _today = today(0);
  var _oneYear = today(1);

  /* 组件初始化 */
  var weekList = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];

  /* selecter修改 */
  var mySelecter = Object.create(DIYselecter);
  mySelecter.domList_init = function(){
    var that = this;
    $.each(this.domList,function(index,item){
      item.__selecter__index__ = index;
      item.__selecter__delete__ = function(){
        that.domList.splice(this.__selecter__index__,1);
        that.domList_init();
      }
    });
  }
  mySelecter.setDom = function(dom){
    if(this.isArray(dom)){
      this.domList = this.domList.concat(dom)
    }else if(typeof dom === 'object'){
      this.domList.push(dom)
    }
    this.domList_init();
  }

  /* daterangepicker参数 */
  var daterangepicker_locale = {
      locale:{
          applyLabel: '确认',
          cancelLabel: '取消',
          fromLabel: '从',
          toLabel: '到',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek:["日","一","二","三","四","五","六"],
          monthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
      }
  }

  function daterangepicker_callback (start, end, label) {
      var t1 = new Date(start.toString());
      var t2 = new Date(end.toString());
      var txt1 = t1.format('yyyy-MM-dd');
      var txt2 = t2.format('yyyy-MM-dd');
      this.element.parent().find('span').eq(0).html(txt1);
      this.element.parent().find('span').eq(1).html(txt2);
  }
  
  /* 固定场组件 */
  var fixedCourt = {
    data:{},
    addData:{
      list:[],
      initList:function(){
        $.each(this.list,function(index,item){
          item.__index__ = index;
        });
      }
    },
    fetchData:{},
    $dom:$('#fixedCountBox'),
    $close:$('#fixedCountBox .close'),
    $tips:$('#fixedTips'),
    $fixedCourtBoxCheck:$('#fixedCourtBoxCheck'),
    $fixedCourtBoxSave:$('#fixedCourtBoxSave'),
    $fixedCourtBoxCancel:$('#fixedCourtBoxCancel'),
    $fixedCourtTbody:$('#fixedCourtTbody'),
    $fixedCountBoxAddItem:$('#fixedCountBoxAddItem'),
    $fixedCountBoxInfo:$('#fixedCountBoxInfo'),
    memberName:'',
    memberPhone:'',
    memberNumber:'',
    memberCardId:'',
    memberCardNo:'',
    cat_id:'',
    show:function(opt,callback){
      showBC('blackCoverForFixedCourt');
      addZindex(this.$dom);
      this.data = {};
      this.callback = callback || function(){};
      for( var i = 0 ; i < this.addData.list.length ; ){
        this.addData.list[i] && this.addData.list[i].__delete__();
      }

      this.addData.list = [];
      this.$fixedCountBoxInfo.html('');
      this.memberName = opt.name || '';
      this.memberPhone = opt.phone || '';
      this.memberNumber = opt.number || '';
      this.memberCardId = opt.card_id || '';
      this.memberCardNo = opt.card_no || '';
      this.cat_id = opt.cat_id || '';
      this.type = opt.type || 'add';
      this.checkListIsEmpty();
      this.changeFetchData();
      this.fetch();
    },
    checkListIsEmpty:function(){
      if ( this.addData.list.length > 0 ) {
        this.$tips.addClass('hide');
      } else {
        this.$tips.removeClass('hide');
      }
    },
    changeFetchData:function(){
      if ( this.type === 'add' ) {
        this.fetchData = {
          // cat_id:this.cat_id,
          is_add:1
          // phone: this.memberPhone
          // card_id: this.memberCardId
        }
      } else if ( this.type === 'edit' ) {
        
        if ( this.memberCardId !== '') {
          this.fetchData = {
            card_id: this.memberCardId,
          }
        } else {
          this.fetchData = {
            card_no: this.memberCardNo,
          }
        }
        
      }
    },
    changeText:function(){
      this.$fixedCountBoxInfo.html("<span>会员姓名：<b>"+ this.memberName +"</b></span>"
        +"<span> | 手机号：<b>"+ this.memberPhone +"</b></span>"
        +"<span> | 会员卡号：<b>"+ this.memberNumber +"</b></span>");
    },
    hide:function(){
      hideBC('blackCoverForFixedCourt');
      this.$dom.addClass('hide');
    },
    init:function(){
      var that = this;
      this.$close.click(function(){
        that.hide();
      });
      this.$fixedCourtBoxCancel.click(function(){
        that.hide();
      });
      this.$fixedCountBoxAddItem.click(function(){
        that.addItem(1,[{}],that.data.cat_list[0].cat_id);
      });
      this.$fixedCourtBoxCheck.click(function(){
        that.checkLockedCourt(function(res){
          if ( res && res.msg ) tipsBox.show(res.msg);
        },function(){
          tipsBox.show('没有冲突');
        });
      });
      this.$fixedCourtBoxSave.click(function(){
        var conflictCB = function(){
          // commonDialogBox.show({
          //   title:'固定场保存',
          //   desc:'固定场中有被占用的场地，确认添加剩余场地为该会员的固定场吗？',
          //   sureText:'确认保存'
          // },function(){
          //   that.save();
          // });
          tipsBox.show('固定场中有被占用的场地，请处理后重试');
        }
        var noConflictCB = function(){
          that.save();
        }
        that.checkLockedCourt(conflictCB,noConflictCB);
      });
    },
    save:function(){
      var fixedCourtData = this.getFixedCourtData().data;
      var hasEmptyValue = this.getFixedCourtData().hasEmptyValue;
      if ( hasEmptyValue ) return tipsBox.show('部分数据异常，请重选后重试操作');
      var that = this;
      var data = {
        name:this.memberName,
        phone:this.memberPhone,
        data:fixedCourtData,
        card_id:this.memberCardId
      }
      // if ( this.memberCardId != '' ) data.card_id = this.memberCardId;
      var successCallback = function(res){
        loadingBox.hide();
        if ( res.status == '0000' ) {
          tipsBox.show('保存成功');
          that.hide();
          // console.log(that.callback);
          if ( typeof that.callback == 'function' ) that.callback(res);
          // list.getList();
        } else {
          tipsBox.show(res.msg);
        }
      }
      var errorCallback = function(res){
        loadingBox.hide();
        tipsBox.show('网络错误');
      }

      if ( this.type == 'edit' ) {

        loadingBox.show();
        editLockedCourtAjax(data,successCallback,errorCallback);
      } else if ( this.type == 'add' ) {
        loadingBox.show();
        data.card_no = this.memberNumber;
        addUsercardAjax(data,successCallback,errorCallback);
      }

    },
    cleanConflictTips:function(){
      this.$fixedCourtTbody.find('.dangerous').addClass('hide');
    },
    checkLockedCourt:function(conflictCB,noConflictCB){
      this.cleanConflictTips();
      var conflictCB = conflictCB || function(){};
      var noConflictCB = noConflictCB || function(){};
      var that = this ;
      var fixedCourtData = JSON.parse(this.getFixedCourtData().data);
      var hasEmptyValue = this.getFixedCourtData().hasEmptyValue;
      if ( hasEmptyValue ) return tipsBox.show('部分数据异常，请重选后重试操作');
      // console.log(fixedCourtData);
      var lock_court_list = this.data.lock_court_list;
      var checkLockArray = [];
      var hasIDArray = [];
      $.each(fixedCourtData,function(index,item){
        if ( item.id === undefined ) {
          checkLockArray.push(item);
        } else {
          hasIDArray.push(item);
        }
      });

      var compareListOut = [
        {l:['cat_id'],r:['cat_id']},
        {l:['end_time'],r:['end_time']},
        {l:['start_time'],r:['start_time']},
      ];

      var compareListIn = [
        {l:['course_id'],r:['course_id']},
        {l:['end_hour'],r:['end_hour']},
        {l:['week'],r:['week']},
        {l:['start_hour'],r:['start_hour']},
      ];

      $.each(hasIDArray,function(index,item){
        $.each(lock_court_list,function(i,it){
          if ( item.id === it.id ) {
            if ( !that.compare(item,it,compareListOut) ) return checkLockArray.push(item);
            if ( !compareCircle(item.lock_court_list,it.court_list,compareListIn) ) return checkLockArray.push(item);
          }
        });
      });

      function compareCircle(lArray,rArray,compareList){
        var newAdd = 0;
        var count = 0;
        var length = 0;
        $.each(lArray,function(index,item){
          var index = item.check_id.split(',')[2];
          if ( index == '-1' )  return newAdd++;
          $.each(rArray,function(i,it){
            if ( index == i ) {
              length ++;
              if (!that.compare(item,it,compareList)) return count++;
            }
          });
        });
        if ( newAdd > 0 ) return false;
        if ( count > 0 ) return false;
        if ( length !== rArray.length ) return false;
        return true;
      } 

      if ( checkLockArray.length > 0 ) {
        loadingBox.show();
        var data = {data:JSON.stringify(checkLockArray)};
       
        var successCallback = function(res){
          loadingBox.hide();
          if ( res.status == '0000' ) {
            if ( typeof noConflictCB == 'function' ) noConflictCB(res);
          } else {
            that.showConflict(res.data);
            if ( typeof conflictCB == 'function' ) conflictCB(res);
          }
        }
        var errorCallback = function(res){
          loadingBox.hide();
          tipsBox.show('网络错误');
        }
        checkLockedCourtAjax(data,successCallback,errorCallback);
      } else {
        tipsBox.show('没有修改');
      }
    },
    showConflict:function(data){
      var that = this;
      this.$fixedCourtTbody.find('.dangerous').addClass('hide').find('ul').html('');
      var obj = {};
      $.each(data,function(index,item){
        var name = item.customer;
        var s = item.start_time;
        var e = item.end_time;
        //item.lock_court_list.length > 0 && $.each(item.lock_court_list,function(i,it){
        //  if ( !obj[it.check_id] ) obj[it.check_id] = [];
        //  obj[it.check_id].push(that.createConflictDom(name,s,e));
        //});
        //按新的结构显示冲突信息 chenchao 2017-01-23
        if ( !obj[item.check_id] ) obj[item.check_id] = [];
        obj[item.check_id].push(that.createConflictDom(name,s,e));
        // that.$fixedCourtTbody.find('.td').eq(item.check_id.split(',')[0]).find('.dangerous').eq(item.check_id.split(',')[1]).removeClass('hide').find('ul').append(li);
      });
      // debugger;
      $.each(obj,function(name,item){
        $.each(item,function(index,it){
          that.$fixedCourtTbody.find('.tr').eq(name.split(',')[0]).find("p[data-index]").eq(Number(name.split(',')[1])).find('.dangerous').removeClass('hide').find('ul').append(it);
        });
      });
    },
    createConflictDom:function(name,s,e){
      var li = document.createElement('li');
      var s =  new Date(Number(s)*1000).format('yyyy-MM-dd');
      if (s != e){
        var e =  new Date(Number(e)*1000).format('yyyy-MM-dd');
        var _html = "<div class='left'>"+ s +"~"+ e +"</div>"+"<div class='right'>"+ name +"</div>";
      } else {
        var _html = "<div class='left'>"+ s +"</div>"+"<div class='right'>"+ name +"</div>";
      }
      
      li.innerHTML = _html;
      return li;
    },
    compare:function(left,right,compareList){
      var count = 0;

      for (var i = 0 ; i < compareList.length ; i ++ ) {

        var l = getAttr(left,compareList[i].l);
        var r = getAttr(right,compareList[i].r);

        if ( l === r ) count ++;

      }

      if ( count === compareList.length ) {
        return true;
      } else {
        return false;
      }

      function getAttr(obj,nameArray){
        var obj = obj;
        for ( var i = 0 ; i < nameArray.length ; i ++ ) {
          if ( obj[nameArray[i]] ) {
            obj = obj[nameArray[i]] ;
          }
        }
        return obj;
      }

    },
    getFixedCourtData:function(){
      var normal_color = 'inherit';
      var alert_color = '#FF5722';
      var data = [];
      var hasEmptyValue = false;
      $.each(this.$fixedCourtTbody.find('.tr'),function(index,item){

        var obj = {
          cat_id:$(item).find('select[name=cat]').val(),
          start_time:$(item).find('.td-time-select').eq(0).html(),
          end_time:$(item).find('.td-time-select').eq(1).html(),
          lock_court_list:[]
        }

        obj["lock_cycle"] = 1;

        if ( $(item).find('a').attr('data-delete') ) {
          obj.id = $(item).find('a').attr('data-delete');
        }

        $.each($(item).find('p[data-index]'),function(i,it){

          var week = $(it).find('select[name=week]');
          var start_hour = $(it).find('select[name=start]');
          var end_hour = $(it).find('select[name=end]');
          var course_id = $(it).find('select[name=course]');
          var _list = [week, start_hour, end_hour, course_id];

          $.each(_list,function(j,t){
            checkEmptyValue(t);
          });

          var court_list_item = {
            week:week.val(),
            start_hour:start_hour.val(),
            end_hour:end_hour.val(),
            course_id:course_id.val(),
            check_id:index + ',' + i + ',' + $(it).attr('data-index'),
          }
          obj.lock_court_list.push(court_list_item);
        });

        data.push(obj);

      });

      function checkEmptyValue($dom){
        $dom[0].action.setColor(normal_color);
        var value = $dom.val();
        if ( value == null || value == '' ) {
          hasEmptyValue = true;
          $dom[0].action.setColor(alert_color);
        }
      }

      return {data:JSON.stringify(data),hasEmptyValue:hasEmptyValue};
    },
    addItem:function(type,data,cat_id){
      var that = this;
      var item = this.createItem(type,data,cat_id);
      this.addData.list.push(item);
      this.checkListIsEmpty();
      item.__delete__ = function(){
        that.addData.list.splice(this.__index__,1);
        that.addData.initList();
        $(this).find('select').each(function(index,item){
          item.__selecter__delete__();
          $(item).remove();
        });
        $(this).find('input[daterangepicker]').data('daterangepicker').remove();
        $(this).remove();
        that.checkListIsEmpty();
      };

      this.addData.initList();
      this.$fixedCourtTbody.prepend(item);

      $(item).find('input[daterangepicker]').daterangepicker( daterangepicker_locale , daterangepicker_callback);
      mySelecter.init(Array.prototype.slice.call($(item).find('select')));

      $(item).find('a').click(function(){
        if ( this.getAttribute('data-delete') ) {
          var that = this;
          var successCallback = function(res){
            loadingBox.hide();
            if ( res.status == '0000' ) {
              tipsBox.show('删除成功');
              item.__delete__();
            } else {
              tipsBox.show(res.msg);
            }
          }
          var errorCallback = function(res){
            loadingBox.hide();
            tipsBox.show('网络错误');
          }

          commonDialogBox.show({
            title:'删除固定场',
            desc:'删除该固定场后，该场地将放出，确定删除吗？',
            sureText:'确认删除'
          },function(){
            loadingBox.show();
            lockDeleteAjax({lock_id:that.getAttribute('data-delete')},successCallback,errorCallback);
          });

        } else {
          item.__delete__();
        }
      });

      return item;
    },
    createItem:function(type,data,cat_id){
      var TR = document.createElement('li');
      TR.className = 'tr flex-box';
        var catTD = this.createCatTD();
        var timeTD = this.createTimeTD();
        var mainTD = this.createMainTD(data,cat_id);
        var deleteTD = this.createDeleteTD();
      TR.appendChild(catTD);
      TR.appendChild(timeTD);
      TR.appendChild(mainTD);
      TR.appendChild(deleteTD);
      if ( type === 1 ) {
        TR.setAttribute('data-new-add','1');
      }
      $(catTD).find('select').change(function(){
        var that = this;
        $(this).find('option').each(function(index,item){
          if ( item.value ===  that.value ) {
            var html = '';
            $.each(item.course_list,function(index,item){
              html += "<option value="+ item.course_id +">"+ item.course_name +"</option>";
            });
            $(mainTD).find('select[name="course"]').html(html);
            $(mainTD).find('select[name="week"]').change();
            $(mainTD).find('select[name="course"]')[0].action.reset();
          }
        });
      });
      return TR;
    },
    createCatTD:function(){
      var that = this;
      var catTD = document.createElement('div');
      catTD.className = 'td-cat';
      var select = document.createElement('select');
      select.name = 'cat';
      if ( this.data.cat_list && this.data.cat_list[0] ) {
        select.value = this.data.cat_list[0].cat_id;
      } 
      var html = [];
      if ( this.data.cat_list ) {
        $.each(this.data.cat_list,function(index,item){
          var option = document.createElement('option');
          option.value = item.cat_id;
          option.innerHTML = item.cat_name;
          option.course_list = that.data.course_list[item.cat_id];
          html.push(option); 
        });
      }
      $.each(html,function(index,item){
        select.appendChild(item);
      });
      select.valueIndex = function(){
        var index = '';
        $.each($(select).find('option'),function(i,it){
          if ( it.value === select.value ) index = i;
        });
        return index;
      }
      catTD.appendChild(select);
      return catTD;
    },
    createTimeTD:function(){
      var timeTD = document.createElement('div');
      timeTD.className = 'td';
      timeTD.className = "td-time td-select";
      timeTD.innerHTML = "<span class='td-time-select'>" + _today + "</span>"
                          +"<em>至</em>"
                          +"<span class='td-time-select'>"+ _oneYear +"</span>"
                          +"<input name='time' daterangepicker type='text' value='"+ _today +" - "+ _oneYear +"' >";
      return timeTD;
    },
    createP:function(index,cat_id){
      var that = this;
      var P = document.createElement('p');
      P.setAttribute('data-index',index);
       var week = this.createWeek(cat_id);
       var start = this.createStartOrEnd('start',cat_id);
       var z = document.createElement('em');
       z.innerHTML = '至';
       var end = this.createStartOrEnd('end',cat_id);
       var court = this.createCourt(cat_id);
       var dangerous = document.createElement('div');
       dangerous.className = 'dangerous hide';
       dangerous.innerHTML = "<div class='hover-tips'>"
                                +"<div class='triangle'></div>"
                                +"<h4>场地占用</h4>"
                                +"<ul>"
                                +"</ul>"
                              +"</div>";
       var del = document.createElement('em');
       del.className = 'del';
       del.innerHTML = '删除';
      P.appendChild(week);
      P.appendChild(start);
      P.appendChild(z);
      P.appendChild(end);
      P.appendChild(court);
      P.appendChild(dangerous);
      P.appendChild(del);

      $(del).click(function(){
        var $mainTD = $(P).parent();
        $(P).find('select').each(function(index,item){
          item.__selecter__delete__();
        });
        $(P).remove();

      });

      $(week).change(function(){
        var catIdValue = $(this).parent().parent().parent().find('select[name=cat]').val();
        start.init(that.data,catIdValue,$(week).val());
        end.init(that.data,catIdValue,$(week).val());
        start.action && start.action.reset();
        end.action && end.action.reset();
      });

      $(start).change(function(){
        var index = null;
        $(end).find('option').each(function(i,item){
          $(item).removeAttr('selected');
          $(item).removeAttr('disabled');
          if ( item.value == start.value ) {
            index = i;
          }
        });
        $(end).find('option').each(function(i,item){
          if ( i <= index ) {
            $(item).attr('disabled','');
          }
          if ( index + 1 === $(end).find('option').length - 1  && i === $(end).find('option').length - 1 ) {
            $(item).attr('selected','');
            $(end).val(item.value);
          } else if ( i === index + 2 ) {
            $(item).attr('selected','');
            $(end).val(item.value);
          }
        });
        if ( end.action ) end.action.reset();
      });
      return P;
    },
    createMainTD:function(data,cat_id){
      var that = this;
      var mainTD = document.createElement('div');
      mainTD.className = 'td-main td-select text-align-left';
      $.each(data,function(index,item){
        var P = that.createP(index,cat_id);
        mainTD.appendChild(P);
      });
      var addPBtn = this.createAddPBtn();

      mainTD.appendChild(addPBtn);
      return mainTD;
    },
    createAddPBtn:function(){
      var that = this;
      var p = document.createElement('p');
      var btn = document.createElement('span')
      btn.className = 'add-p';
      btn.innerHTML = '+';
      p.appendChild(btn);
      $(btn).click(function(){
        var cat_id = $(this).parent().parent().parent().parent().find('select[name=cat]').val();
        var addP = that.createP('-1',cat_id);
        mySelecter.init(Array.prototype.slice.call($(addP).find('select')));
        $(this).parent().before(addP);

      });
      return p;
    },
    createStartOrEnd:function(str,cat_id){
      var catID = cat_id || this.data.cat_list[0].cat_id;
      var select = document.createElement('select');
      select.name = str;
      select.init = function(data,catID,weekValue){
        var d = data.time_list[catID][weekValue];
        var html = '';
        select.innerHTML = html;
        var time_list = d.split(',');
        $.each(time_list,function(index,item){
          if ( index === 0 && select.name === 'start' ) {
            var option = document.createElement('option');
            option.setAttribute('value',item);
            option.setAttribute('selected','');
            option.innerHTML = item;
            select.appendChild(option);
            // html += "<option value="+ item +" selected>"+ item +"</option>";
            select.value = item;
          } else if ( select.name === 'end' && ( (time_list.length === 2 && index === 1) || (time_list.length > 2 && index === 2) )) {
            var option = document.createElement('option');
            option.setAttribute('value',item);
            option.setAttribute('selected','');
            option.innerHTML = item;
            select.appendChild(option);
            // html += "<option value="+ item +" selected>"+ item +"</option>";
            select.value = item;
          } else if ( index < 1 && select.name === 'end' ) {
            var option = document.createElement('option');
            option.setAttribute('value',item);
            option.setAttribute('disabled','');
            option.innerHTML = item;
            select.appendChild(option);
            // html += "<option value="+ item +" disabled>"+ item +"</option>";
          } else if ( select.name === 'start' && index === time_list.length - 1 )  {
            var option = document.createElement('option');
            option.setAttribute('value',item);
            option.setAttribute('disabled','');
            option.innerHTML = item;
            select.appendChild(option);
            // html += "<option value="+ item +" disabled>"+ item +"</option>";
          } else  {
            var option = document.createElement('option');
            option.setAttribute('value',item);
            option.innerHTML = item;
            select.appendChild(option);
            // html += "<option value="+ item +">"+ item +"</option>";
          }
        });
        // select.innerHTML = html;
      }
      select.init(this.data,catID,0);
      return select;
    },
    createCourt:function(cat_id){
      var select = document.createElement('select');
      select.setAttribute('name','course');
      var catID = cat_id || this.data.cat_list[0].cat_id;
      // var html = '';
      // if( this.data.cat_list && this.data.cat_list[0] ) {
        $.each(this.data.course_list[catID],function(index,item){
          var option = document.createElement('option');
          option.setAttribute('value',item.course_id);
          option.innerHTML = item.course_name;
          select.appendChild(option);
          // html += "<option value="+ item.course_id +">"+ item.course_name +"</option>";
        });
      // }
      // select.innerHTML = html;
      return select;
    },
    createWeek:function(cat_id){
      var select = document.createElement('select');
      select.name = 'week';
      var catID = cat_id || this.data.cat_list[0].cat_id;
      // if ( this.data.cat_list && this.data.cat_list[0] ) {
        $.each(this.data.time_list[catID],function(index,item){
          if ( index >= 7 ) {
            return false;
          } else {
            var option = document.createElement('option');
            option.setAttribute('data-time_list',item);
            option.setAttribute('value',index);
            option.innerHTML = weekList[index];
            select.appendChild(option);
            // html += "<option data-time_list='"+ item +"' value='"+ index +"' selected>"+ weekList[index] +"</option>";
          } 
        });
      // }
      select.setAttribute('value','0');
      return select;
    },
    createDeleteTD:function(){
      var deleteTD = document.createElement('div');
      deleteTD.className = 'td-del';
      deleteTD.innerHTML = "<a>删除</a>";
      return deleteTD;
    },
    createView:function(){
      this.changeText();
    },
    addLockCourtList:function(){
      var that = this;
      var data = this.data.lock_court_list;
      var cat_id = this.data.cat_list[0].cat_id;
      $.each( data , function(index,item){
        // type = 0 初始数据创建的（非按钮触发的）
        var type = 0;
        // var court_list0 = item.court_list[0] || {};
        var court_list = item.court_list || [];
        var addItem = that.addItem(type,court_list,cat_id);
        // 项目
        $(addItem).find('select[name=cat]').val(item.cat_id)[0].action.change();
        // 场地 周 起止时间
        $.each(court_list,function(i,it){
          if ( it ) {
            $(addItem).find("p[data-index="+i+"]").find('select[name=course]').val(it.course_id)[0].action.change();
            $(addItem).find("p[data-index="+i+"]").find('select[name=week]').val(it.week)[0].action.change();
            $(addItem).find("p[data-index="+i+"]").find('select[name=start]').val(it.start_hour)[0].action.change();
            $(addItem).find("p[data-index="+i+"]").find('select[name=end]').val(it.end_hour)[0].action.change();
          }
        });
        // 周期
        $(addItem).find('.td-time-select').eq(0).html(item.start_time);
        $(addItem).find('.td-time-select').eq(1).html(item.end_time);
        $(addItem).find('input[daterangepicker]').val(item.start_time + ' - ' + item.end_time);
        $(addItem).find('input[daterangepicker]').data('daterangepicker').setStartDate(item.start_time);
        $(addItem).find('input[daterangepicker]').data('daterangepicker').setEndDate(item.end_time);
        // 删除按钮
        $(addItem).find('a').attr('data-delete',item.id);
      });
    },
    fetch:function(){
      var that = this;
      loadingBox.show();
      var data = this.fetchData;
      var errorCallback = function(res){
        loadingBox.hide();
        that.hide();
        tipsBox.show('网络错误');
      }
      var successCallback = function(res){
        loadingBox.hide();
        if ( res.status === '0000' ) {
          that.$dom.removeClass('hide');
          that.data = res.data;
          if ( res.data.card_id && res.data.card_id !== '' ) that.memberCardId = res.data.card_id;
          // console.log(res.data);
          that.createView();
          if ( res.data.lock_court_list && res.data.lock_court_list[0] ) {
            that.addLockCourtList();
          } 
        } else {
          that.hide();
          tipsBox.show(res.msg);
        }
      }
      getLockedCourtConfigAjax(data,successCallback,errorCallback);
    }
  }

  var getLockedCourtConfigURL = '/fixed/getLockedCourtConfig';
  function getLockedCourtConfigAjax(data,successCallback,errorCallback){
    $.ajax({
      type:'post',
      url:getLockedCourtConfigURL,
      data:data,
      success:successCallback,
      error:errorCallback
    });
  }

  var editLockedCourtURL = '/fixed/editLockedCourt';
  function editLockedCourtAjax(data,successCallback,errorCallback){
    $.ajax({
      type:'post',
      url:editLockedCourtURL,
      data:data,
      success:successCallback,
      error:errorCallback
    });
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

  var checkLockedCourtURL = '/fixed/checkLockedCourt';
  function checkLockedCourtAjax(data,successCallback,errorCallback){
    $.ajax({
      type:'post',
      url:checkLockedCourtURL,
      data:data,
      success:successCallback,
      error:errorCallback
    });
  }

  var delLockedCourtURL = '/fixed/delLockedCourt';
  function lockDeleteAjax(data,successCallback,errorCallback){
    $.ajax({
      type:'post',
      url:delLockedCourtURL,
      data:data,
      success:successCallback,
      error:errorCallback
    });
  }


  window.$fixedCourt = fixedCourt;
});