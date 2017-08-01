'use static';

$(function() {
  
  var WEEK = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  var USER_RANGE = [6,7,8,9,10,11,12];

  var DEV = false;
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
  /* 绑定手机模块 */
  var bindPhoneBox = window.$bindPhoneBox;
  /* ajax列表模块 */
  var ajax = window.$ajaxlist;

  // page
  var nm_page_obj = Object.create(NMPAGE);
  
  var checkFormat = window.$ajaxlist.checkFormat;
  // commonDialogBox.show({
  //   title:'用户拿取商品后，请点击确定',
  //   desc:'desc',
  //   sureText:'确认'
  // },function(){
  //   main.getCourtJoinList();
  // });
  

  function error(res){
    loadingBox.hide();
    alert('网络错误');
  }

  var main = {
    init:function(){

      hashRouter.init();

      addCourtJoin.init();

      addCourtJoinBtn.init();

      courtJoinList.init();

    }
  };

  var hashRouter = {
    data:null,
    init:function(){
      this.getHashAll();
    },
    getHashAll:function(){
      var hash = window.location.hash.split('#')[1];
      if ( !!hash ) this.data = getInformation(hash);
    },
    getHash:function(key){
      this.getHashAll();
      var value = null;
      if ( this.data ) value = this.data[key];
      return value;
    },
    setHash:function(obj,str){
      // console.log('setHash_'+str);
      this.getHashAll();
      var that = this;
      if ( !this.data ) this.data = {};
      $.each(obj, function(key, value){
        that.data[key] = value;
      });
      
      var hash = '';
      // console.log(this.data);
      var i = 0 ;
      $.each(this.data, function(key, value){
        if ( i === 0 ) {
          hash += key + '=' + value;
        } else {
          hash += '&' + key + '=' + value;
        }
        i ++;
      });
      window.__setHash__ = true;
      window.location.hash = hash;
    }
  }

  function getInformation(hash){
    // console.log('hash');
    var info = {};
    var hash = String(hash);
    var temp = hash.split('&');
    if (temp) {
      for (var i = 0; i < temp.length; i++) {
          info[temp[i].split('=')[0]] = temp[i].split('=')[1] || "";
      }
    }
    return info;
  }

  var courtJoinList = {
    $courtJoinP:$('#courtJoinProceeding'),
    $courtJoinProceeding:$('#courtJoinProceeding tbody'),
    $courtJoinProceedingTab:$('#courtJoinProceedingTab'),
    $courtJoinF:$('#courtJoinFinished'),
    $courtJoinFinished:$('#courtJoinFinished tbody'),
    $courtJoinFinishedTab:$('#courtJoinFinishedTab'),
    $courtJoinFx:$('#courtJoinFixed'),
    $courtJoinFixed:$('#courtJoinFixed tbody'),
    $courtJoinFixedTab:$('#courtJoinFixedTab'),
    $courtJoinS:$('#courtJoinSettle'),
    $courtJoinSettle:$('#courtJoinSettle tbody'),
    $courtJoinSettleTab:$('#courtJoinSettleTab'),
    $activityTab:$('.activity-tab'),
    $activityMainTable:$('.activity-main table'),
    $empty:$('.activity-main .empty'),
    $timeSelectBar:$('.time-select-bar'),
    $pagination:$('#pagination'),
    $finishTimeSelectInput:$('#finishTimeSelectInput'),
    $finishTimeSelectBtn:$('#finishTimeSelectBtn'),
    $exportAmountListBtn:$('#exportAmountList'),
    courtJoinProceedingData:null,
    courtJoinFinishedData:null,
    courtJoinFixedData:null,
    courtJoinSettleData:null,
    courtJoinData:{},
    __setHash__:null,
    init:function(){
      var that = this;
      var date = moment(NOW_DATE).subtract(0,'day');
      this.getDataFormHash();
      this.setHashAll('init_all');
      this.tabClickInit();
      this.getCourtJoinList();
      this.daterangepickerInit(date);
      this.$finishTimeSelectBtn.on('click',function(){
        that.getCourtJoinList();
      });
      this.$exportAmountListBtn.on('click',function(){
        that.exportAmountList();
      });
      $(window).on('hashchange',function(e){
        // debugger;
        console.log(e);
        if ( that.__setHash__ ) {
          that.__setHash__ = false;
        } else {
          that.getDataFormHash();
          that.getCourtJoinList();
        }
      });
    },
    getCourtJoinListData:{
      page:1,
      status:0,
      start_time:NOW_DATE,
      end_time:NOW_DATE,
      page_count:null,
    },
    getDataFormHash:function(){
      if ( hashRouter.getHash('start_time') ) this.getCourtJoinListData.start_time = hashRouter.getHash('start_time');
      if ( hashRouter.getHash('end_time') ) this.getCourtJoinListData.end_time = hashRouter.getHash('end_time');
      if ( hashRouter.getHash('page') ) this.getCourtJoinListData.page = hashRouter.getHash('page');
      if ( hashRouter.getHash('status') ) this.getCourtJoinListData.status = hashRouter.getHash('status');
    },
    exportAmountList:function(){
      // var data = {
      //   start_time : this.getCourtJoinListData.start_time,
      //   end_time : this.getCourtJoinListData.end_time,
      // }
      // var success = function(res){
      //   console.log(res);
      // };
      // var error = error;
      // ajax.exportAmountList(data, success, error);
      $('#exportAmountListForm input[name=start_time]').val(this.getCourtJoinListData.start_time);
      $('#exportAmountListForm input[name=end_time]').val(this.getCourtJoinListData.end_time);
      $('#exportAmountListForm')[0].submit();
    },
    setCourtJoinListData:function(key, value ,str){
      this.getCourtJoinListData[key] = value;
      this.setHashAll(str);
    },
    setHashAll:function(str){
      var obj = {
        page:this.getCourtJoinListData.page,
        status:this.getCourtJoinListData.status,
      }
      if ( this.getCourtJoinListData.start_time && this.getCourtJoinListData.start_time !== '' ) obj.start_time = this.getCourtJoinListData.start_time;
      if ( this.getCourtJoinListData.end_time && this.getCourtJoinListData.end_time !== '' ) obj.end_time = this.getCourtJoinListData.end_time;
      hashRouter.setHash(obj,str);
    },
    tabClickInit:function(){
      var that = this;
      this.$courtJoinProceedingTab.on('click',function(e){that.tabClick('courtJoinProceedingTab',this)});
      this.$courtJoinFinishedTab.on('click',function(e){that.tabClick('courtJoinFinishedTab',this)});
      this.$courtJoinFixedTab.on('click',function(e){that.tabClick('courtJoinFixedTab',this)});
      this.$courtJoinSettleTab.on('click',function(e){that.tabClick('courtJoinSettleTab',this)});
    },
    tabClick:function(type,dom){

      if ( $(this).hasClass('cur') ) return false;
      // this.displayChange(type,dom);
      if ( type === 'courtJoinProceedingTab' ) {
        this.setCourtJoinListData('status', 0, 'tabClick');
      } else if ( type === 'courtJoinFinishedTab' ) {
        this.setCourtJoinListData('status', 1, 'tabClick');
      } else if ( type === 'courtJoinFixedTab' ) {
        this.setCourtJoinListData('status', 2, 'tabClick');
      } else if ( type === 'courtJoinSettleTab' ) {
        this.setCourtJoinListData('status', 3, 'tabClick');
      }
      this.setCourtJoinListData('page', 1, 'tabClick');
      this.getCourtJoinList(type);
    },
    displayChange:function(type,dom){
      this.$empty.addClass('hide');
      this.$activityTab.removeClass('cur');
      $(dom).addClass('cur');
      this.$activityMainTable.addClass('hide');
      this.$timeSelectBar.addClass('hide');
      $('#tabList').removeClass('hide');
      $('#title_index').text('活动管理');
      $('#dateText').text('日期');
      $('.settle').addClass('hide');
      $('#exportAmountList').addClass('hide');
      $('#userMoney').addClass('hide');
      $('#courtJoinSettleTab').addClass('hide');
      $('#addCourtJoinBtn').removeClass('hide');
      if ( type === 'courtJoinProceedingTab' ) {
        this.$courtJoinP.removeClass('hide');
      } else if ( type === 'courtJoinFinishedTab' ) {
        this.$courtJoinF.removeClass('hide');
        this.$timeSelectBar.removeClass('hide');
      } else if ( type === 'courtJoinFixedTab' ) {
        this.$courtJoinFx.removeClass('hide');
      } else if ( type === 'courtJoinSettleTab' ) {
        this.$courtJoinS.removeClass('hide');
        this.$timeSelectBar.removeClass('hide');
        $('.settle').removeClass('hide');
        $('#exportAmountList').removeClass('hide');
        $('#userMoney').removeClass('hide');
        $('#addCourtJoinBtn').addClass('hide');
        $('#title_index').text('活动结算');
        $('#dateText').text('结算周期');
        $('#tabList').addClass('hide');
      }
    },
    showEmpty:function(){
      this.$pagination.addClass('hide');
      this.$activityMainTable.addClass('hide');
      this.$empty.removeClass('hide');
    },
    setUserMoney:function(){
      $('#userMoney').html('');
      var data = {};
      var success = function(res){
        console.log(res);
        var res = checkFormat(res);
        if ( !res ) return tipsBox.show('格式错误，请刷新重试');
        var _html = '无法获取账户余额，请刷新重试';
        if ( res.status == '0000' ) {
          _html = '当前账户余额:<em>'+res.data.user_money+'元</em>';
        }
        $('#userMoney').html(_html);
      };
      var error = error;
      ajax.user(data, success, error);
    },
    getCourtJoinList:function(type){
      loadingBox.show();
      var status = this.getCourtJoinListData.status;
      var that = this;
      this.getDataFormHash();
      var data = {
        page : this.getCourtJoinListData.page,
        status : this.getCourtJoinListData.status,
        // start_time : this.getCourtJoinListData.start_time,
        // end_time : this.getCourtJoinListData.end_time,
      }
      if ( status == 1 || status == 3 ) {
        data.start_time = this.getCourtJoinListData.start_time;
        data.end_time = this.getCourtJoinListData.end_time;
      }
      if ( status == 3 ) {
        setTimeout(function(){
          that.setUserMoney();
        },0);
      }
      var success = function(res){
        loadingBox.hide();
        var res = checkFormat(res);
        if ( !res ) return tipsBox.show('格式错误，请刷新重试');
        var list = ['courtJoinProceedingTab','courtJoinFinishedTab','courtJoinFixedTab','courtJoinSettleTab'];
        var status = that.getCourtJoinListData.status;
        // console.log(res);
        if ( res.status == '0000' ) {
          that.displayChange(list[status], document.getElementById(list[status]));
          if ( res.data.list && res.data.list.length === 0 ) return that.showEmpty();
          if ( status == 0 ) {
            that.courtJoinProceedingData = res.data.list;
            that.setCourtJoinTable('0');
          } else if ( status == 1 ) {
            that.courtJoinFinishedData = res.data.list;
            that.setCourtJoinTable('1');
          } else if ( status == 2 ) {
            that.courtJoinFixedData = res.data.list;
            that.setCourtJoinTable('2');
          } else if ( status == 3 ) {
            that.courtJoinSettleData = res.data.list;
            $('#settle_amount').text(res.data.settle_amount + '元');
            $('#item_count').text(res.data.item_count);
            that.setCourtJoinTable('3');
          }
          // that.setCourtJoinListData('page', res.data.current_page, 'ajaxsuccess');
          that.getCourtJoinListData.page_count = res.data.page_count;
          that.setPage();

        } else if ( res.status == '4001' ) {
          commonDialogBox.show({
            title:'提示',
            desc:'未绑定趣运动用户',
            sureText:'绑定手机号'
          },function(){
            bindPhoneBox.show();
          });
        } else {
          tipsBox.show(res.msg);
        }
      }
      var error = error;
      ajax.courtJoinList(data, success, error);
    },
    setPage:function(){
      this.$pagination.removeClass('hide');
      var that = this;
      var opt = {
        dom:this.$pagination[0],
        totlePage:this.getCourtJoinListData.page_count,
        currentPage:this.getCourtJoinListData.page,
        callback:function(num){
          opt.currentPage = num;
          that.setCourtJoinListData('page', num, 'page_callback');
          that.getCourtJoinList();
        },
      }

      nm_page_obj.setup(opt);

    },
    setCourtJoinTable:function(type){
      var that = this;
      var list = [];
      var array = [];
      var $dom = {};

      if ( type === '0' ) {
        array = this.courtJoinProceedingData;
        $dom = this.$courtJoinProceeding;
      } else if ( type === '1' ) {
        array = this.courtJoinFinishedData;
        $dom = this.$courtJoinFinished;
      } else if ( type === '2' ) {
        array = this.courtJoinFixedData;
        $dom = this.$courtJoinFixed;
      } else if ( type === '3' ) {
        array = this.courtJoinSettleData;
        $dom = this.$courtJoinSettle;
      }
      
      $dom.html('');
      
      $.each(array, function(index, item){
        var tr = that.courtJoinTr(item,type);
        list.push(tr);
      });

      $.each(list, function(index, item){
        $dom.append(item);
      });

    },
    courtJoinTr:function(data, type){
      var tr = document.createElement('tr');
        var week = this.courtCreateTd('week', data ,type);
        var day = this.courtCreateTd('day', data, type);
        var cat = this.courtCreateTd('cat', data);
        var courseList = this.courtCreateTd('courseList', data);
        var member = this.courtCreateTd('member', data, type);
        var unit_price = this.courtCreateTd('unit_price', data);
        var totle_price = this.courtCreateTd('totle_price', data);
        var settle_price = this.courtCreateTd('settle_price', data);
        var operation = this.courtCreateTd('operation', data, type);
      if ( type === '0' ) {
        tr.appendChild(day);
        tr.appendChild(cat);
        tr.appendChild(courseList);
        tr.appendChild(member);
        tr.appendChild(unit_price);
        tr.appendChild(totle_price);
        tr.appendChild(operation);
      } else if ( type === '1' ) {
        tr.appendChild(day);
        tr.appendChild(cat);
        tr.appendChild(courseList);
        tr.appendChild(member);
        tr.appendChild(unit_price);
        tr.appendChild(totle_price);
        tr.appendChild(operation); 
      } else if ( type === '2' ) {
        tr.appendChild(week);
        tr.appendChild(cat);
        tr.appendChild(courseList);
        tr.appendChild(member);
        tr.appendChild(unit_price);
        tr.appendChild(operation); 
      } else if ( type === '3' ) {
        tr.appendChild(day);
        tr.appendChild(cat);
        tr.appendChild(courseList);
        tr.appendChild(member);
        tr.appendChild(unit_price);
        tr.appendChild(totle_price);
        tr.appendChild(settle_price);
      }
      
      return tr;
    },
    courtCreateTd:function(type, data, mark){
      var td = document.createElement('td');
      if ( type === 'week' ) {
          var weekList = WEEK;
          var _html = weekList[data.week_day];
          if ( mark == '2' ) {
            _html += '<br>' + data.start_time + ' - ' + data.end_time;
          }
          td.innerHTML = _html;
      }

      if ( type === 'day' ) {
        var _html = data.book_date;
        if ( mark == '0' ) {
          _html += '<br>' + data.start_time.split(' ')[1] + ' - ' + data.end_time.split(' ')[1];
        }
        if ( data.book_date === NOW_DATE ) {
          _html = "<em>今天</em>" + _html;
          td.innerHTML =  _html;
        } else {
          td.innerHTML = _html;
        }
      }

      if ( type === 'cat' ) {
        td.innerHTML = data.cat_name;
      }

      if ( type === 'courseList' ) {
        var courseList = data.course_name.split(',');
        var _html = '';
        $.each(courseList, function(index, item){
          if ( index === 0 ) {
            _html += item;
          } else {
            _html += '<br />' + item;
          }
        });
        td.innerHTML = _html;
      }

      if ( type === 'member' ) {
        var join_num = data.join_num || 0;
        var left_join_num = data.left_join_num || 0;
        var field_capacity = data.field_capacity || 6;
        var empty = join_num - left_join_num;
        var court_num = 0;
        if ( empty !== 0 ) {
          court_num = parseInt( empty / field_capacity ) + 1;
        }
        td.innerHTML = empty + "/" + join_num + "<br />需锁定"+ court_num +"片场地";
        if ( mark == '2' ) {
          td.innerHTML = data.field_capacity * data.course_id.split(',').length;
        }
        if ( mark == '3' ) {
          td.innerHTML = empty + "/" + join_num;
        } 
      }

      if ( type === 'unit_price' ) {
        td.innerHTML = data.unit_price;
      }

      if ( type === 'totle_price' ) {
        td.innerHTML = (data.unit_price * (data.join_num - data.left_join_num)).toFixed(2);
      }

      if ( type === 'settle_price' ) {
        td.innerHTML = data.settle_price;
      }

      if ( type === 'operation' ) {
        var share = this.courtCreateSpan('share', data, mark);
        var msg = this.courtCreateSpan('msg', data, mark);
        var edit = this.courtCreateSpan('edit', data, mark);
        var del = this.courtCreateSpan('del', data, mark);
        if ( mark === '0' ) {
          td.appendChild(share);
          td.appendChild(msg);
          td.appendChild(edit);
          td.appendChild(del);
        } else if ( mark === '1' ) {
          td.appendChild(msg);
        } else if ( mark === '2' ) {
          td.appendChild(edit);
          td.appendChild(del);
        }
      }

      return td;
    },
    courtCreateSpan:function(type, data, mark){
      var that = this;
      var span = document.createElement('span');
      span.setAttribute('data-cj', data.cj_order_id);
      span.setAttribute('data-mark', mark);
      if ( mark == '2' ) {
        span.setAttribute('data-id', data.id);
      }
      if ( type === 'share' ) {
        span.innerHTML = '推广';
        $(span).on('click',function(e){
          that.spanClick('share', span);
        });
      }

      if ( type === 'msg' ) {
        span.innerHTML = '球友信息';
        $(span).on('click',function(e){
          that.spanClick('msg', span);
        });
      }

      if ( type === 'edit' ) {
        span.innerHTML = '修改';
        $(span).on('click',function(e){
          that.spanClick('edit', span, data);
        });
      }

      if ( type === 'del' ) {
        span.innerHTML = '删除';
        $(span).on('click',function(e){
          that.spanClick('del', span);
        });
      }

      return span;
    },
    spanClick:function(type, dom, opt){
      console.log(type, dom);
      var cj = dom.getAttribute('data-cj');
      var mark = dom.getAttribute('data-mark');
      var id = dom.getAttribute('data-id');
      if ( type === 'share' ) {
        share.show(cj);
      }
      if ( type === 'msg' ) {
        msg.show(cj);
      }
      if ( type === 'edit' ) {
        if ( mark == '0' ) edit.show(cj, mark);
        if ( mark == '2' ) addCourtJoin.show('edit', opt, mark);
      }
      if ( type === 'del' ) {
        if ( mark == '0' ) del.show(cj, mark);
        if ( mark == '2' ) del.show(id, mark);
      }
    },
    daterangepickerInit:function(date){
        
        var that = this;
        var yesterday = new Date(date).format('yyyy-MM-dd');
        $('#finishTimeSelect span').text(yesterday + ' - ' + yesterday);
        this.$finishTimeSelectInput.val(yesterday + ' - ' + yesterday);
        this.$finishTimeSelectInput.daterangepicker({
            showDropdowns: true,
            maxDate:yesterday,
        }, 
        function(start, end, label) {
            var t1 = new Date(start.toString());
            var t2 = new Date(end.toString());
            var txt1 = t1.format('yyyy-MM-dd');
            var txt2 = t2.format('yyyy-MM-dd');
            $('#finishTimeSelect span').text(txt1 + ' - ' + txt2);
            that.setCourtJoinListData('start_time', txt1, 'time_callback');
            that.setCourtJoinListData('end_time', txt2, 'time_callback');
        });
    },
  };

  var del = {
    show:function(cj, mark){
      var that = this;
      var desc = '';
      if ( mark == '0' ) {
        desc = '确认删除活动？';
      } else if ( mark == '2' ) {
        desc = '确认删除固定活动？';
      }
      commonDialogBox.show({
        title:'删除活动',
        desc:desc,
        sureText:'确认'
      },function(){
        if ( mark == '0' ) that.delCourtJoin(cj);
        if ( mark == '2' ) that.delFixedCourtJoin(cj);
      });
    },
    delCourtJoin:function(cj){
      loadingBox.show();
      var data = {
        cj_order_id : cj,
      }
      var success = function(res){
        loadingBox.hide();
        var res = checkFormat(res);
        if ( !res ) return tipsBox.show('格式错误，请刷新重试');
        if ( res.status == '0000' ) {
          tipsBox.show('删除成功');
          courtJoinList.getCourtJoinList();
        } else {
          tipsBox.show(res.msg);
        }
      };
      var error = error;
      ajax.cancelCourtJoin(data, success, error);
    },
    delFixedCourtJoin:function(cj){
      loadingBox.show();
      var data = {
        id : cj,
        is_delete : 1,
      }
      var success = function(res){
        loadingBox.hide();
        var res = checkFormat(res);
        if ( !res ) return tipsBox.show('格式错误，请刷新重试');
        if ( res.status == '0000' ) {
          tipsBox.show('删除成功');
          courtJoinList.getCourtJoinList();
        } else {
          tipsBox.show(res.msg);
        }
      };
      var error = error;
      ajax.editFixedCourtJoin(data, success, error);
    },
  }

  var edit = {
    show:function(cj, mark){
      this.getCourtJoinInfo(cj, function(data){
        var date = new Date(data.court_join_info.start_time * 1000).format('YYYY-MM-dd');
        var start_time = new Date(data.court_join_info.start_time * 1000).format('hh:mm');
        var end_time = new Date(data.court_join_info.end_time * 1000).format('hh:mm');
        var hasJoin = 0;
        if ( data.user_list.length ) hasJoin = data.user_list.length;
        var opt = {
          cat_id : data.court_join_info.cat_id,
          course_id : data.court_join_info.course_id,
          description : data.court_join_info.description,
          field_capacity : data.court_join_info.field_capacity,
          unit_price : data.court_join_info.unit_price,
          end_time : end_time,
          start_time : start_time,
          book_date : date,
          hasJoin: hasJoin,
          cj_order_id : cj,
        }
        addCourtJoin.show('edit', opt, mark);
      });
    },
    getCourtJoinInfo:getCourtJoinInfo,
  }

  var msg = {
    $dom:$('#userList'),
    $close:$('#userList .close'),
    $userList:$('#userList .user-list'),
    init:function(){
      var that = this;
      this.$close.on('click',function(){
        that.hide();
      });
    },
    show: function(cj) {
      var that = this;
      this.getCourtJoinInfo(cj, function(data){
        showBC('blackCoverForUserList');
        addZindex(that.$dom);
        that.$dom.removeClass('hide');
        that.showUserList(data);
      });
    },
    getCourtJoinInfo:getCourtJoinInfo,
    hide: function() {
      hideBC('blackCoverForUserList');
      this.$dom.addClass('hide');
    },
    showUserList:function(data){
      this.$userList.html('');
      var _html = '';
      if ( data.user_list.length > 0 ) {
        $.each(data.user_list, function(index, item){
          _html += '<li><div class="l"><img src="'+item.avatar+'" ></div><div class="m">'+item.nick_name+'</div><div class="r">'+item.mobile+'</div></li>';
        });
      }
      this.$userList.html(_html);
    }
  }

  msg.init();
  
  var share = {
    $dom:$('#popularize'),
    $copyUrlBtn:$('#copyUrlBtn'),
    $close:$('#popularize .close'),
    $copyUrl:$('#copyUrl'),
    $codeImg:$('#codeImg'),
    clipboard:null,
    init:function(){
      var that = this;
      this.clipboard = new Clipboard('#copyUrlBtn');
      this.clipboard.on('success',function(e){
        var msg = 'URL:' + e.text + '<br />成功复制到粘贴板！';
        tipsBox.show(msg);
      });
      this.$close.on('click',function(){
        that.hide();
      });
    },
    show: function(cj) {
      var that = this;
      this.getCourtJoinInfo(cj, function(data){
        showBC('blackCoverForPopularize');
        addZindex(that.$dom);
        that.$dom.removeClass('hide');
        that.setUrl(data);
      });
    },
    getCourtJoinInfo:getCourtJoinInfo,
    hide: function() {
      hideBC('blackCoverForPopularize');
      this.$dom.addClass('hide');
      this.$codeImg.attr('src','');
    },
    setUrl:function(data){
      this.$copyUrl.val(data.share_info.url);
      var codeUrl = ''; 
      if ( data.share_info.url ) codeUrl = 'http://qr.liantu.com/api.php?text=' + data.share_info.url;
      this.$codeImg.attr('src',codeUrl);
    },
  }

  share.init();

  function getCourtJoinInfo (cj, fn){
    loadingBox.show();
    var data = {
      cj_order_id:cj,
    }
    var success = function(res){
      loadingBox.hide();
      var res = checkFormat(res);
      if ( !res ) return tipsBox.show('格式错误，请刷新重试');
      if ( res.status == '0000' ) {
        if ( typeof fn === 'function' ) fn(res.data);
      } else {
        tipsBox.show(res.msg);
      }
    };
    var error = error;
    ajax.courtJoinInfo(data, success, error);
  }

  var addCourtJoin = {
    $dom:$('#courtJoin'),
    $close:$('#courtJoin .close'),
    $pRadio:$('#courtJoin .p-radio'),
    $tips:$('#courtJoin .tips'),
    $title:$('#courtJoin .dialogue-title h2'),
    $courtJoinWeekBar:$('#courtJoinWeekBar'),
    $courtJoinWeekBarSelect:$('#courtJoinWeekBarSelect'),
    $courtJoinTimeBar:$('#courtJoinTimeBar'),
    $addCoutrTimeSelect:$('#addCoutrTimeSelect'),
    $addCoutrTimeSelectInput:$('#addCoutrTimeSelectInput'),
    $weekday:$('#weekday'),
    $fixedWeek:$('#fixedWeek'),
    $fixedWeekInput:$('#fixedWeekInput'),
    $courtJoinCat:$('#courtJoinCat'),
    $courtJoinSelectCourt:$('#courtJoinSelectCourt ul'),
    $courtJoinMaxUserNumber:$('#courtJoinMaxUserNumber'),
    $averagePrice:$('#averagePrice'),
    $isRefundRadio:$('#courtJoin input[name=is_refund]'),
    $courtJoinTextarea:$('#courtJoinTextarea'),
    $sureBtn:$('#courtJoinSureBtn'),
    $totleUser:$('#totleUser'),
    $totlePrice:$('#totlePrice'),
    $hasJoin:$('#hasJoin'),
    venuesInfo:null,
    data:{
      type:null,
      week:null,
      field_capacity:null,
      unit_price:null,
      is_refund:null,
      week_cycle:null,
      cat_id:null,
      start_time:null,
      date:null,
      end_time:null,
      course_id:null,
      text:null,
      timeList:null,
      courseList:null,
      hasJoin:null,
      cj_order_id:null,
      mark:null,
    },
    oldData:null,
    dataFormat:function(type, opt, mark){
      this.data.mark = mark;
      if ( type === 'add' || type === undefined ) {
        this.data.type = 'add';
        this.data.field_capacity = 6;
        this.data.date = NOW_DATE;
        this.related(this.venuesInfo.cat_list[0].cat_id ,NOW_DATE);
        this.daterangepickerInit(this.data.date);
      }

      if ( type === 'edit' && mark == '0' ) {
        console.log(opt);
        this.data.type = 'edit';
        this.data.field_capacity = opt.field_capacity;
        this.data.date = opt.book_date;
        this.related(opt.cat_id ,opt.book_date);
        this.data.start_time = opt.start_time;
        this.data.end_time = opt.end_time;
        this.data.unit_price = opt.unit_price;
        this.data.course_id = opt.course_id;
        this.data.hasJoin = opt.hasJoin;
        this.data.text = opt.description;
        this.data.cj_order_id = opt.cj_order_id;
        this.oldData = JSON.parse(JSON.stringify(this.data));
      }

      if ( type === 'edit' && mark == '2' ) {
        console.log(opt);
        this.data.type = 'edit';
        this.data.field_capacity = opt.field_capacity;
        this.data.date = opt.book_date;
        this.relatedCatId(opt.cat_id);
        this.relatedWeek(opt.week_day);
        this.data.start_time = opt.start_time;
        this.data.end_time = opt.end_time;
        this.data.unit_price = opt.unit_price;
        this.data.course_id = opt.course_id;
        this.data.text = opt.description;
        this.data.cj_order_id = opt.id;
        this.data.is_refund = opt.is_refund;
        this.oldData = JSON.parse(JSON.stringify(this.data));
      }
      
    },
    related:function(cat_id, date){
      this.relatedCatId(cat_id);
      var week = new Date(date).getDay();
      this.relatedWeek(week);
    },
    relatedCatId:function(cat_id){
      this.data.cat_id = cat_id;
      this.data.courseList = this.venuesInfo.course_list[this.data.cat_id];
      this.data.course_id = this.data.courseList[0].course_id;
    },
    relatedWeek:function(week){
      this.data.week = week;
      this.data.timeList = this.venuesInfo.time_list[this.data.cat_id][week].split(',');
      this.data.start_time = this.data.timeList[0];
      this.data.end_time = this.data.timeList[1];
    },
    init:function(){
      var date = NOW_DATE;
      // this.getVenuesInfo();
      this.$close.click(this.hide.bind(this));
      this.setWeek(date);
    },
    show: function(type, opt, mark) {
      var that = this;
      this.getVenuesInfo(function(){
        that.setCourtJoinForm(type, opt, mark);
        showBC('blackCoverForCourtJoin');
        addZindex(that.$dom);
        that.$dom.removeClass('hide');
      });
    },
    hide: function() {
      hideBC('blackCoverForCourtJoin');
      this.$dom.addClass('hide');
      this.daterangepickerDelete();
      this.data = {
        type:null,
        week:null,
        field_capacity:null,
        unit_price:null,
        is_refund:null,
        week_cycle:null,
        cat_id:null,
        start_time:null,
        date:null,
        end_time:null,
        course_id:null,
        text:null,
        timeList:null,
        courseList:null,
        hasJoin:null,
        cj_order_id:null,
        mark:null,
      }
    },
    setCourtJoinForm:function(type, opt, mark){
      this.dataFormat(type, opt, mark);
      this.setUI();
      this.setCat();
      this.setCourt();
      this.setMaxUser();
      this.setTotleUser();
      this.setAveragePrice();
      this.setTotlePrice();
      this.setWeek();
      this.setFixedWeek();
      this.setIsRefund();
      this.textArea();
      this.setHasJoin();
      this.setSureBtn();
    },
    setHasJoin:function(){
      var hasJoin = 0;
      if ( this.data.hasJoin !== null ) {
        hasJoin = this.data.hasJoin;
      }
      this.$hasJoin.html(hasJoin + '/');
    },
    sendData:function(dom,e){
      console.log(dom,e);
      console.log(this.data);
      
      if ( this.data.type === 'add' ) {
        this.sendAddData();
      } else if ( this.data.type === 'edit' && this.data.mark == '0' ) {
        this.sendEditData();
      } else if ( this.data.type === 'edit' && this.data.mark == '2' ) {
        this.sendFixedEditData();
      }

    },
    sendFixedEditData:function(){
      var that = this;

      if ( JSON.stringify(this.data) == JSON.stringify(this.oldData) ) return tipsBox.show('没有修改');
      loadingBox.show();
      var data = {
        is_delete : 0, // int 是否删除，若删除，则以下内容可不传（1删除，0修改）  Y
        week_day : this.data.week, // int 固定于每周x发起(0-周日，1-6对应周一到周六) N
        unit_price : this.data.unit_price, // float 球局单价  N
        field_capacity : this.data.field_capacity, // int 单场次容量 N
        is_refund : this.data.is_refund, // int 是否支持退款  N
        start_time : this.data.start_time, // int 开始时间  N
        end_time : this.data.end_time, // int 结束时间  N
        id : this.data.cj_order_id, // string  是 活动ID
        course_id : this.data.course_id,// string  是 场次信息,用逗号分隔100,101
        description : this.data.text, // string 否 球局介绍
      }
      var success = function(res){
        loadingBox.hide();
        var res = checkFormat(res);
        if ( !res ) return tipsBox.show('格式错误，请刷新重试');
        console.log(res);
        if ( res.status == '0000' ) {
          tipsBox.show('保存成功');
          courtJoinList.getCourtJoinList();
          that.hide();
        } else {
          tipsBox.show(res.msg);
        }
      };
      var error = error;
      ajax.editFixedCourtJoin(data, success, error);
    },
    sendEditData:function(){
      var that = this;
      console.log('this.data=>',this.data);
      console.log('this.oldData=>',this.oldData);
      if ( JSON.stringify(this.data) == JSON.stringify(this.oldData) ) return tipsBox.show('没有修改');
      loadingBox.show();
      var data = {
        cj_order_id : this.data.cj_order_id, // string  是 活动ID
        course_id : this.data.course_id,// string  是 场次信息,用逗号分隔100,101
        field_capacity : this.data.field_capacity,  // int 是 单场次容量
        description : this.data.text, // string 否 球局介绍
      }
      var success = function(res){
        loadingBox.hide();
        var res = checkFormat(res);
        if ( !res ) return tipsBox.show('格式错误，请刷新重试');
        console.log(res);
        if ( res.status == '0000' ) {
          tipsBox.show('修改成功');
          courtJoinList.getCourtJoinList();
          that.hide();
        } else {
          tipsBox.show(res.msg);
        }
      };
      var error = error;
      ajax.editCourtJoin(data, success, error);
    },
    sendAddData:function(){
      var that = this;
      if ( this.checkData() ) {
        loadingBox.show();
        var data = {
          field_capacity:this.data.field_capacity, //string  是 单片场地容量
          unit_price:this.data.unit_price,  //string  是 价格
          is_refund:this.data.is_refund, //string  是 是否支持退款（0-不支持，1-支持）
          week_cycle:(this.data.week_cycle == 1 ) ? 1 : 0,  //int 是 是否每周固定日期发起（0-非固定活动，1-发起固定活动）
          cat_id:this.data.cat_id,  //int 是 项目
          start_time:this.data.date +' '+this.data.start_time, //string  是 开始时间 如：2026-08-12 10:00
          end_time:this.data.date +' '+this.data.end_time,  //string  是 结束时间 如：2016-08-12 11:00
          course_id:this.data.course_id, //string  是 场地号 如：1001,1002
          description:this.data.text || '', //string 
        };
        console.log(data);
        var success = function(res){
          loadingBox.hide();
          var res = checkFormat(res);
          if ( !res ) return tipsBox.show('格式错误，请刷新重试');
          console.log(res);
          if ( res.status == '0000' ) {
            tipsBox.show('发起活动成功');
            that.hide();
            courtJoinList.getCourtJoinList();
          } else {
            tipsBox.show(res.msg);
          }
        };
        var error = error;
        
        ajax.postAddCourtJoin(data, success, error);
      }
    },
    checkData:function(){
      var text = '';
      if ( this.data.is_refund === null ) text += '<br />' + '请选择是否可退款';
      if ( this.data.unit_price === null ) text += '<br />' + '请输入人均价格';
      if ( text === '' ) {
        return true;
      } else {
        return tipsBox.show(text);
      }
    },
    setSureBtn:function(){
      var that = this;
      if ( !this.$sureBtn[0].__click__ ) this.$sureBtn[0].__click__ = function(e){that.sendData(that.$sureBtn[0],e);};
            this.$sureBtn.off('click',this.$sureBtn[0].__click__).on('click',this.$sureBtn[0].__click__);
    },
    setUI:function(){

      this.$averagePrice.removeAttr('readonly');
      this.$courtJoinCat.removeAttr('disabled');
      this.$pRadio.removeClass('hide');
      this.$fixedWeek.removeClass('hide');
      this.$tips.removeClass('hide');
      this.$courtJoinTimeBar.removeClass('hide');
      this.$hasJoin.removeClass('hide');
      this.$courtJoinWeekBar.removeClass('hide');

      if ( this.data.type === 'add' ) {
        
        this.$courtJoinWeekBar.addClass('hide');
        this.$title.html('发起活动');
        this.$sureBtn.html('发起活动');        
        this.$hasJoin.addClass('hide');

      }
      if ( this.data.type === 'edit' && this.data.mark == '0' ) {

        this.$pRadio.addClass('hide');
        this.$fixedWeek.addClass('hide');
        this.$tips.addClass('hide');
        this.$courtJoinWeekBar.addClass('hide');
        this.$title.html('修改活动');
        this.$sureBtn.html('保存修改');
        this.$averagePrice.attr('readonly','');
        this.$courtJoinCat.attr('disabled','');
        
      }

      if ( this.data.type === 'edit' && this.data.mark == '2' ) {

        this.$courtJoinTimeBar.addClass('hide');
        this.$title.html('固定活动设置');
        this.$sureBtn.html('保存');        
        this.$hasJoin.addClass('hide');

      }
    },
    setFixedWeek:function(){
      var that = this;
      if ( this.data.week_cycle == 1  ) {
        this.$fixedWeekInput[0].checked = true;
      } else {
        this.$fixedWeekInput[0].checked = false;
      }
      if ( !this.$fixedWeekInput[0].__change__ ) this.$fixedWeekInput[0].__change__ = function(e){that.valueChange(that.$fixedWeekInput[0],e);};
            this.$fixedWeekInput.off('change',this.$fixedWeekInput[0].__change__).on('change',this.$fixedWeekInput[0].__change__);
    },
    setIsRefund:function(){
      var that = this;
      if ( this.data.is_refund == 1 ) {
        $('#is_refund_1')[0].checked = true;
        $('#is_refund_0')[0].checked = false;
      } else if ( this.data.is_refund == 0 ) {
        $('#is_refund_1')[0].checked = false;
        $('#is_refund_0')[0].checked = true;
      } else {
        $('#is_refund_1')[0].checked = false;
        $('#is_refund_0')[0].checked = false;
      }
      if ( !this.$isRefundRadio.__click__ ) this.$isRefundRadio.__click__ = function(e){that.radioChange(that.$isRefundRadio,e);};
      this.$isRefundRadio.off('click',this.$isRefundRadio.__click__).on('click',this.$isRefundRadio.__click__);
    },
    textArea:function(){
      var that = this;
      if ( this.data.text === null ) {
        this.$courtJoinTextarea[0].value = '';
      } else {
        this.$courtJoinTextarea[0].value = this.data.text;
      }
      if ( !this.$courtJoinTextarea[0].__change__ ) this.$courtJoinTextarea[0].__change__ = function(e){that.valueChange(that.$courtJoinTextarea[0],e);};
      this.$courtJoinTextarea.off('input',this.$courtJoinTextarea[0].__change__).on('input ',this.$courtJoinTextarea[0].__change__);
    },
    setCourt:function(){
      this.$courtJoinSelectCourt.html('');
      var that = this;
      var courseIdList = (typeof this.data.course_id === 'string') ? this.data.course_id.split(',') : [];
      $.each(courseIdList, function(index, item){
        var li = that.createCourtLi(index,item);
        that.$courtJoinSelectCourt.append(li);
      });
    },
    createCourtLi:function(index,course_id){
      var that = this;
      var li = document.createElement('li');
      var startTimeSelect = document.createElement('select');
      startTimeSelect.name = 'start_time';
      var z = document.createElement('span');
      var endTimeSelect = document.createElement('select');
      endTimeSelect.name = 'end_time';
      var courtSelect = document.createElement('select');
      courtSelect.name = 'course_id';
      courtSelect.setAttribute('data-value',course_id);
      var a = document.createElement('a');

      li.appendChild(startTimeSelect);
      li.appendChild(z);
      li.appendChild(endTimeSelect);
      li.appendChild(courtSelect);
      li.appendChild(a);

      if ( this.data.type === 'edit' && this.data.mark == '0' ) {
        startTimeSelect.setAttribute('disabled','');
        endTimeSelect.setAttribute('disabled','');
      }

        z.innerHTML = '至';

        if ( index === 0 ) {
          a.className = 'add';
          a.innerHTML = '添加'; 
          a.__click__ = function(e){that.clickFn(e,'add',li,course_id);};
        } else {
          a.className = 'del';
          a.innerHTML = '删除';
          a.__click__ = function(e){that.clickFn(e,'del',li,course_id);}; 
        }
        
        $(a).on('click',a.__click__);

        var _shtml = '';
        var _ehtml = '';
        $.each(this.data.timeList, function(index, item){
          var sSelect = '';
          var eSelect = '';
          if ( item === that.data.start_time ) sSelect = 'selected';
          if ( item === that.data.end_time ) eSelect = 'selected';
          _shtml += "<option value='"+item+"' "+sSelect+" >"+item+"</option>";
          if ( index > 0 ) _ehtml += "<option value='"+item+"' "+eSelect+" >"+item+"</option>";
        });
        startTimeSelect.innerHTML = _shtml;
        
        if ( this.data.timeList && this.data.timeList.length > 0 ) {
          var eSelect = '';
          var add1hour = formatTime(this.data.timeList[this.data.timeList.length - 1]).add(60);
          if ( add1hour === that.data.end_time ) eSelect = 'selected';
          _ehtml += "<option value='"+add1hour+"' "+eSelect+" >"+add1hour+"</option>";
        }
        endTimeSelect.innerHTML = _ehtml;
        
        var _cHtml = '';
        var courseIds = this.data.course_id + ',';
        $.each(this.data.courseList, function(index, item){
          var cSelect = '';
          var cDisabled = '';
          if ( item.course_id === course_id ) cSelect = 'selected';
          if ( courseIds.indexOf(item.course_id+',') !== -1 ) cDisabled = 'disabled';
          _cHtml += "<option value='"+item.course_id+"' "+cSelect+" "+cDisabled+" >"+item.course_name+"</option>";
        });
        courtSelect.innerHTML = _cHtml;
        startTimeSelect.__change__ = function(e){that.valueChange(startTimeSelect,e);}
        endTimeSelect.__change__ = function(e){that.valueChange(endTimeSelect,e);}
        // courtSelect.__change__ = function(e){that.valueChange(courtSelect,e);}
        // 两种方法 一样效果
        courtSelect.__change__ = this.valueChange.bind(this,courtSelect);
        $(startTimeSelect).on('change',startTimeSelect.__change__);
        $(endTimeSelect).on('change',endTimeSelect.__change__);
        $(courtSelect).on('change',courtSelect.__change__);

      return li;
    },
    valueChange:function(dom,e){
      console.log(e,dom);
      var that = this;

      if ( dom.name === 'course_id' ) {
        var courseIdsStr = this.data.course_id + ',';
        var oldValue = dom.getAttribute('data-value') + ',';
        var newValue = dom.value + ',';
        courseIdsStr = courseIdsStr.replace(oldValue,newValue);
        courseIdsStr = courseIdsStr.substring(0,courseIdsStr.length-1);
        this.data.course_id = courseIdsStr;
        this.setCourt();
      } 

      if ( dom.name === 'start_time' ) {
        this.data.start_time = dom.value;
        if ( formatTime(dom.value).num >= formatTime(this.data.end_time).num ) {
          this.data.end_time = formatTime(dom.value).add(60);
        }
        this.setCourt();
      }

      if ( dom.name === 'end_time' ) {
        this.data.end_time = dom.value;
        if ( formatTime(dom.value).num <= formatTime(this.data.start_time).num ) {
          this.data.start_time = formatTime(dom.value).add(-60);
        }
        this.setCourt();
      }

      if ( dom.name === 'cat_id' ) {
        this.related(dom.value,this.data.date);
        this.setCourt();
        this.setTotleUser();
        this.setTotlePrice();
      }

      if ( dom.name === 'field_capacity' ) {
        this.data.field_capacity = dom.value;
        this.setTotleUser();
        this.setTotlePrice();
      }

      if ( dom.name === 'unit_price' ) {
        var pValue = dom.value;
        if ( Number(pValue) === Number(pValue) ) {
          this.data.unit_price = pValue;
        } else {
          this.data.unit_price = null;
          tipsBox.show('请输入数字');
        }
        this.setAveragePrice();
        this.setTotlePrice();
      }

      if ( dom.name === 'week' ) {
        this.relatedWeek(dom.value);
        this.setWeek();
        this.setCourt();
        this.setTotleUser();
        this.setTotlePrice();
      }

      if ( dom.name === 'week_cycle' ) {
        if ( dom.checked ) {
          this.data.week_cycle = '1';
        } else {
          this.data.week_cycle = '0';
        }
        console.log(this.data.week_cycle);
      }

      if ( dom.name === 'text' ) {
        if ( dom.value.length <= 30 ) {
          this.data.text = dom.value;
        } else {
          dom.value = this.data.text || '';
          tipsBox.show('请字数在30以内');
        }
      }

    },
    radioChange:function(dom,e){
      console.log(dom,e);
      var that = this;
      $.each(dom, function(index, item){
        if ( item.checked ) that.data.is_refund = item.value;
      });
      console.log(that.data.is_refund);
    },
    clickFn:function(e,type,li,course_id){
      var courseIdsStr = this.data.course_id + ',';
      var courseIdsList = this.data.course_id.split(',');
      var allCourseId = this.data.courseList;
      if ( type === 'add' ) {
        var temp = [];
        $.each(allCourseId, function(index, item){
          if ( courseIdsStr.indexOf( item.course_id+',' ) === -1 ) {
            temp.push(item.course_id);
          }
        });
        if ( temp.length > 0 ) this.data.course_id += ',' + temp[0];
      }
      if ( type === 'del' ) {
        var delTemp = [];
        var hasJoin = this.data.hasJoin || 0;
        var totleAfterDelete = this.data.field_capacity * (this.data.course_id.split(',').length - 1);
        if ( this.data.type === 'edit' && ( totleAfterDelete < hasJoin )) {
          tipsBox.show('总人数不能小于已参人数');
        } else {
          $.each(courseIdsList, function(index, item){
            if ( item != course_id) delTemp.push(item);
          });
          this.data.course_id = delTemp.join(',');
        }
        
      }
      this.setCourt();
      this.setTotleUser();
      this.setTotlePrice();
    },
    setTotlePrice:function(){
      this.$totlePrice.html('');
      if ( this.data.unit_price !== null ) this.$totlePrice.html('总收入：' + (this.data.unit_price * this.data.field_capacity * this.data.course_id.split(',').length).toFixed(2) + '元');
    },
    setTotleUser:function(){
      this.$totleUser.html(this.data.field_capacity * this.data.course_id.split(',').length);
    },
    setAveragePrice:function(){
      this.$averagePrice.val('');
      var that = this;
      if ( this.data.unit_price ) this.$averagePrice.val(this.data.unit_price);
      if ( !this.$averagePrice[0].__change__ ) this.$averagePrice[0].__change__ = function(e){that.valueChange(that.$averagePrice[0],e);};
      this.$averagePrice.off('input ',this.$averagePrice[0].__change__).on('input ',this.$averagePrice[0].__change__);
    },
    setCat:function(){
      this.$courtJoinCat.html('');
      var _html = '';
      var that = this;

      this.venuesInfo.cat_list && $.each(this.venuesInfo.cat_list, function(index, item){
        var select = '';
        if ( that.data.cat_id == item.cat_id ) select = 'selected';
        _html += "<option value='"+item.cat_id+"' "+select+" >"+item.cat_name+"</option>";
      });
      this.$courtJoinCat.html(_html);
      if ( !this.$courtJoinCat[0].__change__ ) this.$courtJoinCat[0].__change__ = function(e){that.valueChange(that.$courtJoinCat[0],e);};
      this.$courtJoinCat.off('change',this.$courtJoinCat[0].__change__).on('change',this.$courtJoinCat[0].__change__);
    },
    setMaxUser:function(){
      var list = USER_RANGE;
      this.$courtJoinMaxUserNumber.html('');
      var _html = '';
      var that = this;

      $.each(list, function(index, item){
        var select = '';
        var disabled = '';
        if ( that.data.type === 'edit' && that.data.mark == '0' ) {
          if ( item < that.data.field_capacity ) disabled = 'disabled';
        }
        if ( that.data.field_capacity == item ) select = 'selected';
        _html += "<option value='"+item+"' "+select+" "+disabled+" >"+item+"</option>";
      });
      this.$courtJoinMaxUserNumber.html(_html);
      if ( !this.$courtJoinMaxUserNumber[0].__change__ ) this.$courtJoinMaxUserNumber[0].__change__ = function(e){that.valueChange(that.$courtJoinMaxUserNumber[0],e);};
      this.$courtJoinMaxUserNumber.off('change',this.$courtJoinMaxUserNumber[0].__change__).on('change',this.$courtJoinMaxUserNumber[0].__change__);
    },
    setWeek:function(){
      var that = this;
      var week = this.data.week;
      var weekList = WEEK;
      this.$weekday.html(weekList[week]);
      this.$courtJoinWeekBarSelect.html('');

      var _html = '';
      $.each(weekList, function(index, item){
        var select = '';
        if ( that.data.week == index ) select = 'selected';
        _html += "<option value='"+index+"' "+select+" >"+item+"</option>";
      });
      this.$courtJoinWeekBarSelect.html(_html);
      if ( !this.$courtJoinWeekBarSelect[0].__change__ ) this.$courtJoinWeekBarSelect[0].__change__ = function(e){that.valueChange(that.$courtJoinWeekBarSelect[0],e);};
      this.$courtJoinWeekBarSelect.off('change',this.$courtJoinWeekBarSelect[0].__change__).on('change',this.$courtJoinWeekBarSelect[0].__change__);
    },
    daterangepickerDelete:function(){
      this.$addCoutrTimeSelectInput.data('daterangepicker') && this.$addCoutrTimeSelectInput.data('daterangepicker').remove();
    },
    daterangepickerInit:function(date){
        
        var that = this;
        var firstDay = date;
        var maxDate = moment(firstDay).add(6, 'days');
        this.$addCoutrTimeSelect.text(firstDay);
        this.$addCoutrTimeSelectInput.val(firstDay);
        this.$addCoutrTimeSelectInput.daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            minDate:firstDay,
            maxDate:maxDate,
        }, 
        function(start, end, label) {
            var t1 = new Date(start.toString());
            var week = new Date(start.toString()).getDay();
            var txt1 = t1.format('yyyy-MM-dd');
            var txt2 = t1.format('MM-dd');
            that.$addCoutrTimeSelect.html(txt1);
            that.relatedWeek(week);
            that.data.date = txt1;
            that.setWeek();
            that.setCourt();
            that.setTotleUser();
            that.setTotlePrice();
        });
    },
    getVenuesInfo:function(fn){
      var that = this;
      if ( this.venuesInfo == null ) {
        loadingBox.show();
        var data = {};
        var success = function(res){
          loadingBox.hide();
          var res = checkFormat(res);
          if ( !res ) return tipsBox.show('格式错误，请刷新重试');
          if ( res.status == '0000' ) {
            that.venuesInfo = res.data;
            if ( typeof fn == 'function' ) fn();
          }
        }
        var error = error;
        ajax.getAddCourtJoin(data, success, error);
      } else {
        if ( typeof fn == 'function' ) fn();
      }
    },
  };

  var addCourtJoinBtn = {
    $dom:$('#addCourtJoinBtn'),
    init:function(){
      this.$dom.click(this.click.bind(this));
    },
    click:function(e){
      if ( DEV ) return addCourtJoin.show('add', {}, '0');
      if ( bindPhoneBox.bindPhone == null ) {
        loadingBox.show();
        var data = {};
        var success = function(res){
          loadingBox.hide();
          var res = checkFormat(res);
          if ( !res ) return tipsBox.show('格式错误，请刷新重试');
          if ( res.status == '0000' ) {
            bindPhoneBox.bindPhone = res.data.phone;
            // tipsBox.show('已绑定手机号码'+bindPhoneBox.bindPhone);
            addCourtJoin.show('add', {}, '0');
          } else if ( res.status == '4001' ) {
            commonDialogBox.show({
              title:'提示',
              desc:'发起活动前，需要先绑定手机号。',
              sureText:'绑定手机号'
            },function(){
              bindPhoneBox.show();
            });
            
          } else {
            tipsBox.show(res.msg);
          }
        }
        var error = error;
        ajax.user(data, success, error);
      } else {
        addCourtJoin.show('add', {}, '0');
      }
    }
  };

  main.init();

  function formatTime(str){
    var num = timeFormat(str);
    var obj = {
      num:num,
      add:function(num){
        var time = this.num + num;
        return strFormatTime(time);
      }
    }
    return obj;
  }

  function timeFormat(str){
    if ( typeof str !== 'string' && str.indexOf(':') == -1) return false;
    var hour = str.split(':')[0];
    var min = str.split(':')[1];
    return Number(hour) * 60 + Number(min);
  }

  function strFormatTime(time){
    if ( typeof time !== 'number' ) return false;
    var hour = ~~(time / 60);
    var min = time % 60;
    var ZERO = '0';
    if (hour < 10)  hour = ZERO + String(hour);
    if (min === 0)  min = ZERO + String(min);
    return String(hour) + ':' + String(min);
  }

});