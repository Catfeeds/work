 $(document).ready(function() {
     //$('a.tips').cluetip({splitTitle: '|'});
     $('span.td-wlyd2').cluetip({ splitTitle: '|', showTitle: false, width: '220' });
     $('span.td-wlyd4').cluetip({ splitTitle: '|', showTitle: false, width: '220' });
     $('span.td-wlyd5').cluetip({ splitTitle: '|', showTitle: false, width: '220' });
     $('span.td-hyyd').cluetip({ splitTitle: '|', showTitle: false, width: '220' });
     //$('span.td-cgsd').cluetip({splitTitle: '|',showTitle:false,width:'200'});

     //定时执行,检查是否有新订单
     setInterval(checkNewOrder, 179000); //120000、179000

     //下拉滚动时现 时间栏 add by chenchao 2014-06-07
     $(window).scroll(function() {
         if ($(window).scrollTop() >= 240) {
             $(".scrollnav").addClass("fixedNav");
             $(".scrollnav").show();
         } else {
             $(".scrollnav").removeClass("fixedNav");
             $(".scrollnav").hide();
         }
     });

     $('#msgBox .close').click(function () {
         $('#msgBox').addClass('hide');
     })

     $('.ordervalid').click(function(e) {
         $('.popbg').fadeIn();
         $('.pop-validorder').fadeIn();
         $('#check_code').focus();
         $('.closepop').click(function() {
             $('.popbg').fadeOut();
             $('.pop-validorder').fadeOut();
         })
     });
     $('.orderbatch').click(function(e) {
         $('.popbg').fadeIn().height($(document).height());
         $('.pop-preorder').fadeIn();
         $('.popbg').click(function() {
             $('.popbg').fadeOut();
             $('.pop-preorder').fadeOut();
         })
     });

     $(".runButton").click(function() {
         new Function($(this).prev().text()).call();
     });

     //订单验证
    $('#checkOrder').click(checkOrderHandle)
    $('#check_code').focus(function (e) {
        documentOnKeyup(checkOrderHandle)
    });
    $('#check_code').blur(function (e) {
        documentOffKeyup(checkOrderHandle)
    });
    function documentOnKeyup (fn) {
        $(document).on('keyup',fn)
    }
    function documentOffKeyup (fn) {
        $(document).off('keyup',fn)
    }
    function checkOrderHandle (e) {
        if(e.type == 'keyup' && e.keyCode != 13 ) return false;
        if ($('#check_code').val()) {
            $.get('/Order/orderCheck/', { /*'mobile': $('#check_mobile').val(), */'verification_code': $('#check_code').val() }, function(data) {
                var ret = $.parseJSON(data);

                if ((ret.status == "0000" && ret.data.repeat_check == 0) || ret.status == '0303'  /*|| ret.status == '5000' */ ) {
                    $("#order_info").html("");
                    $('.pop-validorder').fadeOut();
                    $('.pop-order-tj').fadeIn();
                    //写场地数据，前端显示方法，editby Dale @2015-10-30
                    /* if (ret.data.order_type == "1") {
                          $("#order_info").append("<div style=\"text-align:center;\">" + ret.data.goods_name + "  " + ret.data.category_name + "</div>");                         } 
                      else {
                          $("#order_info").append("<div style=\"text-align:center;\">" + ret.data.goods_name + "</div>");
                      }
                    */
                    if (ret.data.order_type == "1") {
                        $("#order_info").append("<div>"+ ret.data.goods_name + "  "+ ret.data.category_name  +"</div><br />");
                    }
                    else {      
                        $.each(ret.data.goods_list, function(index, item) {
                            $("#order_info").append("<div>"+ ret.data.category_name + " "+ item.course_name + " "+ item.start_time + " 至 "+ item.end_time +"</div><br />");
                        });
                    }

                      //$("#order_info").append("<input id=\"order_sn\" name=\"order_sn\" type=\"hidden\" value=\"" + ret.order_no + "\" />");
                    $("#check_code").val("");
                    if (ret.status == "0000") {
                        $("#check_order_msg").html('验证成功');
                    } else {
                        $("#check_order_msg").html('重复验证');
                    }

                }else if(ret.status == "0000" && ret.data.repeat_check == 1){
                	alert('重复验证');
                }
                else {
                    if (ret.msg) {
                        alert(ret.msg);
                    } else {
                        alert('系统繁忙！');
                    }
                }
                  
                  //取消按钮
                $('.canclorderbtn').click(function() {
                    //$("#order_info").html("");
                    $('.popbg').fadeOut();
                    $('.pop-order-tj').fadeOut();
                });
            });
        } else {
            alert("请输入验证码!");
        }
    }
         //确认验证订单
     /*$('.checkorderbtn').click(function() {
         $.get('/index/ConfirmOrder/', { 'order_sn': $('#order_sn').val() }, function(data) {
             var ret = $.parseJSON(data);
             $("#order_info").html(""); //清空订单的场次信息
             if (ret.flag) {
                 $('.popbg').fadeOut();
                 $('.pop-order-tj').fadeOut();
                 alert(ret.msg);
             } else {
                 alert(ret.msg);
             }

         });
     });*/

     /*---------------场地操作 add by chenchao Start-----------------------*/
     //处理确认确定锁定场地
    $('.pop-validorder2 input').focus(function () {
        documentOnKeyup(lockedSubmitHandle)
    })
    $('.pop-validorder2 input').blur(function () {
        documentOffKeyup(lockedSubmitHandle)
    })
    $('#lockedSubmit').click(lockedSubmitHandle)
    function lockedSubmitHandle(e) {
    	
        if(e.type == 'keyup' && e.keyCode != 13 ) return false;
        var data = new Array();
        $("input:hidden[name='goods_id[]']").each(function() {
            if ($(this).val() > 0) {
                data.push($(this).val());
            }
        });
        if (data.length > 0) {
            var mobile = $('#locked_mobile_in').val();
            var name = $('#locked_name_in').val();
            /* if (!/1[2345678]{1}\d{9}$/.test(mobile)) {
                alert("手机号码格式不正确!");
                return false;
            } */
            $.get('/Goods/lock/', { 'goods_id[]': data, 'is_on_sale': '1', 'locked_name': name, 'locked_mobile': mobile }, function(data) {
                var ret = $.parseJSON(data);
                if (ret.status == "0000") {
                    if ($('#is_show_mobile').val() == 1) {
                        //如果显示自定义内容，刷新页面，不做样式处理
                        
                        setCookiesBFReload($('.col-busi.col-busi-order.sj-table .tablewrap')[0],'scrollOpt');
                        location.reload();

                    }
                    
                    $("input:hidden[name='goods_id[]']").each(function() {
                        if ($(this).val() > 0) {
                        var sid = '#span_' + $(this).val();
                        //更改样式
                        /*  $(sid).attr('class', 'td-cgsd');
                            //清理JS事件
                            $(sid).removeAttr('onmousedown');
                            $(sid).attr('onclick', "UnLockCourse(this,'" + $(this).val() + "')");*/
                            if(name == "" && mobile == ""){
                                $(sid).attr('class', 'td-cgsd')
                            }
                            else{
                                $(sid).attr('class', 'td-cgsd td-wlyd3'); 
                                $(sid).attr('title', '名称：'+ name +'   号码：'+ mobile);
                            }
                               
                            //清理JS事件
                            $(sid).removeAttr('onmousedown');
                            $(sid).attr('onclick', "UnLockCourse(this,'" + $(this).val() + "')");
                              
                            str_html ='<span style="height:16px;line-height: 16px;padding-top:2px;">' + mobile + '</span> <span style="height:16px;line-height: 16px;">' + name + '</span>'
                            $(sid).append(str_html);
                            if("ActiveXObject" in window && navigator.userAgent.indexOf('IE 7') > -1){
                                
                                setCookiesBFReload($('.col-busi.col-busi-order.sj-table .tablewrap')[0],'scrollOpt');
                                location.reload();

                            }
                        }
                    });
                      //清除内容
                    $('#lock_preorder').empty();
                      //退出
                    $('.popbg').fadeOut();
                    $('.pop-validorder2').fadeOut();
                } else {
                      alert(ret.msg);
                }
            });
        } else {
            alert("请选择要锁定的场地!");
         }
    }

     //发送短信
     $("#sendSmsBtn").click(function() {
         var mobile =$.trim($('#phone').val());
         var cat_id = $('#cat_info').val();
         if (mobile) {
             if (!/1[2345678]{1}\d{9}$/.test(mobile)) {
                 alert("手机号码格式不正确!");
                 return false;
             } else {
                 var send_type = $('#send_type').val();
                 if (send_type == '1') {
                     //弹出确认管理员提示
                     var admin_id = $('#checkSupplier').val();
                     var admin_name = $("#checkSupplier").find("option:selected").text();
                     if (admin_id == '0') {
                         alert("请选择管理员!");
                         return false;
                     }
                     if (confirm("确认管理员：" + admin_name + "?")) {
                         //发送短信
                         $.get('/Promote/send/', { 'phone': mobile, 'admin_id': admin_id, 'admin_name': admin_name, 'type': send_type , 'cat_id': cat_id}, function(data) {
                             var ret = $.parseJSON(data);
                             if (ret.status == 0000) {
                                 $('#phone').val('');
                                 alert(ret.msg);
                             } else {
                                 alert(ret.msg);
                             }
                         });
                     }
                 } else {
                     //发送短信
                     $.get('/Promote/send/', { 'phone': mobile, 'type': send_type, 'cat_id': cat_id}, function(data) {
                         var ret = $.parseJSON(data);
                         if (ret.status == 0000) {
                             $('#phone').val('');
                             alert(ret.msg);
                         } else {
                             alert(ret.msg);
                         }
                     });
                 }
             }
         } else {
             alert("请输入手机号码!");
             return false;
         }
     });
     
     //预留
     $("#bookSubmit").click(function() {
        if(this.hasAttribute('disabled')){
            return false
        }
         var data = new Array();
         $("input:hidden[name='goods_id[]']").each(function() {
             if ($(this).val() > 0) {
                 data.push($(this).val());
             }
         });
        
        if (data.length > 0 && data.length < 5) {
        	 $('#bookSubmit').removeAttr('disabled'); 
             var mobile = $('#locked_mobile_in').val();
             var name = $('#locked_name_in').val();
             if (!/1[2345678]{1}\d{9}$/.test(mobile)) {
                 alert("手机号码格式不正确!");
                 return false;
             }
             $('#bookSubmit').attr('disabled','');
             $('body').append($('<div id="commonLoading" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,.2);z-index: 99999999;"><style>@-moz-keyframes rotate360 {from {transform: rotateZ(0deg)}to {transform: rotateZ(360deg)}}@keyframes rotate360 {from {-webkit-transform: rotateZ(0deg);transform: rotateZ(0deg)}to {-webkit-transform: rotateZ(360deg);transform: rotateZ(360deg)}}@-webkit-keyframes rotate360 {from {-webkit-transform: rotateZ(0deg)}to {-webkit-transform: rotateZ(360deg)}}</style><img style="animation: rotate360 1s linear 0s infinite;position: absolute;top: 50%;left: 50%;margin-top: -64px;margin-left: -64px;" src="http://m.qydw.net/static/images/loading.png"></div>'))
             $.get('/Order/reserveOrders/', { 'goods_id[]': data, 'phone': mobile, 'name': name }, function(data) {
                 var ret = $.parseJSON(data);
                 
                 
                 if (ret.status == "0000") {
                     if ($('#is_show_mobile').val() == 1) {
                         //如果显示自定义内容，刷新页面，不做样式处理
                         setCookiesBFReload($('.col-busi.col-busi-order.sj-table .tablewrap')[0],'scrollOpt');
                         location.reload();

                     }
                     location.reload();
                 } else {
                	 $('#bookSubmit').removeAttr('disabled');
                	 $('#commonLoading').remove()
                       alert(ret.msg);
                 }
             });
         } else {
             alert("请选择要锁定的场地!");
          }
     });
     
     //重发短信
     $("#reSendMsg").click(function() { 
        if(this.hasAttribute('disabled')){
            return false
        }
    	 var order_id = $('#book_order_id').val();
    	 if(order_id == ""){
    		 alert("该订单数据不正确");
             return false;
    	 }
    	 $.get('/Order/resendSmsOrders/', { 'order_id': order_id }, function(data) {
             var ret = $.parseJSON(data);
             if (ret.status == "0000") {
            	 alert("发送成功");
                 $('#cancelBookingBoxBG').addClass('hide');
                 $('#cancelBookingBox').addClass('hide');
             } else {
                   alert(ret.msg);
             }
             location.reload();
         });
     });
     
     //取消下单
     $("#unBook").click(function() { 
         if(this.hasAttribute('disabled')){
             return false
         }
    	 var order_id = $('#book_order_id').val();
    	 var user_id = $('#book_user_id').val();
    	 if(order_id == ""){
    		 alert("该订单数据不正确");
             return false;
    	 }
    	 if(user_id == ""){
    		 alert("该用户数据不正确");
             return false;
    	 }
    	 if(confirm("确定要取消预留吗？")){
    		 $.get('/Order/cancelOrders/', { 'order_id': order_id, 'user_id': user_id }, function(data) {
                 var ret = $.parseJSON(data);
                 if (ret.status == "0000") {
                	 alert("取消成功");
                     /*$('#cancelBookingBoxBG').addClass('hide');
                     $('#cancelBookingBox').addClass('hide');*/
                 } else {
                       alert(ret.msg);
                 }
                 location.reload();
             });
    	 }
    	
     });
     
 });
