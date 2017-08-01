'use static';

$(function() {

    var DEV = false;
    var FREEZE_MOMENT = false;

    var TABLE_ITEM_WIDTH = 100;
    var TABLE_ITEM_HEIGHT = 40;
    
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
    // 固定场组件
    var fixedCourt = window.$fixedCourt;

    fixedCourt.init();

    function error(res) {
        loadingBox.hide();
        alert('网络错误');
    }

    function precook(obj,str){
        // if ( str === 'debugger' ) debugger;
        if ( !obj ) return false;
        obj.status = String(obj.status);
        obj.card_id = String(obj.card_id);
        var type = 'noting';
        if (obj.status == '0') {
            type = 'noting';
            obj.__name__ = "";
            obj.__phone__ = "";
            if (Number(obj.price) === 0) {
                type = 'lock_icon';
            }
        } else if (obj.status == '1') {
            type = 'lock';
            // debugger;
            obj.__name__ = obj.name;
            obj.__phone__ = obj.phone;
            if ( obj.card_id != '0' ){
                type = 'member';
                obj.__phone__ = obj.card_no;
                
            }
            if (!obj.__name__ && !obj.__phone__) {
                type = 'lock_icon';
            }
        } else if (obj.status == '2') {
            type = 'net';
            obj.__name__ = obj.user_name;
            obj.__phone__ = obj.mobile;
            if (obj.utm_medium == 'reserve') {
                type = 'reserve';
            }
            // 趣运动会员订单
            if ( obj.card_detail ) {
                type = 'member';
                obj.__name__ = obj.name;
                obj.__phone__ = obj.card_no;
            }
        } else if (obj.status == '3') {
            type = 'net_paying';
            if (obj.utm_medium == 'reserve') {
                type = 'reserveing';
            }
        }
        obj['__type__'] = type;
        
        return obj
    }

    function compare(objL,objR,compareList){
        // if ( objL.course_number == 13 && objL.start_time == 960 ) debugger;
        var count = 0;
        for (var i = 0 ; i < compareList.length ; i ++ ) {
          var l = getAttr(objL,compareList[i].l);
          var r = getAttr(objR,compareList[i].r);

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
            } else {
                obj = undefined;
            }
          }
          return obj;
        }
    }

    function addCode(obj,j,start_time){
        // console.log(obj,j,start_time);
        var code = j + ',' + start_time;
        obj.__code__ = code;
    }

    function timeToWidth(num){
      if ( typeof num !== 'number' ) return 0;
      return (num - main.render.startTime) / 60;
    }

    function getTopByC(c){
        var c = Number(c);
        return c * TABLE_ITEM_HEIGHT;
    }

    function getLeftByT(t){
        var t = Number(t);
        return timeToWidth(t) * TABLE_ITEM_WIDTH;
    }

    function findCourtNameByY(y){
        return main.courseList[y].course_name;
    }

    // 拉取主数据 和 渲染
    var main = {
        getGoodsConfigData: {},
        data: {},
        cookDataFn2Data: [],
        courseList:[],
        timeListNumber:[],
        timeListHalfNumber:[],
        timestamp:null,
        snapshotData:[],
        isAfterNineDay:false,
        goodsIdMap:{},
        getInfoFormHash:function(){
            var hash = window.location.hash.replace('#','');
            var hashDate = getInformation(hash).date;
            var hashCat = getInformation(hash).cat_id;
            var date = new Date(hashDate).getTime();
            // not NaN 合法日期
            if ( date === date && hashDate.split('-').length === 3 ) this.getGoodsConfigData.book_date = hashDate;
            if ( hashCat ) this.getGoodsConfigData.cat_id = hashCat;
        },
        init: function() {
            var that = this;
            this.getInfoFormHash();
            this.getData(function() {
               
                that.render.venuesConfig = that.data.venuesConfig;
                // 数据处理2.0
                that.cookDataFn2();
                // 数据处理
                that.cookDataFn();
                // title处理
                that.preCookTitle();
                // 初次渲染全部
                that.render.renderAll();
                // 场地时间栏固定
                that.render.topFixed();
                // 渲染项目
                cat.init(that.data);
                // 时间栏
                dateBar.init(that.data);
                // 场地设置
                venuesConfig.init(that.data.venuesConfig);
                // 管理员发短信
                admin.init(that.data.adminList);
                // 锁定模块
                lockCourt.init(that.data.venuesConfig);
                // 图例模块
                icon_example.init();
                // 定时
                messagerBox.init();
                // documentBind
                domcumentBind.init();
            });
            
        },
        reload:function(){
            var that = this;
            // 九天前
            // if ( this.data.goodsList.length > 0 ) {

                // 数据处理2.0
                this.cookDataFn2();
                // 数据处理
                this.cookDataFn();
                // title处理
                this.preCookTitle();

                // 渲染项目
                cat.init(that.data);
                // 时间栏
                dateBar.init(that.data);

                // 渲染
                
                this.render.renderTop();
                this.render.renderSide();
                this.render.reRenderAfterCookDataEdit();
                // 图例模块
                icon_example.setPosition();

                contextmenu.hide();
            // }
            
        },
        snapshot:function(){
            this.render.clearAfterCookDataEdit();
            this.snapshotData.push(JSON.parse(JSON.stringify(this.cookDataFn2Data)));
            // console.log(this);
        },
        findJUseCourseNumber:function(course_number){
            var j = 0;
            $.each(this.courseList,function(index,item){
                if ( item.course_number == course_number ) j = item.index;
            });
            return j;
        },
        formatCookData:function(){
            var that = this;
            $.each(this.cookDataFn2Data,function(index,item){
                $.each(that.timeListHalfNumber,function(i,name){
                    that.nineDayAfterDataFormat(item[name]);
                });
            });
        },
        nineDayAfterDataFormat:function(obj){
                obj.status = '0';
                obj.goods_id = '-1';
                obj.price = '-1';
                obj.order_id = '';
                obj.order_status = '';
                obj.name = '';
                obj.phone = '';
                obj.card_id = '0';
                obj.card_no = '';
                obj.user_name = '';
                obj.mobile = '';
                obj.utm_medium = '';
                obj.__type__ = '';
                obj.__name__ = '';
                obj.__phone__ = '';
                obj.__select__ = false;
                obj.changeCode = null;
            return precook(obj);
        },
        mapGoodsId:function(obj){
            var goods_id = obj.goods_id;
            if ( goods_id ) {
                if ( !this.goodsIdMap[goods_id] ) this.goodsIdMap[goods_id] = [];
                this.goodsIdMap[goods_id].push({
                    j:obj.__y__,
                    s:obj.start_time,
                });
            } 
        },
        // 换场订单title更变 不用order_detail
        // 
        preCookTitle:function(){
            var that = this;
            var data = this.cookDataFn2Data;
            var titleArray = [];
            var order_sn_obj = {}; 
            $.each(data,function(index,item){
                $.each(that.timeListHalfNumber,function(i,it){
                    if ( item[it].title ) {
                        titleArray.push(item[it]);
                        if ( !order_sn_obj[item[it].order_sn] ) order_sn_obj[item[it].order_sn] = [];
                        order_sn_obj[item[it].order_sn].push(item[it]);
                    }
                });
            });
            // console.log(titleArray);
            // console.log(order_sn_obj);
            $.each(order_sn_obj,function(name,item){
                var title = '';
                $.each(item,function(i,it){
                    var it_title = findCourtNameByY(it.__y__) + ' ' + it.hour + '\n';
                    if ( title.indexOf(it_title) === -1 )  title += it_title;
                });

                $.each(item,function(i,it){
                    it.title = replaceTitle(it.title,title);
                });
            });

            function replaceTitle(ori_title,inset){
                // console.log(ori_title,inset);
                var head = ori_title.split('订单场次：')[0];
                var foot = ori_title.split('------------')[1];
                return head + '订单场次：' + '\n' + inset + '------------' +  foot;
            }
        },
        cookDataFn2:function() {
            this.render.clearAll();
            var that = this;

            // 时间数字化
            this.timeListNumber = [];
            this.timeListHalfNumber = [];
            $.each(this.data.hourList,function(index,item){
                that.timeListNumber.push(timeFormat(item));
                that.timeListHalfNumber.push(timeFormat(item));
                that.timeListHalfNumber.push(timeFormat(item) + 30);
            });
            // console.log(this.timeListNumber,this.timeListHalfNumber);
            // 场地半点化
            this.cookDataFn2Data = [];
            this.courseList = [];
            this.goodsIdMap = {};

            var dataList = this.data.goodsList || this.data.courseList;
            // 整点和场地的唯一标识
            $.each(dataList,function(index,item){

                that.courseList.push({
                    course_name:item.course_name,
                    course_id:item.course_id,
                    course_number:item.course_number,
                    index:index
                });

                that.cookDataFn2Data.push({});
                $.each(that.timeListNumber,function(i,t){
                    if ( dataList[index].item ) {
                        var it = dataList[index].item[i];
                        var start = timeFormat(it.hour.split('-')[0]);
                        var end = timeFormat(it.hour.split('-')[1]);
                        var before_start = start;
                        var after_start = end - 30;
                    } else {
                        var it = {};
                        var start = t
                        var end = t + 60
                        var before_start = start;
                        var after_start = end - 30;
                    }

                    var originObj = {
                        __symbol__:item.course_number + '-' + t,
                        __y__:index,
                        hour:it.hour,
                        start_time:start,
                        course_number:item.course_number,
                        end_time:end,
                        status:String(it.status),
                        goods_id:it.goods_id,
                        order_sn:it.order_sn,
                        price:it.price,
                        order_id:it.order_id,
                        order_status:it.order_status,
                        name:'',
                        phone:'',
                        card_id:'0',
                        card_no:'',
                        user_name:it.user_name,
                        user_id:it.user_id,
                        mobile:it.mobile,
                        utm_medium:it.utm_medium,
                        changeCode:null,
                        card_detail:false,
                        sale_list:false,
                        sale_action_time:false,
                    }
                    if ( it.status == 2 ) {
                        // 趣运动会员订单
                        if ( it.card_detail && it.card_detail.card_no != '' ) {
                            // console.log(it.card_detail)
                            originObj.name = it.card_detail.card_holder;
                            originObj.phone = it.card_detail.card_mobile_phone;
                            originObj.card_no = it.card_detail.card_no;
                            originObj.card_detail = true;
                        }

                        // 卖品
                        if ( it.sale_list && it.sale_list.length > 0 ) {
                            originObj.sale_list = it.sale_list;
                            originObj.sale_action_time = it.sale_action_time;
                            
                        }

                        // title
                        if ( !(it.card_detail && it.card_detail.card_no != '') ) {
                            originObj.title = "\n"
                                             +"订 单 号："+ it.order_sn + "\n" 
                                             +"场次金额：￥"+ it.goods_amount +"\n"
                                             +"手机尾号："+ it.mobile_tail +"\n"
                                             +"支付时间："+ it.pay_time +"\n"
                                             +"使用日期："+ it.book_date +"\n"
                                             +"订单场次："+"\n";
                            it.goods_detail && $.each(it.goods_detail,function(k,t){
                                originObj.title += t +"\n";
                            });
                            originObj.title += "------------" +"\n";
                        }
                        // 卖品title
                        if ( it.sale_list && it.sale_list.length > 0 ) {
                            originObj.title += "商品金额：￥"+ it.sale_amount + "\n";
                            originObj.title += "附带商品："+"\n";
                            $.each(it.sale_list,function(k,t){
                                originObj.title += t.name +'X' + t.num +"\n";
                            });
                        }
                    }
                    var before = JSON.parse(JSON.stringify(originObj));
                    var after = JSON.parse(JSON.stringify(originObj));
                    before.end_time = start + 30;
                    after.start_time = end - 30;
                    // 有半点
                    if ( it.status == 1 ) {
                        // 只有一个半点
                        if ( it.m_info.length == 1 ) {
                            // 前半点
                            if ( it.m_info[0].half_tips == '1' ) {
                                _copyAttr(before,it.m_info[0]);
                                after.status = 0;
                            // 后半点
                            } else if ( it.m_info[0].half_tips == '2' ) {
                                _copyAttr(after,it.m_info[0]);
                                before.status = 0;
                            } else if ( it.m_info[0].half_tips == '0' ) {
                                _copyAttr(before,it.m_info[0]);
                                _copyAttr(after,it.m_info[0]);
                            }
                        } else if ( it.m_info.length == 2 ) {
                            $.each(it.m_info,function(j,t){
                                if (t.half_tips == '1') _copyAttr(before,t);
                                if (t.half_tips == '2') _copyAttr(after,t);
                            });
                        }
                    }
                    that.cookDataFn2Data[index][before_start] = before;
                    that.cookDataFn2Data[index][after_start] = after;

                    that.mapGoodsId(before);
                    that.mapGoodsId(after);
                });
            });

            if ( this.isAfterNineDay ) {

                this.render.display('show');
                this.formatCookData();

                $.each(this.data.goodsListLater,function(index,item){

                    if ( item.status != '0' ) {
                        var j = that.findJUseCourseNumber(item.course_number);
                        var start = timeFormat(item.start_time);
                        var end = timeFormat(item.end_time);
                        if ( end - start == 60 ) {
                           var before = main.cookDataFn2Data[j][start];
                           var after = main.cookDataFn2Data[j][start + 30];
                           _copyAttrAfterNineDay(before,item);
                           _copyAttrAfterNineDay(after,item);
                           precook(before);
                           precook(after);
                        } else {
                            var half = main.cookDataFn2Data[j][start];
                            _copyAttrAfterNineDay(half,item);
                            precook(half);
                        }
                    }
                });

            } else {

                if ( this.data.goodsList.length === 0 ) {
                    this.render.display('empty');
                } else {
                    this.render.display('show');
                }
            }

            $.each(that.courseList,function(index,item){
                $.each(that.timeListHalfNumber,function(i,it){
                    addCode(that.cookDataFn2Data[index][it],index,it);
                });
            });
            
            $.each(that.cookDataFn2Data,function(name,item){
                $.each(item,function(n,it){
                    precook(it);
                });
            });

            function _copyAttr(copyObj,oriObj){
                copyObj.name = oriObj.name;
                copyObj.phone = oriObj.phone;
                copyObj.card_id = oriObj.card_id;
                copyObj.card_no = oriObj.card_no;
                copyObj.goods_id = oriObj.goods_id;
            }

            // 九天后的 id 当作 goods_id 来用 区别于九天后的 price 赋值为 '-1'
            function _copyAttrAfterNineDay(copyObj,oriObj){
                if ( !copyObj ) return false; 
                if ( !oriObj ) return false; 
                copyObj.status = oriObj.status;
                copyObj.name = oriObj.name;
                copyObj.phone = oriObj.phone;
                copyObj.card_id = oriObj.card_id;
                copyObj.card_no = oriObj.card_no;
                copyObj.goods_id = '-1';
                copyObj.lock_id = oriObj.id;
            }

            // console.log(main);
            // 查找合并的data
            // 
            this.render.sortData.data = this.cookDataFn2Data;
            return true;
        },
        cookDataFn: function() {
            var that = this;
            
            // 场地时间栏数据处理
            $.each(this.data.hourList, function(index, item) {
                if (index === 0) that.render.startTime = timeFormat(item);
                that.render.topData.push({ name: item });
                that.render.topData.push({ name: '' });
            });
            // 场地名称栏数据处理
            !this.isAfterNineDay && $.each(this.data.goodsList, function(index, item) {
                that.render.sideData.push({
                    name: item.course_name,
                    id: item.course_id
                });
            });

            !!this.isAfterNineDay && $.each(this.data.courseList, function(index, item) {
                that.render.sideData.push({
                    name: item.course_name,
                    id: item.course_id
                });
            });

            // 场地数据查找合并项
            this.render.mainDataCook();
        },
        render: {
            venuesConfig:{},
            $top: $('#tableTop'),
            $topFixed: $('#tableTopFixed'),
            $side: $('#tableSide'),
            $main: $('#tableMain'),
            ITEM_HEIGHT: TABLE_ITEM_HEIGHT,
            ITEM_WIDTH: TABLE_ITEM_WIDTH,
            topData: [],
            sideData: [],
            startTime:0,
            sortData:{
                data: [], x: [], y: [], mix: [] ,
            },
            timeToWidth: timeToWidth,
            display:function(type){
                if ( type === 'empty' ) {
                    $('#mainCourt').addClass('hide');
                    $('#empty').removeClass('hide');
                }

                if ( type === 'show' ) {
                    $('#mainCourt').removeClass('hide');
                    $('#empty').addClass('hide');
                }
            },
            clearAll: function() {
                this.topData = [];
                this.sideData = [];
                this.sortData = {
                    data: [], x: [], y: [], mix: [] ,
                };
                this.$main.find('li').remove();
            },
            clearAfterCookDataEdit:function(){
                $.each(this.sortData.data,function(index,item){
                    $.each(main.timeListHalfNumber,function(i,name){
                        item[name].__XID__ = undefined;
                        item[name].__YID__ = undefined;
                        item[name].__select__ = false;
                        item[name].__li__ && (item[name].__li__ = null);
                        item[name].__mix__ && (item[name].__mix__ = null);
                    });
                });
                this.sortData = {
                    data: main.cookDataFn2Data, x: [], y: [], mix: [] ,
                };
                this.$main.find('li').remove();
            },
            reRenderAfterCookDataEdit:function(){
                main.preCookTitle();
                contextmenu.hide();
                this.clearAfterCookDataEdit();
                this.mainDataCook();
                this.renderMain();
                this.renderMix();
            },
            mainDataCook: function() {
                
                var that = this;
                // 数据分类存放
                dataFormatMix(dataFormatY(dataFormatX(this.sortData)));
                // 
                // 查找横向可合并
                function dataFormatX(obj) {
                    var XID = 0;
                    $.each(obj.data, function(index, item) {
                        $.each(main.timeListHalfNumber,function(i,name){
                            // debugger;
                            var it = item[name];
                            var oName = it.__name__;
                            var oPhone = it.__phone__;
                            var oType = it.__type__;
                            if (oType !== 'noting'  && oType !== 'reserveing') {
                                // debugger;
                                
                                var nextItem = item[name + 30] || {};
                                var nName = nextItem.__name__;
                                var nPhone = nextItem.__phone__;
                                var nType = nextItem.__type__;
                                if (oName === nName && oPhone === nPhone && oType === nType ) {
                                    if (it.__XID__ === undefined) {
                                        it.__XID__ = XID;
                                        nextItem.__XID__ = XID;
                                        XID++;
                                    } else {
                                        nextItem.__XID__ = it.__XID__;
                                    }
                                } else if (it.__XID__ === undefined) {
                                    it.__XID__ = XID;
                                    XID++;
                                }
                            } 
                        });

                        $.each(item, function(name, it) {
                            if (it.__XID__ || it.__XID__ === 0) {
                                if ( !obj.x[index] ) {
                                  obj.x[index] = [];
                                }
                                if ( !obj.x[index][it.__XID__] ) {
                                  obj.x[index][it.__XID__] = [];
                                }
                                
                                obj.x[index][it.__XID__].push(it);
                            }
                        });
                    });

                    
                    $.each(obj.x, function(index, item) {
                        if (item) $.each(item, function(i, it) {
                          var sn = '';
                          if (it) $.each(it,function(j,t){
                            sn += t.__name__ + ',' + t.__phone__ + ',' + t.__type__ + ',' + t.start_time + ',' + t.end_time + ',';
                          });
                          if (it) $.each(it,function(j,t){
                            t.__sn__ = sn;
                          });
                        });
                    });

                    $.each(obj.x, function(index, item) {
                        if (item) $.each(item, function(i, it) {
                          if (it) $.each(it, function(i, t) {
                            var h = (t.__XID__ * 99) % 360;
                            t.__color__ = 'hsl(' + h + ',80%,80%)';
                          });
                        });
                    });
                    return obj;
                }

                // 查找纵向可合并
                function dataFormatY(obj) {
                    var YID = 0;
                    $.each(obj.x, function(index, item) {
                        // debugger;
                      if (item) $.each(item,function(i,it){
                        if ( !it ) return;
                        var oSn = it[0].__sn__;
                        if (it[0].__YID__ === undefined) it[0].__YID__ = YID ++;
                        if ( obj.x[index+1] ) {
                          $.each(obj.x[index+1],function(j,t){
                            if ( !t ) return;
                            var nSn = t[0].__sn__;
                            if ( oSn === nSn ) t[0].__YID__ = it[0].__YID__;
                          });
                        }
                      });
                        
                    });

                    $.each(obj.x, function(index, item) {
                        if (item) $.each(item, function(i, it) {
                          if ( !it ) return;
                          if (it[0].__YID__ || it[0].__YID__ === 0) {
                            if ( !obj.y[it[0].__YID__] ) obj.y[it[0].__YID__] = [];
                            $.each(it,function(j,t){
                              obj.y[it[0].__YID__].push(t);
                            });
                          }
                        });
                    });
                    return obj;
                }

                function dataFormatMix(obj) {
                    $.each(obj.y, function(index, item) {
                        // console.log(item);
                        if ( item[0].__type__ === 'lock_icon' ) {
                            if ( item.length === 2 && item[0].__y__ === item[1].__y__ && item[0].hour !== item[1].hour ) {
                                obj.mix.push(item);
                            }
                        } else if (item.length > 2 ) {
                            obj.mix.push(item);
                        } else if ( item.length === 2) {
                            if (item[0].__symbol__ != item[1].__symbol__ ) {
                                obj.mix.push(item);
                            }
                        }
                    });
                    return obj;
                }

            },
            topFixed: function() {
                var that = this;
                $(window).scroll(function() {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > 180) {
                        that.$topFixed.removeClass('hide').css('top', (scrollTop - 140) + 'px');
                    } else {
                        that.$topFixed.addClass('hide');
                    }
                });
            },
            renderTop: function() {
                var _html = '';
                var that = this;
                $.each(this.topData, function(index, item) {
                    var name = item.name;
                    if ( DEV ) name = timeFormat(item.name);
                    if ( index === that.topData.length - 1) {
                        name = strFormatTime(timeFormat(that.topData[that.topData.length - 2].name) + 60);
                        _html += "<th><span style='width:" + (that.ITEM_WIDTH / 2) + "px;text-indent:0;text-align:right;'>" + name + "</span></th>";
                    } else {
                        _html += "<th><span style='width:" + (that.ITEM_WIDTH / 2) + "px;'>" + name + "</span></th>";
                    }
                });
                this.width = this.ITEM_WIDTH * this.topData.length / 2;
                this.$top.parent().parent().css('width', this.ITEM_WIDTH * this.topData.length / 2 + 'px');
                this.$topFixed.parent().parent().css('width', this.ITEM_WIDTH * this.topData.length / 2 + 'px');
                this.$top.html(_html);
                this.$topFixed.html(_html).css('width', this.ITEM_WIDTH * this.topData.length / 2 + 'px');
            },
            renderSide: function() {
                var _html = '<tr><td></td></tr>';
                $.each(this.sideData, function(index, item) {
                    _html += "<tr><td title='" + item.name + "'>" + item.name + "</td></tr>";
                });
                this.$side.html(_html);
            },
            showMemberNameSwitch:function(){
                var that = this;
                if ( this.venuesConfig.member_display == 0 ) {
                    $('#tableMain .member-em-name').addClass('hide');
                } else {
                    $('#tableMain .member-em-name').removeClass('hide');
                }
            },
            renderMixSwitch:function(){

              if ( this.venuesConfig.order_display == 0 ) {
                $.each(this.sortData.mix, function(index, item) {
                    $(item[0].__mix__).addClass('hide');
                    $.each(item, function(k, it) {
                        $(it.__li__).removeClass('hide');
                    });
                });
              } else {
                $.each(this.sortData.mix, function(index, item) {
                    $(item[0].__mix__).removeClass('hide');
                    $.each(item, function(k, it) {
                        $(it.__li__).addClass('hide');
                    });
                });
              }


            },
            renderMix: function() {
                var that = this;
                $.each(this.sortData.mix, function(index, item) {
                    var sale = false;
                    var i = that.timeToWidth(item[0].start_time);
                    var j = item[0].__y__;
                    var width = (item[item.length - 1].end_time - item[0].start_time) / 60;
                    var height = (item[item.length - 1].__y__ - item[0].__y__) + 1;
                    var ox = 0;
                    var titleList = [];
                    $.each(item,function(i,t){
                        titleList.push(t.title);
                        if ( t.sale_action_time === '0' ) sale = true;
                    });
                    var mix_title = cookTitle(titleList);
                    // console.log(item);
                    var li = that.createLi(i, j, ox, width, height, item[0], 'mix', mix_title, sale);
                    li.__data__ = [];
                    $.each(item, function(k, it) {
                        it.__mix__ = li;
                        li.__data__.push(it);
                    });
                });

                $.each(this.sortData.mix, function(index, item) {
                    that.$main[0].appendChild(item[0].__mix__);
                });
                this.renderMixSwitch();
                this.showMemberNameSwitch();
            },
            renderMain: function() {

                var that = this;
                var colspan = this.topData.length;
                var rowspan = this.sideData.length;
                this.$main.parent().attr('colspan', colspan).attr('rowspan', rowspan);
                this.$main.css({'height': this.ITEM_HEIGHT * rowspan + 50 + 'px', 'width':this.ITEM_WIDTH * colspan / 2 + 'px' });

                
                var compareList = [
                  {l:['status'],r:['status']},
                  {l:['goods_id'],r:['goods_id']},
                  {l:['price'],r:['price']},
                  {l:['order_id'],r:['order_id']},
                  {l:['order_status'],r:['order_status']},
                  {l:['name'],r:['name']},
                  {l:['phone'],r:['phone']},
                  {l:['card_id'],r:['card_id']},
                  {l:['card_no'],r:['card_no']},
                  {l:['user_name'],r:['user_name']},
                  {l:['mobile'],r:['mobile']},
                  {l:['utm_medium'],r:['utm_medium']},
                ];
                $.each(main.cookDataFn2Data,function(j,item){
                    $.each(main.timeListNumber,function(i,it){
                        var sale = ( item[it].sale_action_time === '0' ? true : false );
                        if (compare(item[it],item[it+30],compareList)) {
                            var li = that.createLi(i, j, 0, 1, 1, item[it] ,'main' ,false ,sale);
                            li.__data__ = [item[it]];
                            item[it].__li__ = li;
                            item[it+30].__li__ = li;
                            that.$main[0].appendChild(li);
                        } else {
                            var before = that.createLi(i, j, 0, 0.5, 1, item[it] ,'before' ,false ,sale);
                            before.__data__ = [item[it]];
                            item[it].__li__ = before;
                            var after = that.createLi(i, j, 0.5, 0.5, 1, item[it+30] ,'after' ,false ,sale);
                            after.__data__ = [item[it+30]];
                            item[it+30].__li__ = after;
                            that.$main[0].appendChild(before);
                            that.$main[0].appendChild(after);
                        }
                    });
                });
                this.showMemberNameSwitch();
            },
            createLi: function(i, j, ox, witdth, height, it, type, mix_title, sale) {
                var li = document.createElement('li');
                var obj = this.createContent(it);
                var color = it.__color__ || '';
                var sn = it.__sn__ || '';
                var top = j * this.ITEM_HEIGHT;
                var left = (i+ox) * this.ITEM_WIDTH;
                li.style.height = (this.ITEM_HEIGHT * height - 4) + 'px';
                li.style.lineHeight = (this.ITEM_HEIGHT * height - 8) + 'px';
                li.style.width = (this.ITEM_WIDTH * witdth  - 4) + 'px';
                li.style.top = top + 'px';
                li.style.left = left + 'px';
                // li.style.color = color;
                li.setAttribute('data-i', i);
                li.setAttribute('data-i', i);
                li.setAttribute('data-goods', it.goods_id);
                li.setAttribute('data-lock', it.lock_id);
                li.setAttribute('data-top', top);
                li.setAttribute('data-left', left);
                li.setAttribute('data-sn', sn);
                li.setAttribute('data-color', obj.color);
                li.setAttribute('data-type', type);
                li.setAttribute('data-height', height);
                li.setAttribute('data-width', witdth);
                li.setAttribute('data-start_time', it.start_time);
                sale && li.setAttribute('data-sale', '');

                if ( it.status != 0 && it.status != 3 ) li.setAttribute('data-can-move','');

                if ( it.__type__ == 'noting' ) li.setAttribute('data-nothing','');

                var title = ""
                            +"姓名："+ it.name +"\n"
                            +"手机："+ it.phone ;
                if ( it.__type__ == 'lock' ) li.setAttribute('title',title);

                if ( it.title ) title = it.title;
                if ( mix_title ) title = mix_title;
                if ( it.status == 2 ) {
                    li.setAttribute('title',title);
                }
                if ( it.__type__ == 'member' ) {
                    title = ""
                            +"卡号："+ it.card_no +"\n" + title; 
                    li.setAttribute('title',title);
                }

                if ( it.__select__ ) li.setAttribute('data-selected','');
                li.innerHTML = obj.content;
                this.liBindFn(li);
                return li;
            },
            liBindFn: function(li) {
                // $(li).on('mouseup',function(e){
                //     if ( FREEZE_MOMENT ) return false;
                //     main.action.mouseup(this,e);
                // });
                $(li).on('mousedown',function(e){
                    if ( FREEZE_MOMENT ) return false;
                    e.preventDefault()
                    main.action.mousedown(this,e);
                });
                // $(li).on('mousemove',function(e){
                //     if ( FREEZE_MOMENT ) return false;
                //     main.action.mousemove(this,e);
                // });
                $(li).on('mouseenter',function(e){
                    if ( FREEZE_MOMENT ) return false;
                    main.action.mouseenter(this,e);
                });
                $(li).on('mouseleave',function(e){
                    if ( FREEZE_MOMENT ) return false;
                    main.action.mouseleave(this,e);
                });
                $(li).click(function() {
                    if ( FREEZE_MOMENT ) return false;
                    contextmenu.hide();
                    if ( this.getAttribute('data-mouse-status') === '0' ) {
                        this.__data__ && this.__data__[0].__type__ === 'noting' && main.action.liSelected(this);
                        this.__data__ && this.__data__[0].__type__ === 'lock' && main.action.unlock(this);
                        this.__data__ && this.__data__[0].__type__ === 'member' && main.action.unlock(this);
                        this.__data__ && this.__data__[0].__type__ === 'lock_icon' && main.action.unlock(this);
                        this.__data__ && this.__data__[0].__type__ === 'reserveing' && main.action.reserveing(this);
                        this.__data__ && this.__data__[0].__type__ === 'net' && this.getAttribute('data-type') === 'main' && this.getAttribute('data-sale') === '' && main.action.sale(this);
                    }
                });
                $(li).on('contextmenu', function(e) {
                    if ( FREEZE_MOMENT ) return false;
                    contextmenu.hide();
                    if (e && e.preventDefault) {
                        e.preventDefault();
                    } else {
                        //IE中阻止函数器默认动作的方式 
                        window.event.returnValue = false;
                    }
                    this.__data__ && this.__data__[0].__type__ === 'noting' && this.__data__[0].__select__ && main.action.lockCourt(this);
                    this.__data__ && this.__data__[0].__type__ === 'lock' && main.action.showContextmenu(this,'lock',e);
                    this.__data__ && this.__data__[0].__type__ === 'lock_icon' && main.action.showContextmenu(this,'lock_icon',e);
                    this.__data__ && this.__data__[0].__type__ === 'member' && main.action.showContextmenu(this,'member',e);
                    this.__data__ && this.__data__[0].__type__ === 'net' && main.action.showContextmenu(this,'member',e);
                    this.__data__ && this.__data__[0].__type__ === 'reserve' && main.action.showContextmenu(this,'member',e);
                });
            },
            createContent: function(item) {
                var obj = {
                    content: '',
                    color: ''
                }
                var phone = item.__phone__ || '';
                var name = item.__name__ || '';
                if (!!item) {
                    if (item.__type__ == 'noting') {
                        obj.content = "<div class='sale'></div><div></div>";
                        obj.color = '';
                    } else if (item.__type__ == 'lock') {
                        obj.content = "<div class='sale'></div><div><em>" + phone + "</em><em class='lock-em-name'>" + name + "</em></div>";
                        obj.color = 'lock';
                    } else if (item.__type__ == 'lock_icon') {
                        obj.content = "<div class='sale'></div><div><i class='lock'></i></div>";
                        obj.color = 'lock_icon';
                    } else if (item.__type__ == 'net') {
                        obj.content = "<div class='sale'></div><div><i class='money'></i>" + phone.substr(phone.length - 4, 4) + "</div>";
                        obj.color = 'net';
                    } else if (item.__type__ == 'net_paying') {
                        obj.content = "<div class='sale'></div><div>支付中</div>";
                        obj.color = 'net_paying';
                    } else if (item.__type__ == 'reserve') {
                        obj.content = "<div class='sale'></div><div><i class='money'></i>" + phone.substr(phone.length - 4, 4) + "</div>";
                        obj.color = 'reserve';
                    } else if (item.__type__ == 'reserveing') {
                        obj.content = "<div class='sale'></div><div>预留中</div>";
                        obj.color = 'reserveing';
                    } else if (item.__type__ == 'member') {
                        obj.content = "<div class='sale'></div><div><em>" + phone + "</em><em  class='member-em-name'>" + name + "</em></div>";
                        obj.color = 'member';
                    }
                }

                return obj;
            },
            renderAll: function() {
                this.renderTop();
                this.renderSide();
                this.renderMain();
                this.renderMix();
            },
        },
        action: {
            sale:function(dom){
                mouseFn.askForWhetherAjax(function(){
                    sale.check(dom);
                });
            },
            reserveing:function(dom){
                reserveBox.show(dom);
            },
            mouseleave: function(dom,e){
                var $sideCourseList = $('#tableSide td');
                $sideCourseList.removeClass('cur');
                $('#tableMain li').removeClass('highlight').removeClass('mark');
                // mouseFn.mouseleave(dom,e);
            },
            mouseenter: function(dom,e){
                
                if ( dom.__data__[0].__type__ === 'noting'  ) {
                    $(dom).addClass('highlight');
                    var j = dom.__data__[0].__y__;
                    var s = dom.__data__[0].start_time;
                    markLeftAndTopLi(j,s);
                }
                var $sideCourseList = $('#tableSide td');
                $sideCourseList.css({
                    'border-top-right-radius': '0px',
                    'border-top-left-radius': '0px',
                    'border-bottom-left-radius': '0px',
                    'border-bottom-right-radius': '0px',
                });
                $sideCourseList.removeClass('cur');
                var type = dom.__data__[0].__type__;
                var jlist = [];
                $.each(dom.__data__,function(index,item){
                    jlist.push(item.__y__);
                });
                $.each(jlist,function(index,item){
                    $sideCourseList.eq(item + 1).addClass('cur');
                    if ( index === 0 ) {
                        $sideCourseList.eq(item + 1).css({
                            'border-top-right-radius': '5px',
                            'border-top-left-radius': '5px',
                        });
                    }
                    if ( index === jlist.length - 1 ){
                        $sideCourseList.eq(item + 1).css({
                            'border-bottom-left-radius': '5px',
                            'border-bottom-right-radius': '5px',
                        });
                    } 
                });
                var top = dom.getAttribute('data-top');
                var left = dom.getAttribute('data-left');
                var width = dom.getAttribute('data-width');
            },
            mousedown:function(dom,e){
                mouseFn.mousedown(dom,e);
            },
            // mouseup:function(dom,e){
            //     mouseFn.mouseup(dom,e);
            // },
            // mousemove:function(dom,e){
            //     mouseFn.mousemove(dom,e);
            // },
            unlock: function(dom) {
                mouseFn.askForWhetherAjax(function(){
                    unlock.start(dom);
                });
            },
            lockCourt: function(dom) {
                mouseFn.askForWhetherAjax(function(){
                    lockCourt.show(dom);
                });
            },
            showContextmenu: function(dom,type,e){
                contextmenu.moveTo(dom,type,e);
            },
            liSelected: function(dom) {
                var data = dom.__data__[0];
                mouseFn.askForWhetherAjax(function(){
                   if (data && data.__type__ === 'noting') {
                       if (!data.__select__) {
                           data.__select__ = true;
                           dom.setAttribute('data-selected', '');
                       } else {
                           data.__select__ = false;
                           dom.removeAttribute('data-selected');
                       }
                   } 
                });
            },
        },
        getData: function(fn) {
            var that = this;
            mouseFn.askForWhetherAjax(function(){
                that.datAfetch(fn);
            });
        },
        datAfetch:function(fn){
            loadingBox.show();
            // this.data = json;
            // if (typeof fn === 'function') fn();
            // data save
            var searchDate = new Date(this.getGoodsConfigData.book_date || NOW_DATE);
            var today = new Date(NOW_DATE);
            this.isAfterNineDay = !!( searchDate - today >= 9*24*60*60*1000 );

            var that = this;
            
            var success = function(res) {
                loadingBox.hide();
                if (res.status === '0000') {
                    that.timestamp = new Date().getTime();
                    that.data = res.data;
                    // console.log(JSON.stringify(res.data), '', '\t');
                    if (typeof fn === 'function') fn();
                } else {
                    tipsBox.show(res.msg + ' \n ' + '请刷新页面重试' );
                }
            }

            var error = error;


            if ( this.isAfterNineDay ) {
                // 9天后
                ajaxGoodslistLater(this.getGoodsConfigData, success, error);
            } else {
                // 9天内
                ajaxGoodslist(this.getGoodsConfigData, success, error);
            }
        }
    }

    function markLeftAndTopLi(j,s){
        $.each(main.cookDataFn2Data,function(index,item){
            $.each(main.timeListHalfNumber,function(i,it){
                if ( (it === s && index < j) || ( index === j && it < s ) ) {
                   var dom =  main.cookDataFn2Data[index][it].__li__;
                   if ( dom.getAttribute('data-type') === 'main' ) $(dom).addClass('mark');
                }
            });
        });
    }

    // document的绑定事件
    // 
    var domcumentBind = {
        init:function(){
            $(document).on('click',this.contextmenuHide);
        },
        contextmenuHide:function(){
            contextmenu.hide();
        }
    }

    // 商品验证
    // 
    var sale = {
        check:function(dom){
            var data = dom.__data__[0];
            var desc = '';
            $.each(data.sale_list,function(index,item){
                desc += item.name + ' X' + item.num + '<br>';
            });
            var orderId = data.order_id;
            var ajaxData = {
             'order_id': orderId
            }
            var success = function(res){
                loadingBox.hide();
                if ( typeof res === 'object' ) {
                    var data = res;
                } else {
                    var data = JSON.parse(res);
                }
                if ( data.status == '0000' ) {
                    main.getData(function(){
                        main.reload();
                    });
                } else {
                    tipsBox.show(data.msg);
                }
            }
            var error = error;
            commonDialogBox.show({
              title:'用户拿取商品后，请点击确定',
              desc:desc,
              sureText:'确认'
            },function(){
              loadingBox.show();
              ajaxSaleGoodsCheck(ajaxData,success,error);
            });
        }
    }

    var saleGoodsCheckURL = '/Order/saleGoodsCheck/';

    function ajaxSaleGoodsCheck(data,success,error){
        $.ajax({
            url:saleGoodsCheckURL,
            data:data,
            type:'get',
            success:success,
            error:error
        });
    }

    // 场地移动鼠标操作集合
    var mouseFn = {
        dom:null,
        domArea:null,
        changeList:false,
        area:false,
        status:0,
        timer:null,
        TIME:3000,
        ajaxing:false,
        canExChange:false,
        exitTipsOn:function(str){
            // console.log('exitTipsOn:'+str);
            window.onbeforeunload = function(){
              return '';
            } 
        },
        exitTipsOff:function(str){
            // console.log('exitTipsOff:'+str)
            window.onbeforeunload = function(){} 
        },
        documentOnFn:function(){
            $(document).on('mousemove',this.onmousemove);
            $(document).on('mouseup',this.onmouseup);
        },
        documentOffFn:function(){
            $(document).off('mousemove',this.onmousemove);
            $(document).off('mouseup',this.onmouseup);
        },
        onmousemove:function(e){
            mouseFn.mousemove(mouseFn.dom,e);
        },
        onmouseup:function(e){
            mouseFn.mouseup(mouseFn.dom,e);
        },
        init:function(){
            // console.log('init');
            this.dom = null;
            this.domArea = null;
            this.changeList = false;
            this.area = false;
            this.status = 0;
            this.timer = null;
            this.canExChange = false;
            this.documentOffFn();
        },
        setStatus:function(number){
            this.status = number;
            if ( this.status == 0 ) {
                this.dom = null;
                this.documentOffFn();
                FREEZE_MOMENT = false;
            }
            if ( this.canExChange ) {
                this.continueTimer('setStatus');
            }
        },
        setTimeoutAjax:function(){
            var that = this;
            this.timer = setTimeout(function(){
                that.ajaxExChange();
            },this.TIME);
        },
        continueTimer:function(str){
            // console.log('continueTimer:'+str);
            clearTimeout(this.timer);
            this.setTimeoutAjax();
        },
        askForWhetherAjax:function(fn){
            if ( this.canExChange ) {
                // console.log('now');
                clearTimeout(this.timer);
                this.ajaxExChange(fn);
            } else {
                if ( typeof fn == 'function' ) fn();
            }
        },
        ajaxExChange:function(fn){
            var that = this;
            // FREEZE_MOMENT = true;
            // console.log('FREEZE_MOMENT ajaxExChange');
            if ( this.dom && this.dom.getAttribute('data-mouse-status') === '2' ) return this.continueTimer('data-mouse-status');
            if ( this.ajaxing ) return this.continueTimer('ajaxing');
            if ( !this.canExChange ) return false;
            
            var dataObj = this.compareData();
            // 没改变
            if ( dataObj[0].length === 0 ) {
                if ( typeof fn == 'function' ) fn();
                return this.exitTipsOff('没改变');
            }
            this.ajaxing = true;
            // TODO
            // ajax success
            // console.log('ajaxing=>',Date.now());

            var data = {
                venues_id:main.data.venuesConfig.venues_id,
                cat_id:main.data.venuesConfig.cat_id,
                book_date:main.data.venuesConfig.book_date,
                data:JSON.stringify(dataObj)
            }
            that.exitTipsOn();
            var success = function(res){
                that.exitTipsOff('ajax_s');
                that.ajaxing = false;
                FREEZE_MOMENT = false;
                if ( res.status == '0000' ) {
                    // console.log('end');
                    $.each(main.courseList,function(index,item){
                        $.each(main.timeListHalfNumber,function(i,it){
                            addCode(main.cookDataFn2Data[index][it],index,it);
                        });
                    });

                    main.snapshotData = [];
                    if ( typeof fn == 'function' ) fn();
                } else {
                    tipsBox.show('FAIL:'+res.msg);
                    main.getData(function(){
                        main.reload();
                        main.snapshotData = [];
                    });
                }
            }
            
            var error = function(res){
                that.exitTipsOff('ajax_er');
                that.ajaxing = false;
                FREEZE_MOMENT = false;
                tipsBox.show('网络错误');
            };
            // console.log('start');
            if ( main.isAfterNineDay ) {
                ajaxChangeGoodsLater(data,success,error);
            } else {
                ajaxChangeGoods(data,success,error);
            }

            this.init();
        },
        compareData:function(){
            var compareList = [
                '__code__'
            ];
            var changeDataList = [];
            $.each(main.courseList,function(index,item){
                $.each(main.timeListHalfNumber,function(i,it){
                    var oldData = main.snapshotData[0][index][it];
                    var newData = main.cookDataFn2Data[index][it];
                    if ( !compare(oldData,newData,compareList) ) {
                        changeDataList.push(newData);
                    }
                });
            });


            $.each(changeDataList,function(index,item){
                makeChangeCode(item);
            });

            // var onlyArray = [];
            var onlyObj = {};

            // $.each(changeDataList,function(index,item){
            //     if ( !onlyObj[item.changeCode] ) {
            //         onlyObj[item.changeCode] = true;
            //         onlyArray.push(item);
            //     }
            // });

            // console.log(changeDataList);
            // console.log(onlyArray);

            var ajaxData = [
                [],
                []
            ];
            var order_sn_list = [];
            var order_sn_object = {}

            $.each(changeDataList,function(index,item){

                var code = order_sn_list.join(',');
                if ( item.order_sn  ) {
                    // debugger;
                    if ( code.indexOf(item.order_sn) === -1 ) order_sn_list.push(item.order_sn);
                    
                    if ( !order_sn_object[item.order_sn] ) order_sn_object[item.order_sn] = [];

                    var inner_code = order_sn_object[item.order_sn].join(',');
                    if (  inner_code.indexOf(item.goods_id) === -1 ) order_sn_object[item.order_sn].push(item.goods_id);
                }

                addData(item);
            });

            
            var real_order_sn_object = {};
            // 遍历 order_sn_list
            // 遍历 main.cookDataFn2Data 
            // console.log(main.cookDataFn2Data);
            var code = order_sn_list.join(',');
            $.each(main.cookDataFn2Data,function(i,it){
                for ( var name in it ) {

                    var obj = it[name];
                    if ( obj.order_sn && code.indexOf(obj.order_sn) !== -1 ) {

                        if ( !real_order_sn_object[obj.order_sn] ) real_order_sn_object[obj.order_sn] = [];
                        var inner_code = real_order_sn_object[obj.order_sn].join(',');
                        if (  inner_code.indexOf(obj.goods_id) === -1 ) real_order_sn_object[obj.order_sn].push(obj.goods_id);

                    } 
                }
            });
            
            // console.log(order_sn_list);
            // console.log(order_sn_object);
            // console.log(real_order_sn_object);

            // 遍历real_order_sn_object
            $.each(real_order_sn_object,function(name,item){
                var code = order_sn_object[name].join(',');
                $.each(item,function(i,it){
                    if ( code.indexOf(it) === -1 ) {
                        $.each(main.goodsIdMap[it],function(j,t){
                            // console.log(main.cookDataFn2Data[t.j][t.s]);
                            var beforeData = createObj(main.cookDataFn2Data[t.j][t.s]);
                            var AfterData = createObj(main.cookDataFn2Data[t.j][t.s]);
                            ajaxData[0].push(beforeData);
                            ajaxData[1].push(AfterData);
                        });
                    }
                });
            });

            function addData(item){
                var beforePoint = item.changeCode.split('-')[0];
                var afterPoint = item.changeCode.split('-')[1];

                var beforeDataCell =  main.snapshotData[0][beforePoint.split(',')[0]][beforePoint.split(',')[1]];
                var afterDataCell =  main.snapshotData[0][afterPoint.split(',')[0]][afterPoint.split(',')[1]];

                if ( beforeDataCell.status != 0 ) {

                    var dualWayCode = item.changeCode.split('-').sort().join('-');

                    if ( onlyObj[dualWayCode] !== true ) {

                        onlyObj[dualWayCode] = true; 

                        var beforeData = createObj(beforeDataCell);
                        var AfterData = createObj(afterDataCell);

                        ajaxData[0].push(beforeData);
                        ajaxData[1].push(AfterData);
                    }
                }
            }

            function createObj(source){
                var obj = {
                    "status":source.status,
                    "start_time":strFormatTime(source.start_time),
                    "end_time":strFormatTime(source.end_time),
                    "name":source.name,
                    "phone":source.phone,
                }

                // 9天后
                if ( main.isAfterNineDay ) {

                    obj.course_number = source.course_number;

                } else {

                    type = source.utm_medium;

                    obj.goods_id = source.goods_id;

                    if ( source.order_id ) {
                        obj.order_id = source.order_id;
                    } else {
                        obj.order_id = '';
                    }

                }
                if ( source.card_id && source.card_id != 0 ) {
                    obj.card_id = source.card_id;
                } else {
                    obj.card_id = '';
                }
                return obj;
            }  

            function makeChangeCode(obj){
                var codeArray = [];
                codeArray[0] = obj.__code__;
                codeArray[1] = obj.__y__ + ',' + obj.start_time;
                // codeArray.sort();
                obj.changeCode = codeArray.join('-');
            }

            function compare(l,r,compareList){
                var boolen = true;
                $.each(compareList,function(index,item){
                    if ( l[item] !== r[item] ) boolen = false;
                });
                return boolen;
            }
            console.log('-----',ajaxData)
            return ajaxData;
        },
        mousedown:function(dom,e){
            if ( FREEZE_MOMENT ) return false;
            if ( this.canExChange ) this.continueTimer('mousedown');
            this.changeList = false;
            this.dom = dom;
            this.area = false;
            this.status = 1;
            this.documentOnFn();
            if ( dom.__data__[0].__type__ == 'noting' ) return dom.setAttribute('data-mouse-status','0');
            if ( dom.__data__[0].status == '3' ) return dom.setAttribute('data-mouse-status','0');
            if ( dom.getAttribute('data-mouse-status') !== '3' ) {
                addZindex(dom);
                dom.setAttribute('data-mouse-status','1');
                dom.setAttribute('data-mouse-offset-x',e.offsetX);
                dom.setAttribute('data-mouse-offset-y',e.offsetY);
                dom.setAttribute('data-mouse-page-x',e.clientX);
                dom.setAttribute('data-mouse-page-y',e.clientY);
            }
            this.domArea = this.findLiArea(dom,Number(dom.getAttribute('data-left')),Number(dom.getAttribute('data-top')),true);
        },
        mouseup:function(dom,e){
            // if ( FREEZE_MOMENT ) return this.turnBack(dom,'mouseup_FREEZE_MOMENT');
            if ( FREEZE_MOMENT ) return ;
            this.continueTimer('mouseup');
            if ( dom && dom.getAttribute('data-mouse-status') === '2' ) {
                dom.setAttribute('data-mouse-status','3');
                if ( this.changeList && (this.changeList.netPayList.length > 0 || this.changeList.ortherList.length > 0 ) ) {
                    // console.log(this.changeList);
                    // console.log(dom);
                    this.exitTipsOn('mouseup');
                    this.exChange();
                } else {
                    this.exitTipsOff('mouseup');
                    this.turnBack(dom,'mouseup_else');
                }
            } else {
                dom && dom.setAttribute('data-mouse-status','0');
                this.setStatus(0);
            }
        },
        exChange:function(){
            this.canExChange = true;
            // 如何交换
            var HTEC = this.howToExChange();
            // 交换动画
            this.exChangeAnimation(HTEC.matrix,HTEC.domMatrix);
            
        },
        howToExChange:function(){
            var that = this;
            // 寻找交换的数据相对应的item
            // 寻找交换的动画数据
            var matrix = [];
            var domMatrix = [];

            // matrix init
            // 
            $.each(this.area.courseList,function(index,item){
                matrix.push([]);
                $.each(that.area.timeList,function(i,it){
                    matrix[index].push({
                        c:item,
                        t:it,
                    });
                });
            });

            $.each(this.domArea.courseList,function(index,item){
                domMatrix.push([]);
                $.each(that.domArea.timeList,function(i,it){
                    domMatrix[index].push({
                        c:item,
                        t:it,
                        ec:null,
                        et:null
                    });
                });
            });

            // area first foreach search netPay cell
            // 
            var noNetPayListFormArea = [];
            var noNetPayListFormDomArea = []

            $.each(matrix,function(index,item){
                $.each(item,function(i,it){
                    var cell = main.cookDataFn2Data[it.c][it.t];
                    if ( cell.status == 2 ) {
                        domMatrix[index][findTimeInDomMatrix(it.t)].ec = it.c;
                        domMatrix[index][findTimeInDomMatrix(it.t)].et = it.t;
                    } else {
                        noNetPayListFormArea.push(it);
                    }
                });
            });

            // DomArea first foreach search no netPay cell
            // 
            $.each(domMatrix,function(index,item){
                $.each(item,function(i,it){
                    if ( it.ec === null ) noNetPayListFormDomArea.push(it);
                });
            });

            $.each(noNetPayListFormArea,function(index,item){
                noNetPayListFormDomArea[index].ec = item.c;
                noNetPayListFormDomArea[index].et = item.t;
            });

            // console.log('domMatrix',domMatrix);
            // console.log('matrix',matrix);

           function findTimeInDomMatrix(time){
                var i = null;
                $.each(that.domArea.timeList,function(index,item){
                    if ( time == item ) i = index;
                });

                return i;
           }

           return {matrix:matrix,domMatrix:domMatrix}

        },
        exChangeData:function(dom,matrix,domMatrix){
            // 数据快照
            main.snapshot();
            // data exchange
            // console.log(dom);
            var domCell = dom.__data__[0];

            // 被保护的code
            var codeProtect = [];
            // 未被保护的code对应的cell
            var noProtectCodeCell = [];
            // 未被保护的domMatrixCell
            var noProtectDomMatrixCell = [];


            // 临时数据矩阵 保存被占的矩阵
            var tempMatrix = [];

            $.each(domMatrix,function(index,item){
                tempMatrix.push([]);
                $.each(item,function(i,it){
                    var domMatrixPoint = domMatrix[index][i];
                    var domCell = main.cookDataFn2Data[domMatrixPoint.ec][domMatrixPoint.et];
                    var tempObj = {
                        status:domCell.status,
                        order_id:domCell.order_id,
                        order_status:domCell.order_status,
                        name:domCell.name,
                        phone:domCell.phone,
                        card_id:domCell.card_id,
                        card_no:domCell.card_no,
                        user_name:domCell.user_name,
                        mobile:domCell.mobile,
                        utm_medium:domCell.utm_medium,
                        title:domCell.title,
                        card_detail:domCell.card_detail,
                        sale_list:domCell.sale_list,
                        sale_action_time:domCell.sale_action_time,
                        order_sn:domCell.order_sn,
                        __type__:domCell.__type__,
                        __name__:domCell.__name__,
                        __phone__:domCell.__phone__,
                        __code__:domCell.__code__,
                    }
                    tempMatrix[index].push(tempObj);
                });
            });

            var tempDomMatrix = [];

            $.each(domMatrix,function(index,item){
                tempDomMatrix.push([]);
                $.each(item,function(i,it){
                    var domMatrixPoint = domMatrix[index][i];
                    var domCell = main.cookDataFn2Data[domMatrixPoint.c][domMatrixPoint.t];
                    var tempObj = {
                        status:domCell.status,
                        order_id:domCell.order_id,
                        order_status:domCell.order_status,
                        name:domCell.name,
                        phone:domCell.phone,
                        card_id:domCell.card_id,
                        card_no:domCell.card_no,
                        user_name:domCell.user_name,
                        mobile:domCell.mobile,
                        utm_medium:domCell.utm_medium,
                        title:domCell.title,
                        card_detail:domCell.card_detail,
                        sale_list:domCell.sale_list,
                        sale_action_time:domCell.sale_action_time,
                        order_sn:domCell.order_sn,
                        __type__:domCell.__type__,
                        __name__:domCell.__name__,
                        __phone__:domCell.__phone__,
                        __code__:domCell.__code__,
                    }
                    tempDomMatrix[index].push(tempObj);
                });
            });

            // 大吃小
            $.each(domMatrix,function(index,item){
                $.each(item,function(i,it){
                    // debugger
                    var source = tempDomMatrix[index][i];
                    var target = main.cookDataFn2Data[it.ec][it.et];
                    copyAttrProtect(source,target);
                    // console.log('=============')
                    // console.log('c:',it.c,'t:',it.t);
                    // console.log('ec:',it.ec,'et:',it.et);
                });
            });

            // 小吃大
            // $.each(domMatrix,function(index,item){
            //     $.each(item,function(i,it){
            //         var source = tempMatrix[index][i];
            //         var target = main.cookDataFn2Data[it.c][it.t];
            //         copyAttr(source,target);
            //     });
            // });

            function copyAttr(source,target){
                target.status = source.status;
                target.order_id = source.order_id;
                target.order_status = source.order_status;
                target.name = source.name;
                target.phone = source.phone;
                target.card_id = source.card_id;
                target.card_no = source.card_no;
                target.user_name = source.user_name;
                target.mobile = source.mobile;
                target.utm_medium = source.utm_medium;
                target.title = source.title;
                target.__type__ = source.__type__;
                target.__name__ = source.__name__;
                target.__phone__ = source.__phone__;
                target.__code__ = source.__code__;
                target.card_detail = source.card_detail;
                target.sale_list = source.sale_list;
                target.sale_action_time = source.sale_action_time;
                target.order_sn = source.order_sn;
            }

            function copyAttrProtect(source,target){
                copyAttr(source,target);
                // 已经占领的开启保护
                codeProtect.push(source.__code__);
                target.__protect__ = true;
            }

            $.each(domMatrix,function(index,item){
                $.each(item,function(i,it){
                    var cell = main.cookDataFn2Data[it.c][it.t];
                    if ( cell.__protect__ !== true ) noProtectCodeCell.push(cell);
                });
            });

            $.each(tempMatrix,function(index,item){
                $.each(item,function(i,it){
                    // debugger;
                    if ( codeProtect.join('-').indexOf(it.__code__) === -1 ) noProtectDomMatrixCell.push(it);
                });
            });

            // console.log(codeProtect.join('-'));
            // console.log('noProtectDomMatrixCell:',noProtectDomMatrixCell);
            // console.log('noProtectCodeCell:',noProtectCodeCell);

            $.each(noProtectDomMatrixCell,function(index,item){

                var source = item;
                var target = noProtectCodeCell[index];
                copyAttr(source,target);
            });


            // 保护解除
            $.each(domMatrix,function(index,item){
                $.each(item,function(i,it){
                    main.cookDataFn2Data[it.c][it.t].__protect__ = false;
                    main.cookDataFn2Data[it.ec][it.et].__protect__ = false;
                });
            });


        },
        exChangeAnimation:function(matrix,domMatrix){
            var that = this;
            var dom = this.dom;
            FREEZE_MOMENT = true;
            // console.log('FREEZE_MOMENT exChangeAnimation');
            // Animation
            // console.log('matrix',matrix);
            var matrixFirstCell = matrix[0][0];
            // var domAnimationPiont = main.cookDataFn2Data[matrixFirstCell.c][matrixFirstCell.t].__li__;

            var domAnimation = {
                top: getTopByC(matrixFirstCell.c) + 'px',
                left: getLeftByT(matrixFirstCell.t) + 'px'
            }

            var domMatrixAnimationList = [];
            $.each(domMatrix,function(index,item){
                $.each(item,function(i,it){
                    var cell = main.cookDataFn2Data[it.ec][it.et];
                    if ( cell.__li__ && !domHasClassName(cell.__li__,'hide') && !cell.__li__.hasAttribute('data-check') && cell.__li__ !== dom ) {
                        cell.__li__.setAttribute('data-check','');
                        // var domAnimationPiont = main.cookDataFn2Data[it.c][it.t].__li__;
                        domMatrixAnimationList.push({
                            dom:cell.__li__,
                            animationOpt:{
                                top: getTopByC(it.c) + 'px',
                                left: getLeftByT(it.t) + 'px'
                            }
                        });
                    }

                    if ( cell.__mix__ && !domHasClassName(cell.__mix__,'hide') && !cell.__mix__.hasAttribute('data-check') && cell.__mix__ !== dom ) {
                        cell.__mix__.setAttribute('data-check','');
                        // var domAnimationPiont = main.cookDataFn2Data[it.c][it.t].__li__;
                        domMatrixAnimationList.push({
                            dom:cell.__mix__,
                            animationOpt:{
                                top: getTopByC(it.c) + 'px',
                                left: getLeftByT(it.t) + 'px'
                            }
                        });
                    }
                });
            });

            $.each(domMatrixAnimationList,function(index,item){
                if ( item.dom.getAttribute('data-color') == '' ) {
                    $(item.dom).css(item.animationOpt);
                } else {
                    $(item.dom).animate(item.animationOpt,300);
                }
            });

            $(this.dom).animate(domAnimation,300,function(){
                // 动画回调交换数据
                that.exChangeData(dom,matrix,domMatrix);
                main.render.reRenderAfterCookDataEdit();
                that.setStatus(0);
            });
        },
        mousemove:function(dom,e){
            // if ( FREEZE_MOMENT ) return this.turnBack(dom,'mousemove_FREEZE_MOMENT');
            if ( FREEZE_MOMENT ) return ;
            var status = dom.__data__[0].status;
            if ( dom.getAttribute('data-mouse-status') === '1' ) dom.setAttribute('data-mouse-status','2');
            if ( dom.getAttribute('data-mouse-status') === '2' ) {
                if ( this.canExChange ) this.continueTimer('mousemove');
                var dLeft = Number(dom.getAttribute('data-mouse-page-x')) - e.clientX;
                var dTop = Number(dom.getAttribute('data-mouse-page-y')) - e.clientY;
                var originLeft = Number(dom.getAttribute('data-left'));
                var originTop = Number(dom.getAttribute('data-top'));
                var moveLeft = originLeft - dLeft;
                var moveTop = originTop  - dTop;
                // 订单只能上下移动
                if ( status == 2 ) moveLeft = originLeft;
                $(dom).css({
                    'left': moveLeft + 'px',
                    'top' : moveTop  + 'px'
                });
                var area = this.findLiArea(dom,moveLeft,moveTop);
                // console.log(area);
                if ( area ) {
                    this.changeList = this.markAreaLi(area);
                    this.area = area;
                    if ( !this.changeList ) this.clearAllMark();
                } else {
                    this.changeList = false;
                    this.clearAllMark();
                }
            }
        },
        findLiArea:function(dom,moveLeft,moveTop,boolen){
            var oriLeft = Number(dom.getAttribute('data-left'));
            var oriTop = Number(dom.getAttribute('data-top'));
            var width = Number(dom.getAttribute('data-width')) * TABLE_ITEM_WIDTH;
            var height = Number(dom.getAttribute('data-height')) * TABLE_ITEM_HEIGHT;
            var dX = TABLE_ITEM_WIDTH / 4;
            var dY = TABLE_ITEM_HEIGHT / 2;
            if ( !boolen ) {
                // 还没超出自身范围
                // if ( (moveLeft >= oriLeft - width + dX ) && (moveLeft <= oriLeft + width - dX ) && (moveTop >= oriTop - height + dY ) && (moveTop <= oriTop + height - dY) ) return false;

                // 超出边界
                if ( moveLeft < 0 ) return false;
                if ( moveLeft + width > main.timeListNumber.length * TABLE_ITEM_WIDTH ) return false;
                if ( moveTop < 0 ) return false;
                if ( moveTop + height > main.courseList.length * TABLE_ITEM_HEIGHT ) return false;
            }

            var timeList = [];
            var courseList = [];

            var c_start = Math.round(moveTop / TABLE_ITEM_HEIGHT) ;
            var c_end = Math.round(( moveTop + height ) /TABLE_ITEM_HEIGHT) - 1;

            var t_start = Math.round(( moveLeft / TABLE_ITEM_WIDTH ) * 60 + main.render.startTime);
            var t_end = Math.round((( moveLeft + width )  / TABLE_ITEM_WIDTH ) * 60 + main.render.startTime) - 30;

            start_half = t_start % 30 ;
            end_half = t_end % 30 ;
            t_start = t_start - start_half;
            t_end = t_end - end_half;
            if ( start_half > 15 ) t_start += 30; 
            if ( end_half > 15 ) t_end += 30;

            if ( c_start < 0 ) c_start = 0;
            if ( c_end < 0 ) c_end = 0;
            if ( c_start > main.cookDataFn2Data.length - 1) c_start = main.cookDataFn2Data.length - 1;
            if ( c_end > main.cookDataFn2Data.length - 1) c_end = main.cookDataFn2Data.length - 1;

            if ( t_start < main.render.startTime ) t_start = main.render.startTime;
            if ( t_end < main.render.startTime ) t_end = main.render.startTime;
            if ( t_start > main.timeListHalfNumber[main.timeListHalfNumber.length - 1] ) t_start =  main.timeListHalfNumber[main.timeListHalfNumber.length - 1];
            if ( t_end > main.timeListHalfNumber[main.timeListHalfNumber.length - 1] ) t_end =  main.timeListHalfNumber[main.timeListHalfNumber.length - 1];
            // console.log('c_start:',c_start,'c_end:',c_end,'t_start:',t_start,'t_end:',t_end);
            do {
                courseList.push(c_start);
                c_start ++;
            } while ( c_end >= c_start );

            do {
                timeList.push(t_start);
                t_start += 30;
            } while ( t_end >= t_start );
            // console.log(courseList,timeList);
            // 移动时覆盖区域上的li
            // 
            return {courseList:courseList,timeList:timeList};
        },
        markAreaLi:function (area) {
            this.clearAllMark();
            var dom = this.dom;
            if ( !dom ) return false;
            var domWidth = Number(dom.getAttribute('data-width')) * TABLE_ITEM_WIDTH;
            var domHeight = Number(dom.getAttribute('data-height')) * TABLE_ITEM_HEIGHT;
            var domTop = Number(dom.getAttribute('data-top'));
            var domLeft = Number(dom.getAttribute('data-left'));
            var domRight = domWidth + domLeft;
            var domBottom = domTop + domHeight;
            var that = this;
            var markList = [];
            var netPayList = [];
            var ortherList = [];
            var boolen = true;
            var hasOwner = false;
            var overlap = false;
            var moveArea = {};
                moveArea.top = area.courseList[0] * TABLE_ITEM_HEIGHT;
                moveArea.left = (area.timeList[0] - main.render.startTime) / 60 * TABLE_ITEM_WIDTH ;
                moveArea.height = (area.courseList[area.courseList.length - 1] - area.courseList[0] + 1 ) * TABLE_ITEM_HEIGHT;
                moveArea.width = (area.timeList[area.timeList.length - 1] + 30 - area.timeList[0]) / 60 * TABLE_ITEM_WIDTH;
                moveArea.right = moveArea.left + moveArea.width;
                moveArea.bottom = moveArea.top + moveArea.height;
                // console.log(moveArea);
            var timeListNumberCode = main.timeListNumber.join('-');
            // 寻找可见的li
            $.each(area.courseList,function(index,item){
                $.each(area.timeList,function(i,it){

                    var source = main.cookDataFn2Data[item][it];
                    var li = source.__li__;
                    var mix = source.__mix__;

                    if ( li === that.dom || mix === that.dom ) {
                        hasOwner = true;
                        overlap = {};
                        if ( domRight >= moveArea.right ) {
                           overlap.right = moveArea.right; 
                           overlap.left = domLeft;
                        }  else {
                            overlap.right = domRight; 
                            overlap.left = moveArea.left;
                        }

                        if ( domBottom >= moveArea.bottom ) {
                            overlap.bottom = moveArea.bottom;
                            overlap.top = domTop;
                        } else {
                            overlap.bottom = domBottom;
                            overlap.top = moveArea.top;
                        }
                    }

                    if ( timeListNumberCode.indexOf(source.start_time) !== -1 ) {
                        li.setAttribute('data-light-before','');
                    } else {
                        li.setAttribute('data-light-after','');
                    }
                    // 支付中 预留中
                    if ( source.status == 3 ) boolen = false;

                    if (li && !domHasClassName(li,'hide') && li !== that.dom) {
                        markList.push(li);
                        if ( source.status == 2 ){
                         netPayList.push(li);
                        } else {
                            ortherList.push(li);
                        }
                    }

                    if (mix && !domHasClassName(mix,'hide') && mix !== that.dom) {
                        markList.push(mix);
                        if ( source.status == 2 ) {
                            netPayList.push(mix);
                        } else {
                            ortherList.push(mix);
                        }
                    }

                });
            });

            // 支付中 预留中
            if ( !boolen ) return false; 
            // 分析li
            var analyseArea = this.analyseArea(markList,overlap);

            var aAwidth = analyseArea.width;
            var aAheight = analyseArea.height; 
            // console.log(markList,aAwidth,aAheight);
            
            // 要比目标区域大才能换场
            // console.log('aAwidth',aAwidth,' ',domWidth);
            // console.log('aAheight',aAheight,' ',domHeight);
            if ( domWidth < aAwidth || domHeight  < aAheight ) return false;
            

            // 分析其中的趣运动订单时段能在同时段换场

            var analyseNetPayList = this.analyseNetPayList(netPayList);
            if ( !analyseNetPayList ) return false; 

            $.each(markList,function(index,item){
                item.setAttribute('data-light','');
            });

            // console.log(ortherList);

            return {netPayList:netPayList,ortherList:ortherList};
        },
        analyseNetPayList:function(list){
            var boolen = true;
            var domTimeList = analyseTimeList(this.dom);
            $.each(list,function(index,item){
                var _domTimeList = analyseTimeList(item);
                if ( domTimeList.indexOf(_domTimeList) == -1 ) {
                    boolen = false;
                }
            });

            return boolen;
        },
        analyseArea:function (list,overlap) {
            // console.log(list);
            // console.log(overlap);
            var left = null;
            var top = null;
            var right = null;
            var bottom = null;
            var that = this;

            $.each(list,function(index,item){
                if ( item === that.dom ) return false;
                var _left = Number(item.getAttribute('data-left'));
                var _top = Number(item.getAttribute('data-top'));
                var _right = _left + Number(item.getAttribute('data-width')) * TABLE_ITEM_WIDTH;
                var _bottom = _top + Number(item.getAttribute('data-height')) * TABLE_ITEM_HEIGHT;
                var before = item.hasAttribute('data-light-before');
                var after = item.hasAttribute('data-light-after');
                // console.log('before:',before,'after:',after);
                if ( item.getAttribute('data-type') == 'main' && item.hasAttribute('data-nothing') ) {
                    if ( item.hasAttribute('data-light-before') && !item.hasAttribute('data-light-after') ) {
                       _right = _left + Number(item.getAttribute('data-width')) / 2 * TABLE_ITEM_WIDTH; 
                    }

                    if ( !item.hasAttribute('data-light-before') && item.hasAttribute('data-light-after') ) {
                        _left = Number(item.getAttribute('data-left')) + Number(item.getAttribute('data-width')) / 2 * TABLE_ITEM_WIDTH;
                    }
                }
                
                if ( left === null || _left < left ) left = _left;
                if ( top === null || _top < top ) top = _top;
                if ( right === null || _right > right ) right = _right;
                if ( bottom === null || _bottom > bottom ) bottom = _bottom;
            });

            if ( overlap ) {
                if ( left === null || overlap.left < left ) left = overlap.left;
                if ( top === null || overlap.top < top ) top = overlap.top;
                if ( right === null || overlap.right > right ) right = overlap.right;
                if ( bottom === null || overlap.bottom > bottom ) bottom = overlap.bottom;
            }

            var width = right - left;
            var height = bottom - top;

            return {width:width,height:height};
        },
        clearAllMark:function () {
            main.render.$main.find('li').each(function(index,item) {
                item.removeAttribute('data-light');
                item.removeAttribute('data-light-before');
                item.removeAttribute('data-light-after');
            });
        },
        turnBack:function(dom,str){
            // console.log('turnBack '+str);
            var that = this;
            this.clearAllMark();
            this.init();
            dom.setAttribute('data-mouse-status','4');
            var top = dom.getAttribute('data-top');
            var left = dom.getAttribute('data-left');
            $(dom).animate({
                top:top+'px',
                left:left+'px'
            },300,function(){
                dom.setAttribute('data-mouse-status','0');
                that.setStatus(0);
            });
        },
    }

    // 预留重发短信 和 取消预留
    var reserveBox = {
        $dom:$('#reserveing'),
        $close:$('#reserveing .close'),
        $reSendMsg:$('#reSendMsg'),
        $cancelReserve:$('#cancelReserve'),
        $reserveing_name:$('#reserveing_name'),
        $reserveing_phone:$('#reserveing_phone'),
        $reserveing_court:$('#reserveing_court'),
        $reserveing_money:$('#reserveing_money'),
        order_id:null,
        user_id:null,
        init:function(){
            var that = this;
            this.$close.click(function(){
                that.hide();
            });
            this.$reSendMsg.click(function(){
                that.reSendMsg();
            });
            this.$cancelReserve.click(function(){
                that.cancelReserve();
            });
        },
        reSendMsg:function(){
            var that = this;
            loadingBox.show();
            var data = {
                order_id:this.order_id
            }
            var success = function(res){
                loadingBox.hide();
                if ( typeof res == 'object' ) {
                    var data = res;
                } else {
                    var data = JSON.parse(res);
                }
                main.getData(function(){
                    main.reload();
                });
                if ( data.status == '0000' ) {
                    that.hide();
                    tipsBox.show('短信发送成功');
                } else {
                    tipsBox.show(data.msg);
                }
            }
            var error = error;
            ajaxResendSmsOrders(data,success,error);
        },
        cancelReserve:function(){
            var that = this;
            
            var data = {
                order_id:this.order_id,
                user_id:this.user_id
            }
            var success = function(res){
                loadingBox.hide();
                if ( typeof res == 'object' ) {
                    var data = res;
                } else {
                    var data = JSON.parse(res);
                }
                main.getData(function(){
                    main.reload();
                });
                if ( data.status == '0000' ) {
                    that.hide();
                    tipsBox.show('预留取消成功');
                } else {
                    tipsBox.show(data.msg);
                }
            }
            var error = error;

            commonDialogBox.show({
              title:'确认',
              desc:'确定取消预留吗？',
              sureText:'确认'
            },function(){
              loadingBox.show();
              ajaxCancelOrders(data,success,error);
            });
        },
        show: function(dom) {
            this.set(dom);
            showBC('blackCoverForReserveing');
            addZindex(this.$dom);
            this.$dom.removeClass('hide');
        },
        reset:function(){
            this.$reserveing_name.html('');
            this.$reserveing_phone.html('');
            this.$reserveing_court.html('');
            this.$reserveing_money.html('');
        },
        hide: function() {
            this.order_id = null;
            this.user_id = null;
            this.reset();
            hideBC('blackCoverForReserveing');
            this.$dom.addClass('hide');
        },
        set:function(dom){
            var data = dom.__data__[0];
            this.order_id = data.order_id;
            this.user_id = data.user_id;
            var court_html = findCourtNameByY(data.__y__) + ' ' + strFormatTime(data.start_time) + ' - ' + strFormatTime(data.end_time);
            this.$reserveing_name.html(data.user_name);
            this.$reserveing_phone.html(data.mobile);
            this.$reserveing_court.html(court_html);
            this.$reserveing_money.html(data.price);
            // console.log(data);
        },

    }

    reserveBox.init();

    var resendSmsOrdersURL = '/Order/resendSmsOrders/';
    var cancelOrdersURL = '/Order/cancelOrders/';

    function ajaxResendSmsOrders(data,success,error) {
        $.ajax({
            url:resendSmsOrdersURL,
            type:'get',
            data:data,
            success:success,
            error:error
        });
    }

    function ajaxCancelOrders(data,success,error) {
        $.ajax({
            url:cancelOrdersURL,
            type:'get',
            data:data,
            success:success,
            error:error
        });
    }

    // 场馆设置
    var venuesConfig = {
      $dom:$('#venuesConfig'),
      $close:$('#venuesConfig .close'),
      $save:$('#saveConfig'),
      $callConfig:$('#callConfig'),
      data:{},
      init: function(data) {
          var that = this;
          this.data = data;
          this.$close.click(function() {
              that.hide();
          });
          this.$callConfig.click(function() {
            that.show();
          });
          this.$save.click(function(){
            that.save();
          });
      },
      set:function(member_display,order_display){
        // console.log(member_display,order_display);
        if ( member_display == 1 ) {
          $('#showNameCheckbox')[0].checked = true;
        } else {
          $('#showNameCheckbox')[0].checked = false;
        }

        if ( order_display == 1 ) {
          $('#mixDisplayTrue')[0].checked = true;
        } else {
          $('#mixDisplayFalse')[0].checked = true;
        }
      },
      show: function() {
          var member_display = this.data.member_display;
          var order_display = this.data.order_display;
          this.set(member_display,order_display);
          showBC('blackCoverForVenuesConfig');
          addZindex(this.$dom);
          this.$dom.removeClass('hide');
      },
      hide: function() {
          hideBC('blackCoverForVenuesConfig');
          this.$dom.addClass('hide');
      },
      save:function(){
        loadingBox.show();
        var that = this;
        var member_display = ($('#showNameCheckbox')[0].checked ? 1 : 0 );
        var order_display = ($('#mixDisplayTrue')[0].checked ? 1 : 0 );
        var data = {
            is_show_name : member_display,
            is_merge : order_display
        }
        var success = function(res){
            loadingBox.hide();
            // console.log(res);
            var res = JSON.parse(res);
            if ( res.status == '0000' ) {
                // if ( member_display != that.data.member_display ) {
                  that.data.member_display = member_display;
                // }
                // if ( order_display != that.data.order_display ) {
                  that.data.order_display = order_display;
                  main.render.renderMixSwitch();
                  main.render.showMemberNameSwitch();
                // }
                that.hide();
            } else {
                tipsBox.show(res.msg);
            }
        }
        var error = error;
        
        ajaxUpdateShowConfig(data,success,error);
      }
    }

    var changeGoodsURL = '/goodslist/changeGoods';
    var changeGoodsLaterURL = '/goodslist/changeGoodsLater';

    function ajaxChangeGoods (data,success,error){
        $.ajax({
            url:changeGoodsURL,
            type:'post',
            data:data,
            success:success,
            error:error
        });
    }

    function ajaxChangeGoodsLater (data,success,error){
        $.ajax({
            url:changeGoodsLaterURL,
            type:'post',
            data:data,
            success:success,
            error:error
        });
    }

    function analyseTimeList (dom){
        var list = [];
        var left = Number(dom.getAttribute('data-left'));
        var i = Number(dom.getAttribute('data-width')); 
        var start = ( left / TABLE_ITEM_WIDTH ) * 60 + main.render.startTime;
        for ( ; i > 0 ; i = i - 0.5 ) {
            list.push(start);
            start += 30;
        }

        return list.join(',');
    }

    function domHasClassName (dom,name) {
        var className = dom.className;
        if (className.indexOf(name) === -1 ) return false;
        return true;
    }

    // 项目分类
    var cat = {
        $dom: $('#cat'),
        init: function(data) {
            var that = this;
            this.$dom.find('option').each(function(index,item){
                $(item).remove();
            });
            this.createOption(data);
            this.$dom.removeClass('hide').off('change',cat.change).on('change',cat.change);
        },
        createOption: function(data) {
            var that = this;
            var catData = data.catList || {};
            var venuesConfig = data.venuesConfig || {};
            if ( JSON.stringify(catData) == '{}' ) {
                this.$dom.parent().addClass('hide');
            } else {
                this.$dom.parent().removeClass('hide');
            }
            $.each(catData, function(name, item) {
                var option = document.createElement('option');
                option.value = name;
                option.innerHTML = catData[name];
                that.$dom[0].appendChild(option);
                if ( venuesConfig.cat_id == name ) {
                   option.setAttribute('selected',''); 
                }
            });
        },
        change: function() {
            if (this.value) {
                setHash('cat_id', this.value);
                main.getGoodsConfigData.cat_id = this.value;
                main.getData(function() {
                    main.reload();
                });
            }
        }
    }

    // 日期选择模块
    var dateBar = {
        $dom: $('#beforeDate'),
        $time: $('#time'),
        dateDomList: [],
        init: function(data) {
            this.$dom.parent().find('[data-value]').remove();
            this.$time.data('daterangepicker') && this.$time.data('daterangepicker').remove();
            if ( data.dateList.length === 0 ) {
                this.display('empty');
            } else {
                this.display('show');
                this.daterangepickerInit(data);
            }
            if ( main.isAfterNineDay ) {
                var hash = window.location.hash.replace('#','');
                var hashDate = getInformation(hash).date;
                var date = hashDate.split('-');
                this.$dom.find('span').html(date[1]+'-'+date[2]);
            }
            this.createDate(data);
            
        },
        display:function(type){
            if ( type === 'empty' ) {
                this.$dom.addClass('hide');
            }
            if ( type === 'show' ) {
                this.$dom.removeClass('hide');
            }
        },
        createDate: function(data) {
            var that = this;
            var dateData = data.dateList || [];
            $.each(dateData, function(index, item) {
                var div = document.createElement('div');
                var cur = '';
                div.setAttribute('data-value', item.date);
                div.className = 'input-module flex1';
                if ( item.date === main.data.venuesConfig.book_date ) {
                    cur = ' cur';
                }
                div.innerHTML = "<div class='nine-day"+cur+"'>" + "<div class='nine-day-week'>" + item.name + "</div>" + "<div class='nine-day-date'>" + item.date_week + "</div></div>";
                that.$dom.before(div);
                that.dateDomList.push(div);
                $(div).click(function() {
                    that.click(this);
                    that.$dom.find('span').html('选择时间');
                });
            });
        },
        daterangepickerInit:function(data){
            
            var that = this;
            var dateData = data.dateList || [{date:new Date()}];
            var firstDay = dateData[0].date;
            this.$time.val(firstDay);
            this.$time.daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minDate:moment(firstDay).subtract(10, 'days')
            }, 
            function(start, end, label) {
                var t1 = new Date(start.toString());
                var txt1 = t1.format('yyyy-MM-dd');
                var txt2 = t1.format('MM-dd');
                that.$dom.find('span').html(txt2);
                $.each(that.dateDomList,function(index,item){
                    $(item).find('.nine-day').removeClass('cur');
                    if ( $(item).attr('data-value') == txt1 ) {
                        $(item).find('.nine-day').addClass('cur');
                        that.$dom.find('span').html('选择时间');
                    } 
                });
                main.getGoodsConfigData.book_date = txt1;
                // window.location.hash = txt1;
                setHash('date',txt1);
                main.getData(function() {
                    main.reload();
                });
            });
        },
        click: function(dom) {
            if (dom.getAttribute('data-value')) {
                $.each(this.dateDomList, function(index, item) {
                    $(item).find('.nine-day').removeClass('cur');
                    if ( $(item).attr('data-value') == dom.getAttribute('data-value') ) {
                        $(item).find('.nine-day').addClass('cur');
                    } 
                });
                main.getGoodsConfigData.book_date = dom.getAttribute('data-value');
                // window.location.hash = dom.getAttribute('data-value');
                setHash('date',dom.getAttribute('data-value'));
                main.getData(function() {
                    main.reload();
                });
            }
        }
    }

    // 锁场模块
    var lockCourt = {
        $inputCardNumber:$('#locked_card_number'),
        $inputName:$('#locked_name_in'),
        $inputPhone:$('#locked_mobile_in'),
        $dom: $('#lockCourt'),
        $close: $('#lockCourt .close'),
        showReserve:false,
        $bookSubmit:$('#bookSubmit'),
        $lockedSubmit:$('#lockedSubmit'),
        $money:$('#lockCourt .money'),
        $tips:$('#lockCourt .book-tips'),
        $lock_preorder:$('#lock_preorder'),
        $lockBtn:$('#lockBtn'),
        lockdata:[],
        nineDay:true,
        price:0,
        utm_medium:'',
        init: function(data) {
            this.utm_medium = data.utm_medium;
            var that = this;
            this.$close.click(function() {
                that.hide();
            });
            if ( this.utm_medium == 'reserve' ) {
                this.showReserve = true;
            } else {
                this.showReserve = false;
            }
            this.$lockedSubmit.click(function(){
                loadingBox.show();
                checkUsercard(function(){
                    that.lockedSubmitSend();
                });
            });

            this.$lockBtn.click(function(){
                inputSearch.format();
                that.formatLackdata();
                that.createSelect();
                that.hide();
                that.lockedSubmitSend();
            });

            this.$bookSubmit.click(function(){
                var list = $('#tableMain >li[data-selected]');
                var goodslist = [];
                if ( this.hasAttribute('disabled') ) return false;
                if ( !mobileTest(that.$inputPhone.val()) ) return false;
                if ( list.length >= 5 || list.length === 0 ) return false;
                loadingBox.show();
                $.each(list,function(index,item){
                    goodslist.push(item.__data__[0].goods_id);
                });
                var data = {
                    phone:that.$inputPhone.val(),
                    name:that.$inputName.val(),
                    'goods_id[]': goodslist, 
                }
                var success = function(res){
                    loadingBox.hide();
                    var res = JSON.parse(res);
                    if ( res.status == '0000' ) {
                        main.getData(function(){
                            main.reload();
                        });
                        that.hide();
                    } else {
                        tipsBox.show(res.msg);
                    }
                }
                var error = error;
                ajaxReserveOrders(data,success,error);
            });
        },
        show: function(dom) {
            inputSearch.format();
            showBC('blackCoverForLockCourt');
            addZindex(this.$dom);
            this.formatLackdata();
            this.createSelect();

        },
        createSelect:function(){
            var that = this;
            this.$lock_preorder.html('');
            $.each(this.mixDataY,function(index,item){
                item && $.each(item,function(i,it){
                    // console.log(it);
                    var start_time = it[0].start_time;
                    var end_time = it[it.length - 1].end_time;
                    var start_timeAdd30 = start_time + 30;
                    var end_timeSub30 = end_time - 30;
                    var course_name = it[0].course_name;
                    var j = it[0].j;
                    var li = document.createElement('li');
                    li.className = 'half-time-select';
                    li.setAttribute('data-j',j);
                    var startSelect = document.createElement('select');
                        startSelect.name = 'start';
                        startSelect.value = strFormatTime(start_time);
                    var startOption = document.createElement('option');
                        startOption.value = strFormatTime(start_time);
                        startOption.innerHTML = strFormatTime(start_time);
                        startSelect.appendChild(startOption);

                    var startAdd30Option = document.createElement('option');
                        startAdd30Option.value = strFormatTime(start_timeAdd30);
                        startAdd30Option.innerHTML = strFormatTime(start_timeAdd30);
                        if ( start_timeAdd30 < end_time ) startSelect.appendChild(startAdd30Option);

                    var endSelect = document.createElement('select');
                        endSelect.name = 'end';
                        endSelect.value = strFormatTime(end_time);

                    var endOption = document.createElement('option');
                        endOption.value = strFormatTime(end_time);
                        endOption.innerHTML = strFormatTime(end_time);
                        endSelect.appendChild(endOption);

                    // if ( main.cookDataFn2Data[j][end_time] && main.cookDataFn2Data[j][end_time].__type__ == 'noting' ) {
                    var endSub30Option = document.createElement('option');
                        endSub30Option.value = strFormatTime(end_timeSub30);
                        endSub30Option.innerHTML = strFormatTime(end_timeSub30);
                        if ( end_timeSub30 > start_time ) endSelect.appendChild(endSub30Option);
                    // }
                    
                    $(startSelect).change(function(){
                        that.selectChange(this,endSelect);
                    });

                    $(endSelect).change(function(){
                        that.selectChange(this,startSelect);
                    });

                    var z = document.createElement('span');
                    z.innerHTML = '至';
                    var name = document.createElement('span');
                    name.innerHTML = course_name;
                    li.appendChild(startSelect);
                    li.appendChild(z);
                    li.appendChild(endSelect);
                    li.appendChild(name);
                    that.$lock_preorder.append(li);
                    // var _html = "<li><select name=''><option value='"+start+"'>"+start+"</option><option value='"+startAdd30+"'>"+startAdd30+"</option></select>至<select><option value='"+end+"'>"+end+"</option><option value='"+endAdd30+"'>"+endAdd30+"</option></select>"+course_name+"</li>";
                });
            });

        },
        selectChange:function(dom,select){
            var that = this;
            var $selectList = this.$lock_preorder.find('select');
            var value = dom.value;
            that.showReserve = true;
            $(select).find('option').each(function(index,item){
                item.removeAttribute('disabled');
                if ( item.value === value ) item.setAttribute('disabled','');
            });
            $selectList.each(function(index,item){
                if ( (timeFormat(item.value) - main.render.startTime)%60 === 30 ) that.showReserve = false;
            });
            this.reserveSwitch(this.showReserve);
        },
        
        formatLackdata:function(){
            // console.log($('#tableMain >li[data-selected]'));
            var that = this;
            this.lockdata = [];
            this.price = 0;
            var half = false;
            var $list = $('#tableMain >li[data-selected]');
            $list.each(function(index,item){
                // console.log(item.__data__[0]);
                var type = $(item).attr('data-type');
                if (type === 'before' || type === 'after') half = true;
                that.price += Number(item.__data__[0].price);

                var end_time = Number(item.__data__[0].end_time );
                var start_time = Number(item.__data__[0].start_time );
                var j = Number(item.__data__[0].__y__);
                if ( type == 'main') {
                  end_time += 30;
                }

                var nextItem = main.cookDataFn2Data[j][end_time];
                var oItem = main.cookDataFn2Data[j][start_time];
                
                var course_name = main.courseList[j].course_name;
                
                that.lockdata.push({
                    start_time:start_time,
                    end_time:end_time,
                    goods_id:item.__data__[0].goods_id,
                    course_name:course_name,
                    j:j
                });

                // var _html = "<li><select name=''><option value='"+start+"'>"+start+"</option><option value='"+startAdd30+"'>"+startAdd30+"</option></select>至<select><option value='"+end+"'>"+end+"</option><option value='"+endAdd30+"'>"+endAdd30+"</option></select>"+course_name+"</li>";
                // that.$lock_preorder.append(_html);
            });
            this.$money.html('预留金额：'+ this.price);
            this.mixLockData();
            
            this.$dom.removeClass('hide');
            if ( half ) {
                this.showReserve = false;
            } else {
                this.showReserve = true;
            }
            if ( Number(this.price) < 0 ) {
                this.nineDay = false;
            } else {
                this.nineDay = true;
            }

            this.reserveSwitch(this.showReserve);
        },
        mixLockData:function(){
            this.mixDataX = [];
            this.mixDataY = [];
            var that = this;
            $.each(this.lockdata,function(index,item){
                if ( !that.mixDataX[item.j] ) that.mixDataX[item.j] = [];
                that.mixDataX[item.j].push(item);
            });
            $.each(this.mixDataX,function(index,item){
                var XID = 0;
                item && $.each(item,function(i,it){
                    that.mixDataY[index] = [];
                    if ( !item[i + 1] ) {
                        if ( it.__XID__ === undefined ) it.__XID__ = XID ++;
                    } else if ( it.end_time === item[i + 1].start_time ) {
                        if ( it.__XID__ === undefined ) {
                            it.__XID__ = XID ++;
                        }
                        item[i + 1].__XID__ = it.__XID__;
                    } else {
                       if ( it.__XID__ === undefined ) it.__XID__ = XID ++;
                    }
                });
            });
            $.each(this.mixDataX,function(index,item){
                item && $.each(item,function(i,it){
                    if (!that.mixDataY[index][it.__XID__]) that.mixDataY[index][it.__XID__] = [];
                    that.mixDataY[index][it.__XID__].push(it);
                });
            });
        },
        hide: function() {
            hideBC('blackCoverForLockCourt');
            this.$dom.addClass('hide');
        },
        reserveSwitch:function(boolen){
            var boolen = !!boolen;
            if ( Number(this.price) < 0 ) boolen = false;
            if ( this.utm_medium !== 'reserve' ) boolen = false;
            if ( boolen ) {
                this.$bookSubmit.removeClass('hide');
                this.$money.removeClass('hide');
                this.$tips.removeClass('hide');
            } else {
                this.$bookSubmit.addClass('hide');
                this.$money.addClass('hide');
                this.$tips.addClass('hide');
            }
        },
        lockedSubmitSend:function(){
            loadingBox.show();
            var that = this;
            var list1 = findTimeListInCookDataFn2Data(this.$lock_preorder.find('li.half-time-select'));
            var card_id = this.$inputCardNumber.attr('data-id');
            var card_no = this.$inputCardNumber.val();
            var data = {
                phone:this.$inputPhone.val(),
                name:this.$inputName.val(),
                card_no:card_no,
                book_date:main.data.venuesConfig.book_date,
                cat_id:main.data.venuesConfig.cat_id,
            }

            var success = function(res){
                loadingBox.hide();
                if ( res.status == '0000' ){
                    $('#tableMain >li[data-selected]').each(function(index,item){
                        item.__data__[0].__select__ = false;
                    });
                    $.each(list1,function(index,item){
                        item.phone = that.$inputPhone.val();
                        item.name = that.$inputName.val();
                        if (card_no) {
                            item.card_no = card_no;
                            item.card_id = card_id;
                        } else {
                            item.card_id = '0';
                        }
                        item.status = '1';
                        precook(item);
                        // console.log('item:',item);
                    });
                    that.hide();
                    if ( that.nineDay ) {
                        main.render.reRenderAfterCookDataEdit();
                    } else {
                        main.getData(function(){
                            main.reload();
                        });
                    }
                    
                } else {
                    tipsBox.show(res.msg);
                }
                
            }
            var error = error;
            if ( this.nineDay ) {
                data.data = JSON.stringify(getDataForNineDay(list1).data);
                if ( data.data == '[]' ) {
                    loadingBox.hide();
                    tipsBox.show('请选择要锁定的场地');
                } else {
                    ajaxBookGoods(data, success, error);
                }
                
            } else {
                data.data = JSON.stringify(getDataForNineDayLater(list1).data);
                if ( data.data == '[]' ) {
                    loadingBox.hide();
                    tipsBox.show('请选择要锁定的场地');
                } else {
                    ajaxBookGoodsLater(data, success, error);
                }
            }
            
        }
    }

    // 预留
    var reserveOrdersURL = '/Order/reserveOrders/';

    function ajaxReserveOrders(data,success,error){
        $.ajax({
            type: 'get',
            url: reserveOrdersURL,
            data: data,
            success: success,
            error: error
        });
    }

    // ajax url
    var goodslistURL = '/goodslist/getGoodsConfig';
    var goodslistLaterURL = '/goodslist/getGoodsConfigLater';
    var sendURL = '/Promote/send/';
    var orderCheckURL = '/Order/orderCheck';
    var bookGoodsURL = '/goodslist/bookGoods'; // 九天内锁场
    var bookGoodsLaterURL = '/goodslist/bookGoodsLater'; // 九天后内锁场
    
    function ajaxBookGoodsLater(data, success, error) {
        $.ajax({
            type: 'post',
            url: bookGoodsLaterURL,
            data: data,
            success: success,
            error: error
        });
    }

    function ajaxBookGoods(data, success, error) {
        $.ajax({
            type: 'post',
            url: bookGoodsURL,
            data: data,
            success: success,
            error: error
        });
    }

    var getListURL = '/usercard/getListByKey';
    var getListURLdata = {
        keyword:'', // 关键词（模糊查询卡号，手机，姓名）
        // page:1, // 页码，默认为1，第一页
        // page_size:20, // 每页记录数，默认为20
        // sort_key:'card_number', // 排序字段，默认为id, 可选：
        // sort_value:'DESC', // 排序方式，升序：“ASC”，降序“DESC”，默认DESC
        type:1
      }

    // 锁场模块的 input 的关键词搜索功能（3.0版移入）
    var inputSearch = {
      $inputCardNumber:$('#locked_card_number'),
      $inputName:$('#locked_name_in'),
      $inputPhone:$('#locked_mobile_in'),
      inputList:[$('#locked_card_number'),$('#locked_name_in'),$('#locked_mobile_in')],
      data:getListURLdata,
      listData:[],
      index:null,
      WAIT_TIME:100,
      timer:null,
      status:0,
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
          $(item).removeAttr('disabled').removeAttr('dta-id');
          $(item).val('').parent().find('.nm-inputsearch').html('');
        });
        this.listData = [];
        this.index = null;
        $('.pop-validorder2 .money').removeClass('hide');
        $('#bookSubmit').attr('disabled','');
      },
      init:function(){
        var that = this;
        this.$inputCardNumber.attr('data-search_type','1');
        this.$inputName.attr('data-search_type','0');
        this.$inputPhone.attr('data-search_type','2');
        this.$inputPhone.on('input propertychange',function(){
            // debugger
            if ( mobileTest(this.value) && $('#tableMain >li[data-selected]').length < 5 && that.$inputCardNumber.val() == '' ) {
                $('#bookSubmit').removeAttr('disabled');
            } else {
                $('#bookSubmit').attr('disabled','');
            }
        });
        $.each(this.inputList,function(index,item){
          $(item).attr('data-type',index);
          $(item).after('<div class="nm-inputsearch"></div>');
          $(item).on('input propertychange keydown',function(e){
            that.inputChange(this,e);
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
            phone:this.listData[this.index].phone,
            id:this.listData[this.index].id
          },$(dom).attr('data-type'));
        }
      },
      inputSetValue:function(obj,type){
        this.status = 1;
        var that = this;
        var data = obj || {};
        var card_number = data.card_number || '';
        var phone = data.phone || '';
        var name = data.name || '';
        this.$inputCardNumber.val(card_number);
        this.$inputCardNumber.attr('data-id',data.id);
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
          item.removeAttr('data-id');
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
      inputChange:function(dom,e){
        // console.log(e);
        // alert(e.type);
        if ( e.type == 'keydown' && e.keyCode !== 8 ) {
            return 
        } 
        if ( $.trim(dom.value) === '' && this.status === 1 ) {
          this.status = 0;
          this.deleteAllValue();
          return false;
        }
        if ( $(dom).attr('name') == 'locked_number' ) {
          $('#bookSubmit').attr('disabled',''); 
        }
        if ( $(dom).attr('name') == 'locked_name' ) return false;
        $.each(this.inputList,function(index,item){
          if ( $(item).attr('name') !== $(dom).attr('name') && item[0].hasAttribute('disabled') ) {
            $(item).removeAttr('disabled').val('');
          }
        });
        var getListData = this.data;
        var that = this;
        getListData.keyword = $(dom).val();
        getListData.type = $(dom).attr('data-search_type');
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
              li.setAttribute('data-id',item.id);
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
              li.setAttribute('data-id',item.id);
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
              li.setAttribute('data-id',item.id);
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

    function ajaxGetListURL(getListData,successCallback,errorCallback) {
      $.ajax({
        type:'get',
        url:getListURL,
        data:getListData,
        success:successCallback,
        error:errorCallback,
      });
    }

    var updateShowConfigURL = '/suppliers/updateShowConfig';

    function ajaxUpdateShowConfig(data,success,error){
        $.ajax({
            url:updateShowConfigURL,
            data:data,
            success:success,
            error:error
        });
    }

    // 右键菜单模块
    var contextmenu = {
      dom:{},
      type:'',
      $dom:$('#contextmenu'),
      $contextmenu1:$('#contextmenu1'),
      $contextmenu2:$('#contextmenu2'),
      $contextmenu3:$('#contextmenu3'),
      init:function(){
        var that = this;
        this.$contextmenu1.click(function(){
        loadingBox.show();
          that.hide();
          var end_time = Number(that.dom.__data__[that.dom.__data__.length -1].end_time );
          var start_time = Number(that.dom.__data__[that.dom.__data__.length -1].start_time );
          var j = Number(that.dom.__data__[that.dom.__data__.length -1].__y__);
          var type = that.dom.getAttribute('data-type');
          if ( type == 'main') {
            end_time += 30;
            start_time += 30;
          }
          var nextItem = main.cookDataFn2Data[j][end_time];
          var oItem = main.cookDataFn2Data[j][start_time];
          var copylist = ['status','name','phone','card_id','card_no','__type__','__name__','__phone__'];
          var data = {
              phone:oItem.phone,
              name:oItem.name,
              card_no:oItem.card_no,
              book_date:main.data.venuesConfig.book_date,
              cat_id:main.data.venuesConfig.cat_id,
          }
          var error = error;
          var success = function(res){
            loadingBox.hide();
            if ( res.status == '0000' ) {
                copyObj(nextItem,oItem,copylist);
                main.render.reRenderAfterCookDataEdit();
            } else {
                tipsBox.show(res.msg);
            }
          }
          if ( nextItem.price >= 0 ) {
                data.data = JSON.stringify([{
                    start_time:strFormatTime(nextItem.start_time),
                    end_time:strFormatTime(nextItem.end_time),
                    goods_id:nextItem.goods_id
                }]);
                ajaxBookGoods(data,success,error);
            } else {
                data.data = JSON.stringify([{
                    start_time:strFormatTime(nextItem.start_time),
                    end_time:strFormatTime(nextItem.end_time),
                    course_number:nextItem.course_number
                }]);
                ajaxBookGoodsLater(data,success,error);
            }
        });
        this.$contextmenu2.click(function(){
          that.hide();
          // console.log(2222);
          var number = that.dom.__data__[0].card_no;
          var phone = that.dom.__data__[0].phone;
          var name = that.dom.__data__[0].name;
          var card_id = that.dom.__data__[0].card_id;
          var card_no = that.dom.__data__[0].card_no;
          // console.log(that.dom.__data__[0]);
          
          var opt = {
            type:'edit',
            number:number,
            cat_id:main.data.venuesConfig.cat_id,
            phone:phone,
            name:name,
          }
          if ( card_id !== '0' ) {
            opt.card_id = card_id;
          } else if ( card_no !== '' ) {
            opt.card_no = card_no;
          }

          fixedCourt.show(opt,function(){
            // that.hide();
            // that.list.getList();
          });
        });
        this.$contextmenu3.click(function(){
            that.hide();
            if (that.dom.__data__[0].__mix__) {
                $(that.dom.__data__[0].__mix__).addClass('hide');

                $.each(that.dom.__data__,function(index,item){
                    if (item.__li__) $(item.__li__).removeClass('hide');
                });
            }
        });
      },
      show:function(){
        addZindex(this.$dom);
        this.$dom.removeClass('hide');
      },
      hide:function(){
        this.$dom.addClass('hide');
      },
      moveTo:function(dom,type,e){
        this.dom = dom;
        this.type = type;
        this.$dom.css({
            // 'top':Number(this.dom.getAttribute('data-top')) + TABLE_ITEM_HEIGHT + 'px',
            // 'left':Number(this.dom.getAttribute('data-left')) + Number(this.dom.getAttribute('data-width')) / 2 * TABLE_ITEM_WIDTH - 100 + 'px'
            'top':e.clientY + 'px',
            'left':e.clientX  + 'px',
            'position':'fixed',
        });
        this.show();
        this.showWhatContextmenu();
      },
      showWhatContextmenu:function(){
        var end_time = Number(this.dom.__data__[this.dom.__data__.length -1].end_time);
        var start_time = Number(this.dom.__data__[this.dom.__data__.length -1].start_time);
        var j = Number(this.dom.__data__[this.dom.__data__.length -1].__y__);
        var type = this.dom.getAttribute('data-type');
        var nextItem = main.cookDataFn2Data[j][end_time];
        var oItem = main.cookDataFn2Data[j][start_time];
        this.$contextmenu1.addClass('hide');
        this.$contextmenu2.addClass('hide');
        if ( oItem.__type__ == 'member' ) this.$contextmenu2.removeClass('hide');
        this.$contextmenu3.addClass('hide');
        if ( type === 'mix' ) this.$contextmenu3.removeClass('hide');
        if ( type === 'main' ) {
            nextItem = main.cookDataFn2Data[j][end_time + 30];
        }
        if ( nextItem && nextItem.__type__ === 'noting' ) this.$contextmenu1.removeClass('hide');
        if ( type === 'mix' && Number(this.dom.getAttribute('data-height')) > 1) this.$contextmenu1.addClass('hide');
        if ( oItem.status != 1 ) this.$contextmenu1.addClass('hide');
        this.checkAllHide();
      },
      checkAllHide:function(){
        if (this.$contextmenu1.hasClass('hide') && this.$contextmenu2.hasClass('hide') && this.$contextmenu3.hasClass('hide')){
            this.hide();
        }
      }
    }

    contextmenu.init();

    // 联系客服模块
    var service = {
        $dom:$('#service'),
        $domInner:$('#service .dialogue-box-inner'),
        $serviceName:$('#serviceName'),
        $servicePhone:$('#servicePhone'),
        $serviceWeixin:$('#serviceWeixin'),
        $serviceCode:$('#serviceCode'),
        $customer_phone:$('#customer_phone'),
        $close:$('#service .close'),
        $btn:$('#serviceBtn'),
        $bussiness:$('#bussiness'),
        ajaxSuccess:false,
        init: function(data) {
            var that = this;
            this.data = data;
            this.$close.click(function() {
                that.hide();
            });
            this.$btn.click(function() {
              that.show();
            });
            this.$serviceName.addClass('hide');
            this.$servicePhone.addClass('hide');
            this.$serviceWeixin.addClass('hide');
            this.$customer_phone.addClass('hide');
            this.$dom.find('.code').addClass('hide');
            this.$serviceCode.on('load',function(e){
                that.$domInner.css('min-height',(e.target.height + 100) + 'px');
            });
        },
        getData:function(){
            loadingBox.show();
            var that = this;
            var data = {};
            var error = error;
            var success = function(res){
                loadingBox.hide();
                var res = JSON.parse(res);
                if ( res.status == '0000' ) {
                    that.ajaxSuccess = true;
                    var name = res.data.name;
                    var phone = res.data.phone;
                    var wechat_id = res.data.wechat_id;
                    var customer_phone = res.data.customer_phone;
                    var wechat_qr_code = res.data.wechat_qr_code;
                    if ( name == '' && phone == '' && wechat_id == '' && wechat_qr_code == '' ) {
                        that.$bussiness.addClass('hide');
                    } else {
                        that.$bussiness.removeClass('hide');
                    }
                    res.data.name && that.$serviceName.removeClass('hide').html(name);
                    res.data.phone && that.$servicePhone.removeClass('hide').html('手机： '+phone);
                    res.data.wechat_id && that.$serviceWeixin.removeClass('hide').html('微信号： '+wechat_id);
                    res.data.customer_phone && that.$customer_phone.removeClass('hide').html(customer_phone);
                    if ( res.data.wechat_qr_code ) {
                        that.$dom.find('.code').removeClass('hide');
                        that.$serviceCode.attr('src',wechat_qr_code);
                    }
                    
                    showBC('blackCoverForService');
                    addZindex(that.$dom);
                    that.$dom.removeClass('hide');
                } else {
                    tipsBox.show(res.msg);
                }
            }
            ajaxGetFollow(data, success, error);
        },
        show: function() {
            if ( !this.ajaxSuccess ) return this.getData();
            showBC('blackCoverForService');
            addZindex(this.$dom);
            this.$dom.removeClass('hide');
            this.$domInner.css('min-height','auto');
        },
        hide: function() {
            hideBC('blackCoverForService');
            this.$dom.addClass('hide');
        },
    }

    var getFollowURL = '/suppliers/getFollow';

    function ajaxGetFollow(data, success, error) {
        $.ajax({
            type: 'get',
            url: getFollowURL,
            data: data,
            success: success,
            error: error
        });
    }

    service.init();

    // 图例模块
    var icon_example = {
        $dom:$('#icon_example'),
        $arr:$('#icon_example .arr'),
        open:true,
        openWidth:550,
        openName:'glyphicon glyphicon-chevron-right',
        closeName:'glyphicon glyphicon-chevron-left',
        closeWidth:30,
        init:function(){
            var that = this;
            this.setPosition();
            this.$arr.click(function(){
                that.openSwitch();
            });
        },
        setPosition:function(){
            this.mainWidth = main.render.width;
            this.$dom.removeClass('hide');
            this.$dom.css('left',this.mainWidth - this.openWidth + 'px');
            this.$dom.css('width',this.openWidth + 'px');
        },
        openSwitch:function(){
            if ( this.open ) {
                this.open = false;
                this.$dom.css('left',this.mainWidth - this.closeWidth + 'px');
                this.$dom.css('width',this.closeWidth + 'px');
                this.$arr.find('i')[0].className = this.closeName;
            } else {
                this.open = true;
                this.$dom.css('left',this.mainWidth - this.openWidth + 'px');
                this.$dom.css('width',this.openWidth + 'px');
                this.$arr.find('i')[0].className = this.openName;
            }
        }
    }

    // 管理员短信模块
    var admin = {
        $select:$('#admin'),
        $phone:$('#phone'),
        $send:$('#send'),
        type:1,
        init:function(data){
            var that = this;
            $.each(data,function(index,item){
                var option = document.createElement('option');
                option.value = item.id;
                option.innerHTML = item.admin_name;
                that.$select.append(option);
            });
            if ( data.length === 0 ) {
                this.$select.parent().addClass('hide');
                this.type = 0;
            } else {
                this.$select.parent().removeClass('hide');
                this.type = 1;
            }
            this.$send.click(function(){
                var mobile = $.trim(that.$phone.val());
                var send_type = that.type;
                var admin_id = that.$select.val();
                var admin_name = that.$select.find('option[value="'+that.$select.val()+'"]').html();
                var cat_id = main.data.venuesConfig.cat_id;
                var data = {
                    phone:mobile,
                    type:send_type,
                    cat_id:main.data.venuesConfig.cat_id,
                }
                var success = function(res){
                    // console.log(typeof res);
                    // console.log(res);
                    if ( typeof res === 'object' ) {
                        var data = res;
                    } else {
                        var data = JSON.parse(res);
                    }
                    tipsBox.show(data.msg);
                }
                var error = error;
                if ( !mobile ) return tipsBox.show('请输入手机号码！');
                if ( !mobileTest(mobile) ) return tipsBox.show('手机号码格式不正确');
                if ( admin_name ) {
                    data.admin_name = admin_name;
                    data.admin_id = admin_id;
                    commonDialogBox.show({
                      title:'确认管理员',
                      desc:'确认管理员:'+ admin_name +'？',
                      sureText:'确认'
                    },function(){
                      ajaxSend(data, success, error);
                    });
                } else {
                    ajaxSend(data, success, error);
                }
            });
        },
    }

    // 订单验证
    var checkOrder = {
        $dom:$('#checkOrder'),
        $btn:$('#checkOrderBtn'),
        $input:$('#checkOrderInput'),
        $send:$('#checkOrderSend'),
        $close:$('#checkOrder .close'),
        init:function(){
            var that = this;
            this.$btn.click(function(){
                that.show();
            });
            this.$close.click(function(){
                that.hide();
            });
            this.$send.click(function(){
                var code = that.$input.val();
                if ( code == '' ) return tipsBox.show('请输入验证码');
                var data = {
                    verification_code:code
                }
                var error = error;
                var success = function(res){
                    var res = JSON.parse(res);
                    if ( (res.status === '0000' && res.data.repeat_check == 0)  || res.status === '0303' ) {
                        var _html = '';

                        if ( res.data.order_type == '1' ) {
                            _html += "<div>"+ res.data.goods_name + "  "+ res.data.category_name +"</div>"
                        } else {
                            $.each(res.data.goods_list, function(index, item) {
                               html += "<div>"+ res.data.category_name + " "+ item.course_name + " "+ item.start_time + " 至 "+ item.end_time +"</div><br />";
                            });
                        }

                        commonDialogBox.show({
                          title:'订单验证',
                          desc:_html,
                          sureText:'确认'
                        },function(){
                          that.hide();
                          if ( res.status === '0000' && res.data.repeat_check == 0 ) {
                            tipsBox.show('验证成功');
                          } else {
                            tipsBox.show('重复验证');
                          }
                        });

                    } else {
                        if ( res.data.repeat_check == 1 ) {
                            tipsBox.show('重复验证');
                        } else {
                            tipsBox.show(res.msg);
                        }
                    }
                }
                ajaxOrderCheck(data, success, error);
            });
        },
        show:function(){
            showBC('blackCoverForCheckOrder');
            addZindex(this.$dom);
            this.$dom.removeClass('hide');
        },
        hide:function(){
            hideBC('blackCoverForCheckOrder');
            this.$dom.addClass('hide');
        },
    }

    checkOrder.init();


    function ajaxOrderCheck(data, success, error) {
        $.ajax({
            type: 'get',
            url: orderCheckURL,
            data: data,
            success: success,
            error: error
        });
    }

    function ajaxSend(data, success, error) {
        $.ajax({
            type: 'get',
            url: sendURL,
            data: data,
            success: success,
            error: error
        });
    }

    function ajaxGoodslist(data, success, error) {
        $.ajax({
            type: 'get',
            url: goodslistURL,
            data: data,
            success: success,
            error: error
        });
    }

    function ajaxGoodslistLater(data, success, error) {
        $.ajax({
            type: 'get',
            url: goodslistLaterURL,
            data: data,
            success: success,
            error: error
        });
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

    function mobileTest(number){
        return !!/1[2345678]{1}\d{9}$/.test(number);
    }

    function copyObj(nextItem,oriItem,copylist){
        $.each(copylist,function(index,value){
            nextItem[value] = oriItem[value];
        });
    }

    // 解锁模块
    var unlock = {
        start:function(dom){
            // console.log(dom.__data__);
            if ( dom.__data__[0].__type__ == 'lock_icon' ) return this.unlock_icon(dom);
            this.unlockAjax(dom);
        },
        unlock_icon:function(dom){
            if ( dom.__data__[0].price == 0 ) return tipsBox.show('价格为0的场地不能解锁');
            this.unlockAjax(dom);
        },
        unlockSuccess:function(dom){
            var that = this;
            var type = dom.getAttribute('data-type');
            if ( type == 'main' ) {
                var before = dom.__data__[0];
                var after = main.cookDataFn2Data[before.__y__][before.start_time + 30];
                this.unlockClear(before);
                this.unlockClear(after);
            } else {
                $.each(dom.__data__,function(index,item){
                    that.unlockClear(item);
                });
            }
            main.render.reRenderAfterCookDataEdit();
        },
        unlockClear:function(obj){
            obj.status = '0';
            obj.__type__ = 'noting';
            obj.name = '';
            obj.phone = '';
            obj.__name__ = '';
            obj.__phone__ = '';
            obj.card_id = '0';
            obj.card_no = '';
            obj.__select__ = false;
            obj.__sn__ = '';
            // 九天后
            if ( obj.price < 0 ) obj.lock_id = '';
            precook(obj);
        },
        unlockAjax:function(dom){
            
            var that = this;
            var list = findTimeListInCookDataFn2DataWithDom(dom);
            var price = dom.__data__[0].price;
            var error = error;
            var success = function(res){
                loadingBox.hide();
                if ( res.status == '0000' ) {
                    that.unlockSuccess(dom);
                } else {    
                    tipsBox.show(res.msg);
                }
            }
            var data = {
                book_date:main.data.venuesConfig.book_date,
                cat_id:main.data.venuesConfig.cat_id,
            }
            commonDialogBox.show({
              title:'解锁场地',
              desc:'确认解锁这块场地？',
              sureText:'确认'
            },function(){
                if ( price > 0 ) {
                    loadingBox.show();
                    data.data = JSON.stringify(getDataForNineDay(list).data);
                    ajaxUnBookGoodsInfo(data, success, error);
                } else if ( price < 0 ) {
                    loadingBox.show();
                    // 九天后解锁也改成穿半点数据 和 九天后锁场一致
                    // data.id = getDataForNineDayLaterUnlock(list).data.join(',');
                    data.data = JSON.stringify(getDataForNineDayLater(list).data);
                    ajaxUnBookGoodsLater(data, success, error);
                }
            });
        }
    }

    function findTimeListInCookDataFn2DataWithDom(dom){
        var list = [];
        var type = dom.getAttribute('data-type');
        if ( type == 'main') {
            var j = dom.__data__[0].__y__;
            var start_time = dom.__data__[0].start_time;
            list.push(dom.__data__[0]);
            list.push(main.cookDataFn2Data[j][start_time + 30]);
            return list;
        } else {
            $.each(dom.__data__,function(index,item){
                list.push(item);
            });
            return list;
        }
    }

    var unBookGoodsInfoURL = '/goodslist/unBookGoodsInfo'; // 九天内解锁
    var unBookGoodsLaterURL = '/goodslist/unBookGoodsLater'; // 九天后解锁

    function ajaxUnBookGoodsInfo(data,success,error){
        $.ajax({
            url:unBookGoodsInfoURL,
            data:data,
            type:'post',
            success:success,
            error:error
        });
    }

    function ajaxUnBookGoodsLater(data,success,error){
        $.ajax({
            url:unBookGoodsLaterURL,
            data:data,
            type:'post',
            success:success,
            error:error
        });
    }
    function getDataForNineDayLaterUnlock (array) {
        var list = array;
        // var hourList = {};
        var data = [];

        // 同九天后解锁接口 改为半点一个lock_id
        // 
        // $.each(list,function(index,item){
        //     if ( !hourList[item.hour+'-'+item.course_number] ) hourList[item.hour+'-'+item.course_number] = [];
        //     hourList[item.hour+'-'+item.course_number].push(item);
        // });

        // for ( var name in hourList ) {
        //     var start_time = (hourList[name][0].start_time <= hourList[name][hourList[name].length -1].start_time ) ? hourList[name][0].start_time : hourList[name][hourList[name].length -1].start_time;
        //     var end_time = (hourList[name][0].end_time >= hourList[name][hourList[name].length -1].end_time ) ? hourList[name][0].end_time : hourList[name][hourList[name].length -1].end_time;
        //     var id = hourList[name][0].lock_id;
            // data.push(id);
        // }
        $.each(list,function(index,item){
            data.push(item.lock_id);
        });
        // console.log(data);
        return {data:data,list:list};
    }
    function getDataForNineDayLater (array){
        var list = array;
        // var hourList = {};
        var data = [];

        // 半点合并一小时，（旧接口代码，现新接口用半小时为单位，故弃用）
        // $.each(list,function(index,item){
        //     if ( !hourList[item.hour+'-'+item.course_number] ) hourList[item.hour+'-'+item.course_number] = [];
        //     hourList[item.hour+'-'+item.course_number].push(item);
        // });

        // console.log(hourList);
        // for ( var name in hourList ) {
        //     var start_time = (hourList[name][0].start_time <= hourList[name][hourList[name].length -1].start_time ) ? hourList[name][0].start_time : hourList[name][hourList[name].length -1].start_time;
        //     var end_time = (hourList[name][0].end_time >= hourList[name][hourList[name].length -1].end_time ) ? hourList[name][0].end_time : hourList[name][hourList[name].length -1].end_time;
        //     var course_number = hourList[name][0].course_number;
        //     data.push({
        //        start_time:strFormatTime(start_time), 
        //        end_time:strFormatTime(end_time), 
        //        course_number:course_number
        //     });
        // }
        // 
        $.each(list,function(index,item){

            data.push({
                start_time:strFormatTime(item.start_time), 
                end_time:strFormatTime(item.end_time), 
                course_number:item.course_number
            });

        });

        // console.log(data);
        return {data:data,list:list};

    }

    function findTimeListInCookDataFn2Data (array){
        // this.$lock_preorder.find('li.half-time-select')
        var list = [];
        $.each(array,function(index,item){
            var j = $(item).attr('data-j');
            var startTimeValue = $(item).find('select[name=start]').val();
            var endTimeValue = $(item).find('select[name=end]').val();
            var startTime = timeFormat(startTimeValue);
            var endTime = timeFormat(endTimeValue);
            for (var timeList = [];startTime !== endTime ; ) {
                endTime = endTime - 30;
                timeList.push(endTime);
            }
            $.each(timeList,function(i,it){
                list.push(main.cookDataFn2Data[j][it]);
            });
        });
        return list;
    }

    function getDataForNineDay (array){
        var list = array
        var goodslist = {};
        var data = [];
        
        $.each(list,function(index,item){
            if ( !goodslist[item.goods_id] ) goodslist[item.goods_id] = [];
            goodslist[item.goods_id].push(item);
        });

        // console.log('goodslist',goodslist);

        for ( var name in goodslist ) {
            // var start_time = (goodslist[name][0].start_time <= goodslist[name][goodslist[name].length -1].start_time ) ? goodslist[name][0].start_time : goodslist[name][goodslist[name].length -1].start_time;
            // var end_time = (goodslist[name][0].end_time >= goodslist[name][goodslist[name].length -1].end_time ) ? goodslist[name][0].end_time : goodslist[name][goodslist[name].length -1].end_time;
            
            // 解锁改为半点一传 goodslist[name][0]是半点或前半
            var start_time = goodslist[name][0].start_time;
            var end_time = goodslist[name][0].end_time;

            var goods_id = goodslist[name][0].goods_id;
            data.push({
               start_time:strFormatTime(start_time), 
               end_time:strFormatTime(end_time), 
               goods_id:goods_id
            });

            // 解锁改为半点一传 goodslist[name][1]是后半
            if ( goodslist[name][1] ) {
                var start_time1 = goodslist[name][1].start_time;
                var end_time1 = goodslist[name][1].end_time;
                data.push({
                   start_time:strFormatTime(start_time1), 
                   end_time:strFormatTime(end_time1), 
                   goods_id:goods_id
                });
            }
        }
        // console.log(data);
        return {data:data,list:list};
    }

    // 检查会员卡
    function checkUsercard(fn){
        var $inputCardNumber = $('#locked_card_number');
        var $inputName = $('#locked_name_in');
        var $inputPhone = $('#locked_mobile_in');
        if ( $.trim($inputCardNumber.val()) === '' ) {
            return typeof fn === 'function' ? fn() : false;
        }
        $.ajax({
            url:'/usercard/check',
            type:'post',
            data:{card_no:$.trim($inputCardNumber.val())},
            success:function(res){
                if ( res.status === '0000'  ) {
                    $inputName.val(res.data.name);
                    $inputPhone.val(res.data.phone);
                    return typeof fn === 'function' ? fn() : false;
                } else {
                    loadingBox.hide();
                    tipsBox.show(res.msg)
                }
            },
            error:error
        });
    }

    // 你有一个新订单模块
    var messagerBox = {
        $dom:$('#messagerBox'),
        $close:$('#messagerBox .close'),
        $content:$('#messagerBox .content ul'),
        $chatAudio:$('#chatAudio'),
        $refundAudio:$('#refundAudio'),
        payOrderList:[],
        refundOrderList:[],
        LOOP_TIME:100000,
        timestamp:null,
        init:function(){
            var that = this;
            this.$close.click(function(){
                that.hide();
                that.clearContent();
            });
            setTimeout(function(){
                that.loopFetch();
            },this.LOOP_TIME);
        },
        loopFetch:function(){
            var that = this;
            this.fetch();
            setTimeout(function(){
                that.loopFetch();
            },this.LOOP_TIME);
        },
        show:function(){
            addZindex(this.$dom);
            this.$dom.removeClass('hide');
        },
        hide:function(){
            this.$dom.addClass('hide');
        },
        clearContent:function(){
            this.$content.html('');
        },
        palyNewOrderMP3:function(){
            if(!("ActiveXObject" in window && !(!![].map))){
               this.$chatAudio[0].play(); //播放声音
            }
        },
        playNewRefundMP3:function(){
            if(!("ActiveXObject" in window && !(!![].map))){
               this.$refundAudio[0].play(); //播放声音
            }
        },
        checkHasNewOrder:function(list,type){
            var that = this;
            var checkNew = false ;
            var newOrder = [];
            if ( type == 'pay' ) {
                var strList = this.payOrderList.join(',') + ',';
                var orderList = this.payOrderList;
            } else if ( type == 'refund' ) {
                // debugger;
                var strList = this.refundOrderList.join(',') + ',';
                var orderList = this.refundOrderList;
            }
            
            
            $.each(list,function(index,item){
                if ( (strList).indexOf(item.order_sn + ',') == -1 ) {
                    // new order
                    checkNew = true;
                    orderList.push(item.order_sn);
                    that.appendNewContent(item,type);
                    newOrder.push(item);
                }
            });

            return {checkNew:checkNew,newOrder:newOrder};
        },
        appendNewContent:function(item,type){
            var re = '订单号';
            if ( type == 'refund') {
                re = '退订订单号'
            }
            var _html = "<li>"+item.cat_name+" "+re+"："+item.order_sn+" "+item.course_name+"："+item.start_time+"</li>";
            this.$content.append(_html);
        },
        canIReload:function(list){
            var pageDate = main.data.venuesConfig.book_date;
            var pageCatName = main.data.catList[main.data.venuesConfig.cat_id];
            var can = false;
            $.each(list,function(index,item){
                var date = item.book_date.split(' ')[0];
                var cat_name = item.cat_name;
                if ( date == pageDate && cat_name == pageCatName ) can = true;
            });

            if ( can ) {
                main.getData(function() {
                    main.reload();
                });
            }
        },
        fetch:function(){
            var data = {};
            var error = error;
            var that = this;
            var success = function(res){
                if ( res.status == '0000' ) {
                    that.timestamp = new Date().getTime();
                    var hasNewPayOrder = false;
                    var hasNewRefundOrder = false;
                    var newOrder = [];
                    if ( res.data.pay_list.length > 0 ) {
                        var temp = that.checkHasNewOrder(res.data.pay_list,'pay');
                        hasNewPayOrder = temp.checkNew;
                        newOrder = newOrder.concat(temp.newOrder);
                    }

                    if ( res.data.refund_list.length > 0 ) {
                        var temp = that.checkHasNewOrder(res.data.refund_list,'refund');
                        hasNewRefundOrder =  temp.checkNew;
                        newOrder = newOrder.concat(temp.newOrder);
                    }

                    if ( hasNewPayOrder && hasNewRefundOrder ) {
                        that.show();
                        that.palyNewOrderMP3();
                    } else if ( hasNewPayOrder ) {
                        that.show();
                        that.palyNewOrderMP3();
                    } else if ( hasNewRefundOrder ) {
                        that.show();
                        that.playNewRefundMP3();
                    }
                    // console.log('newOrder:',newOrder);
                    that.canIReload(newOrder);
                }
            }
            ajaxCheckNewOrder(data,success,error);
        },
    }

    var checkNewOrderURL = '/Order/checkNewOrder/';

    function ajaxCheckNewOrder(data,success,error){
        $.ajax({
            url:checkNewOrderURL,
            data:data,
            type:'get',
            success:success,
            error:error
        });
    }

    function cookTitle(array){
        var re = [];
        // 数组去重
        $.each(array,function(index,item){
            if ( re.join(',').indexOf(String(item)) === -1 ) re.push(item);
        });
        // 累加
        return re.join('');
    }

    function getInformation(hash){
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

    function setHash(key,value){
        var hash = window.location.hash.replace('#','');
        var info = getInformation(hash);
        info[key] = value;
        var setValue = '';
        for ( var name in info ) {
            if ( name !== '' ) {
                setValue += name + '=' + info[name] + '&';
            }
        }
        setValue = setValue.substring(0,setValue.length - 1 );
        window.location.hash = setValue;
    }

    main.init();

    // window.showInfo = function(){
    //     return main;
    // }
    // window.showMouseData = function(){
    //     return mouseFn;
    // }
});