//右键 
 document.oncontextmenu = function(e) {
	is_reserve = $("#is_reserve").val();
    if($('.pop-validorder2').css('display') == 'block') return false
	var money = 0;
    if ( e && e.preventDefault ) 
        e.preventDefault(); 
    //IE中阻止函数器默认动作的方式 
    else
        window.event.returnValue = false; 
     // e.preventDefault();
     //场地确认锁定弹出
     var data = new Array();
     $('#locked_name_in').val('');
     $('#locked_mobile_in').val('');
     $('#bookSubmit').attr('disabled','')
     $('.tips').attr('class', 'tips hide'); 
     $("input:hidden[name='goods_id[]']").each(function() {
         if ($(this).val() > 0) {
             data.push($(this).val());
             money += parseFloat($('#span_' + $(this).val()).attr('channel_price'));
         }
     });

     if (data.length > 0) {
    	 if(is_reserve != ""){
    		 $('.popbg').fadeIn().height($(document).height());
             $('.pop-validorder2').fadeIn();
             $('#locked_name_in').focus();
             $('.popbg').click(function() {
                 $('.popbg').fadeOut();
                 $('.pop-validorder2').fadeOut();
             });
             //关闭
             $('.closepop').click(function() {
                 $('.popbg').fadeOut();
                 $('.pop-validorder2').fadeOut();
             })
             //预售金额
             money = '金额：' + money + '元';
             $('.money').html(money);
             if(data.length > 4){
            	 $('.tips').attr('class', 'tips'); 
            	 $('.tips').html('最多只能预留4片场地'); 
            	 $('#bookSubmit').attr('disabled', ''); 
             }
        	 else{
        		 $('.tips').attr('class', 'tips hide'); 
        		 //$('#locked_mobile_in').removeAttr('disabled')
        		 //直接提示能操作
        		 $.get('/Venues/checkGroupGoods/', {'goods_id[]': data, 'book_date': $("#book_date").val()}, function(data) {
        	         //应该判断ret.status是否存在
        			 var ret = $.parseJSON(data); 
        	         if (ret && ret.status == '0000') {
        	             if (!ret.data.is_check) {
        	            	 info = "";
        	            	 $.each(ret.data.goods, function(index, item) {
        	            		
        	            		 $.each(item, function(index2, item2) {
        	            			 info += $('#span_'+ item2).attr("content") + ","; 
                                 });
                             });
    	            		 info += "<br/>需要打包预留";
    	            		 $('.tips').attr('class', 'tips'); 
    	            		 $('.tips').html(info); 
    	            		 //$('#locked_mobile_in').attr('disabled','')
        	             }
        	             else{
        	            	 $('.tips').html(""); 
        	             }
        	         }
        		 });
        	 }
    	 }
    	 else{

    		 $('.popbg').fadeIn().height($(document).height());
             $('.pop-validorder2').fadeIn();
             $('#locked_name_in').focus();
             $('.popbg').click(function() {
                 $('.popbg').fadeOut();
                 $('.pop-validorder2').fadeOut();
             });
             //关闭
             $('.closepop').click(function() {
                 $('.popbg').fadeOut();
                 $('.pop-validorder2').fadeOut();
             }) 
    	 }
     }  

     
     // return false;
 }

 // 验证订单的场馆商品
 function verifySale (orderId, obj){
     var html = '';
     var saleGoods = '';

     if (orderId == "0") {
         alert("订单id不能为空");
         return;
     }
     saleGoods = $(obj).attr('sale_goods');
     if (saleGoods == '') {
         alert("没有场馆卖品存在");
         return;
     }
     saleGoods = eval('(' + saleGoods + ')');
     $(saleGoods).each(function (index, item) {
         html += "<li>" + item.name + " &nbsp;&nbsp;X" + item.num + "</li>";
     });

     $('#msgBox .lists').html(html);
     $('#msgbox_order_id').val(orderId);
     $('#msgBox').removeClass('hide');
 }

 //选择场地更新数据
 function LockCourse(e, obj) {
     if (e.which == 1 || e.button == 1) {
         $(obj).toggleClass('selecttd');
         //选中,更新input数据
         if ($(obj).attr('class') == 'selecttd') {
             if ($(obj).attr('goods_id') > 0) {
                 var liHtml = '<li id="liHtml_' + $(obj).attr('goods_id') + '">' + $(obj).attr('content') + '<b class="delrow" style="display:none;"></b><input name="goods_id[]" type="hidden" value="' + $(obj).attr('goods_id') + '" /></li>';
                 $('#lock_preorder').append(liHtml);
             }
         } else {
             var sid = '#liHtml_' + $(obj).attr('goods_id');
             $(sid).remove();
         }
     }

     $('.canclebtn').click(function() {
         $('.popbg').fadeOut();
         $('.pop-lock').fadeOut();
     });
 }

 //已锁定场地，解锁场地
 function UnLockCourse(obj, id) {
     if (confirm("是否将此场地解锁?")) {
         var price = $(obj).attr('price');
         var cat_id = $('#cat_info').val();
         if (price > 0) {
             if (id > 0) {
                 $.get('/Goods/lock/', { 'goods_id[]': id, 'is_on_sale': '0', 'cat_id': cat_id }, function(data) {
                     var ret = $.parseJSON(data);
                     if (ret.status == 0000) {
                         //解锁后处理JS事件
                         $(obj).removeAttr('onclick');
                         $(obj).attr('onmousedown', 'LockCourse(event,this)');

                         //解锁后处理样式显示
                         $(obj).toggleClass('td-cgsd');
                         $(obj).removeClass('td-wlyd3');
                         $(obj).html('');
                         var span_id = $("#span_"+id);
                         span_id.attr('title','');
                         if("ActiveXObject" in window && navigator.userAgent.indexOf('IE 7') > -1){
                            
                            setCookiesBFReload($('.col-busi.col-busi-order.sj-table .tablewrap')[0],'scrollOpt');
                            location.reload();

                         }
                     } else {
                         alert(ret.msg);
                     }
                 });
             } else {
                 alert("请选择要解锁的场地!");
             }
         } else {
             alert("价格为0的场地不可解锁!");
         }
     }
 }

  //是否有新订单
 function checkNewOrder() {
     $.get('/Order/checkNewOrder/', function(data) {
         var ret = data;
         //应该判断ret.status是否存在
         if (ret && ret.status != undefined) {
             var cent = '';
             if (ret.data.pay_list != "") {
                 if(!("ActiveXObject" in window && !(!![].forEach))){
                    $('#chatAudio')[0].play(); //播放声音
                 }
				 
                 if (!!$("#messager")[0]) {
                     $.each(ret.data.pay_list, function(index, item) {
                         var sid = '#span_' + item['goods_id'];
                         $(sid).removeAttr('onmousedown');
                         var ordermsg = $("#messager .msg_content").html();
                         cent = ordermsg + '<div class="newOrder-list"><span class="newOrder-span1"><em>' + item['cat_name'] + ' 订单号：</em><em>' + item['order_sn'] + ' </em></span><span><em>' + item['course_name'] + '：</em><em>' + item['start_time'] + '</em></span></div>';
                         //cent = ordermsg + item['cat_name'] + ' 订单号：' + item['order_sn'] + '  &nbsp;&nbsp;' + item['course_name'] + ' &nbsp;&nbsp;' + item['book_date'] + ' ' + item['hour'] + "<br />";     
						 $("#messager .msg_content").html(cent);

                     });
					 
					 
                 } else {
                     $.each(ret.data.pay_list, function(index, item) {
                         var sid = '#span_' + item['goods_id'];
                         if (item['order_type'] == 3) {
                             //更改样式
                             $(sid).attr('class', 'td-hyyd');
                         } else {
                             $(sid).attr('class', 'td-wlyd');
                         }
                         $(sid).removeAttr('onmousedown');
                         cent = cent + '<div class="newOrder-list"><span><em>' + item['cat_name'] + ' 订单号：</em><em>' + item['order_sn'] + ' </em></span><span><em>' + item['course_name'] + '：</em><em>' + item['start_time']  + '</em></span></div>';
                     });
                 }

             }
             if (ret.data.refund_list!="") {
                 if(!("ActiveXObject" in window && !(!![].forEach))){
                    $('#refundAudio')[0].play(); //播放声音
                 }
                 if (!!$("#messager")[0]) {
                     $.each(ret.data.refund_list, function(index, item) {
                         var sid = '#span_' + item['goods_id'];
                         $(sid).removeAttr('class');
                         var ordermsg = $("#messager .msg_content").html();
                         //cent = ordermsg + item['cat_name'] + ' 退订订单号：' + item['order_sn'] + '  &nbsp;&nbsp;' + item['course_name'] + ' &nbsp;&nbsp;' + item['book_date'] + ' ' + item['hour'] + "<br />";
                         cent = ordermsg + '<div class="newOrder-list"><span><em>' + item['cat_name'] + ' 退订订单号：</em><em>' + item['order_sn'] + ' </em></span><span><em>' + item['course_name'] + '：</em><em>' + item['start_time'] + '</em></span></div>';
                         $("#messager .msg_content").html(cent);
                     });
                 } else {
                     $.each(ret.data.refund_list, function(index, item) {
                         var sid = '#span_' + item['goods_id'];
                         $(sid).removeAttr('class');
                         cent =  cent + '<div class="newOrder-list"><span><em>' + item['cat_name'] + ' 退订订单号：</em><em>' + item['order_sn'] + ' </em></span><span><em>' + item['course_name'] + '：</em><em>'+ item['start_time'] + '</em></span></div>';
                        // cent = cent + item['cat_name'] + ' 退订订单号：' + item['order_sn'] + '  &nbsp;&nbsp;' + item['course_name'] + ' &nbsp;&nbsp;' + item['book_date'] + ' ' + item['hour'] + "<br />";					
                     });
                 }
             }           
        
			if(cent != "")
			{
			 	cent= '有新订单,请刷新查看!<br />' + cent ;
				$.messager.show({ content: cent, width: 450, height: 400, time: 50000 });     
			}
         }
     }, "json");
 }
 //$.messager.show({content:'有新订单,是否刷新页面!', width:300, height:150, time:8000});
 /*---------------场地操作 add by chenchao End-----------------------*/
 function changeCat() {
     var cat_id = $('#cat_id_value').val();
     if (cat_id > 0) {
         window.location.href = "/Goods/index/?cat_id=" + cat_id;
     }
 }
 //切换场馆
 function changeSupplier() {
     var venues_id = $('#venues_id').val();
     var cat_id = $('#cat_id_value').val();
     if (venues_id > 0) {
         window.location.href = "/Venues/switchVenues?venues_id=" + venues_id + "&cat_id=" + cat_id;
     }
 }


 //确认锁场按钮 
 function lockCourt() {
     var data = new Array();
     $("input:hidden[name='goods_id[]']").each(function() {
        $('#locked_name_in').val('');
        $('#locked_mobile_in').val('');
        $('#bookSubmit').attr('disabled','')

         if ($(this).val() > 0) {
             data.push($(this).val());
         }
     });
     if (data.length > 0) {
         if (confirm("是否锁定此场地?")) {
             $.get('/Goods/lock/', { 'goods_id[]': data, 'is_on_sale': '1', 'locked_name': $('#locked_name_in').val(), 'locked_mobile': $('#locked_mobile_in').val() }, function(data) {
                 var ret = $.parseJSON(data);
                 if (ret.status == 0000) {
                     $("input:hidden[name='goods_id[]']").each(function() {
                         if ($(this).val() > 0) {
                             var sid = '#span_' + $(this).val();
                             //更改样式
                             $(sid).attr('class', 'td-cgsd');
                             //清理JS事件
                             $(sid).removeAttr('onmousedown');
                             $(sid).attr('onclick', "UnLockCourse(this,'" + $(this).val() + "')");
                             if("ActiveXObject" in window && navigator.userAgent.indexOf('IE 7') > -1){
                                
                                setCookiesBFReload($('.col-busi.col-busi-order.sj-table .tablewrap')[0],'scrollOpt');
                                location.reload();

                             }
                         }
                     });
                     //清除内容
                     $('#lock_preorder').empty();
                 } else {
                     alert(ret.msg);
                 }
             });
         }
     } else {
         alert("请选择要锁定的场地!");
     }
 }


 $(document).ready(function() {
    /*$('#tableContainer td').eq(2).html(`<span id="span_100062944" 
                                              title="名称：张三   号码：13211111111" 
                                              price="30.00" 
                                              content="15:00-16:00 VIP场" 
                                              goods_id="100062944" 
                                              onclick="unBooking(this,100062944);" 
                                              class="td-cgsd td-wlyd3 booking">
                                              <span style="height:16px;line-height: 16px;padding-top:2px;">13211111111</span>
                                              <span style="height:16px;line-height: 16px;">张三</span>
                                        </span>`)
    $('#tableContainer td').eq(1).html(`<span id="span_100062962" 
                                            title="订&nbsp;单&nbsp;号：161017111110984229|场次金额：￥30.00|手机尾号：2362|支付时间：2016-10-17 11:11:29|使用日期：2016-10-17|订单场次：|VIP场地 15:00 - 16:00" 
                                            sale_goods="" 
                                            order_id="59042" 
                                            price="30.00" 
                                            content="15:00-16:00 " 
                                            goods_id="100062962" 
                                            class="td-wlyd td-wlyd2 td-booking booking">
                                        预留</span>`)*/

    $('#cancelBookingBoxClose').click(function(){
        $('#cancelBookingBoxBG').addClass('hide')
       $('#cancelBookingBox').addClass('hide')/*.find('ul').each(function(index,item){
            $(item).find('li').each(function(ind,it){
                if(ind != 0){
                    $(it).remove()
                }
            })
        })*/
        //$('#cancelBookingBox .money').text('')
    })

    $('#locked_mobile_in').on('onpropertychange input change',function(e){
        if(/1[2345678]{1}\d{9}$/.test(this.value)){
            var data = new Array();
            var tips = $('.tips').html();
            $("input:hidden[name='goods_id[]']").each(function() {
                if ($(this).val() > 0) {
                    data.push($(this).val());
                }
            });
            if(data.length>4){
            	$('#bookSubmit').attr('disabled','');
            	tips += " 最多只能预留4片场地";
            	$('.tips').attr('class', 'tips');
            }
            else{
            	if(tips==""){
                	$('#bookSubmit').removeAttr('disabled');
                	$('.tips').attr('class', 'tips hide');
            	}
            }
            
        }else{
        	
            $('#bookSubmit').attr('disabled','')
        }
    })

     $("#venueName .virtal-option-selected").click(selectedClickEvent);

     $("#eventName .virtal-option-selected").click(selectedClickEvent);

     $("#eventName .virtal-option-item").click(function() {
         changePage($("#venueName .virtal-option-selected").attr("data-suppliers-id"), $(this).attr("data-cat-id"));
     });

     $("#venueName .virtal-option-item").click(function() {
         $("#venueName .virtal-option-item").addClass("hide");
         $("#venueName .virtal-option-selected").text($(this).text()).attr("data-suppliers-id", $(this).attr("data-suppliers-id")).attr("data-active", "false");
         creatCatVirtalOption($(this).attr("data-catid-list"), $(this).attr("data-catname-list"));
     });

     //切换场馆
     function changePage(supplier, cat) {
         var suppliers_id = parseInt(supplier);
         var cat_id = parseInt(cat);
         if (suppliers_id > 0) {
             window.location.href = "/index/?suppliers_id=" + suppliers_id + "&cat_id=" + cat_id;
         }
     }

     function selectedClickEvent() {
         if ($(this).attr("data-active") === "false") {
             $(this).attr("data-active", "true").siblings().removeClass("hide");
         } else if ($(this).attr("data-active") === "true") {
             $(this).attr("data-active", "false").siblings().addClass("hide");
         }
     }

     function creatCatVirtalOption(catidList, catnameList) {
         var catidList = catidList.split(",");
         var catnameList = catnameList.split(",");
         var lis = [];
         if (catidList.length > 0) {
             $("#eventName ul").html("");
             var li = '<li data-cat-id="" class="virtal-option virtal-option-selected" data-active="true">请选择</li>';
             lis.push(li);

             for (var i = 0; i < catidList.length; i++) {
                 li = '<li data-cat-id="' + catidList[i] + '" class="virtal-option virtal-option-item">' + catnameList[i] + '</li>';
                 lis.push(li);
             }
             for (var j = 0; j < lis.length; j++) {
                 $(lis[j]).appendTo($("#eventName ul"));
             }
             $("#eventName .virtal-option-selected").click(selectedClickEvent);
             $("#eventName .virtal-option-item").click(function() {
                 changePage($("#venueName .virtal-option-selected").attr("data-suppliers-id"), $(this).attr("data-cat-id"));
             });
         }
     }

     $('#msgBox .btnstyle').click(function (){
         var orderId = $('#msgbox_order_id').val();
         $.get('/Order/saleGoodsCheck/', { 'order_id': orderId}, function(data) {
             var ret = $.parseJSON(data);
             if (ret.status == "0000"){
                 
                 setCookiesBFReload($('.col-busi.col-busi-order.sj-table .tablewrap')[0],'scrollOpt');
                 window.location.reload();

             }else{
                 alert(ret.msg);
             }
         });
     })
 });

function setCookiesBFReload (dom,name) {
    if(!dom) return false;
    var windowScrollTop = $(window).scrollTop()
    var windowScrollLeft = $(window).scrollLeft()
    var domScrollTop = $(dom).scrollTop()
    var domScrollLeft = $(dom).scrollLeft()
    var value = windowScrollTop+','+windowScrollLeft+','+domScrollTop+','+domScrollLeft
    setCookie(name,value,1)
}

function getCookiesBFReload (dom,name) {
    if(!dom) return false;
    var value = getCookie(name).split(',')
    if(value[0] == 0) return false
    $(window).scrollTop(value[0])
    $(window).scrollLeft(value[1])
    $(dom).scrollTop(value[2])
    $(dom).scrollLeft(value[3])
    setCookie(name,0,1)
}
//显示预留订单信息
function unBooking(dom,id){
    $('#cancelBookingBoxBG').removeClass('hide')
    $('#cancelBookingBox').removeClass('hide')
    
    order_info = $("#order_detail_json_"+id).val();
    var obj = jQuery.parseJSON(order_info);
    var order_detail = obj.goods_detail;

    if(obj.order_status > 0){
    	$('#reSendMsg').attr("disabled", "");
    	$('#unBook').attr("disabled", "");
    }
    else {
    	$('#reSendMsg').removeAttr("disabled");
    	$('#unBook').removeAttr("disabled");
    }
    $('.book_name').html(obj.user_name); 
    $('.book_phone').html(obj.mobile); 
    $('.money').html("金额："+obj.total_amount); 
    $('#book_order_id').val(obj.order_id); 
    $('#book_user_id').val(obj.user_id); 


    
    var li = '<li>场地：</li>';
    for (i=0;i<order_detail.length ;i++ )   
    {   
         li += "<li>" + order_detail[i] + "</li>"
    }   
    $('.book_course').html(li); 
}
