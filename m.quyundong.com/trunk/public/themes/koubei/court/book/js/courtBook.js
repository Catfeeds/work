var verticalArr = [];
$(window).on("load",function(){
	var touchType = ('createTouch' in document) ? 'tap' : 'click';
	var selectCourts = {}, uParam = {}, selectCourts2 = {}, bindCourtArr = [];
	var utils = {
		getUrlParam: function(){
			var s = location.search;
			if(s.length < 2) {
				return;
			}
			s = s.substr(1);
			var arr = s.split('&');
			$.each(arr, function(i,v){
				var n = v.split('=');
				uParam[n[0]] = n[1];
			});
		},
		updateSum: function(){
			var sum = 0;
			$.each(selectCourts, function(i,v){
				sum += v;
			});
            var cent = '';
            var str = '';
            $('#select_court_info').html('');

            var sortCourtArr = utils.sortBy1(selectCourts2);
            sortCourtArr.sort(utils.sortBy2('sort',false,parseInt));

            sortCourtArr.forEach(function(item){
            	var contents = selectCourts2[item.id].split(",");
				cent +='<li><span>'+contents[1] + ' ' + contents[0] +'</span>';
                cent +='<input type="hidden" value="'+contents[2]+'" name="price[]" />';
                cent +='<input type="hidden" value="'+contents[1]+'" name="hour[]" />';
                cent +='<input type="hidden" value="'+contents[0]+'" name="course_name[]" /></li>';
                cent += '<input type="hidden" value="'+contents[3]+'" name="real_time[]" />';
                var checkReturn = utils.bindCourt(item.id,contents);
				if(!utils.checkInGroup(item.id)){
					var classN = "";
					classN = contents[0].length <= 6 ? "txtStyle3" : "txtStyle1";
					str += "<li><div>"+contents[3]+"</div><div><div class='"+classN+"'>"+contents[0]+"</div></div></li>"
				}else{
					if(checkReturn){
						str += checkReturn;
					}
				}
            })

            var total = sum ? sum + "元 " : "";
			$('.J_submit div:nth-of-type(1)').html(total+"提交订单");
            $('.court-tips ul').html(cent);
            $('.book-orderinfo').html(str);

            if($('.book-orderinfo li').size()>0){
            	$(".book-orderinfo").removeClass('hide');
            	$(".book-tip").addClass('hide');
            }else{
				$('.J_submit div:nth-of-type(1)').html("请选择场地");
            	$(".book-orderinfo").addClass('hide');
            	$(".book-tip").removeClass('hide');
            }
		},
		checkInGroup:function(id){
			var bInBindGroup = false;
			bindCourtArr.forEach(function(item){
				if(item.group_id.indexOf(id) > -1){
					bInBindGroup = true;
				}
			})
			return bInBindGroup;
		},
		bindCourt:function(id,contents){
			var returnStr = "";
			bindCourtArr.forEach(function(item){
				if(item.group_id.indexOf(id)>-1){
					if(item.key == 0){
						item.key = 1;
						returnStr = "";
					}else{
						item.key = 0;
						var arr = item.timeLen.split(",");
						    a = '',
						    b = arr[0].split("-")[0],
						    c = arr[0].split("-")[1],
						    d = arr[1].split("-")[0],
						    e = arr[1].split("-")[1];
						if(parseInt(b) > parseInt(d)){
							a = d + "-" +c;
						}else{
							a = b + "-" +e;
						}
						returnStr = "<li><div>"+a+"</div><div><div class='txtStyle2'>"+contents[0]+"</div><p>打包时段</p></div></li>";
					}
				}
			})
			return returnStr;
		},
		sortBy1:function(data) {
			var arr = [];
	        for (var i in data) {
	            arr.push({'id':i,'sort':data[i].split(",")[4]});
	        }
	        return arr;
	    },
		sortBy2:function(filed, rev, primer) {
	        rev = (rev) ? -1 : 1;
	        return function(a, b) {
	            a = a[filed];
	            b = b[filed];
	            if (typeof(primer) != 'undefined') {
	                a = primer(a);
	                b = primer(b);
	            }
	            if (a <= b) {
	                return rev * -1;
	            }
	            if (a > b) {
	                return rev * 1;
	            }
	            return 0;
	        }
	    }
	};

	var bookIndex = 0;
	var bindDOM = function(){
		$('.book-list').on("click", 'li', function(){
			if(g.bNopay > 0){
				$(".book-noPaySprite").removeClass("hide");
				return;
			}
			var el = $(this);
			var curGid = el.attr('goodsid');
			if(el.hasClass('disable')){
				showToast("该场次已出售");
				return;
			}

			verticalArr = [];
			//exist in the array, delete it
			if(selectCourts[curGid]!=undefined){
				delete selectCourts[curGid];
                delete selectCourts2[curGid];
				el.addClass('available');
				el.removeClass('selected');
				//最小起订时间限制
				if(minHour>1){
					var bindId = el.attr('bind_id'); //打包关联ID
					var col = el.parent();
					$('li[bind_id='+bindId+']').each(function(){
						var goodsId = $(this).attr('goodsid');
						delete selectCourts[goodsId];
                        delete selectCourts2[goodsId];
        				$(this).addClass('available');
        				$(this).removeClass('selected');
					});
				}else{
					//打包处理
	                var group_ids = el.attr('group_ids');

	                bindCourtArr = $.grep(bindCourtArr,function(item){
			            return (item.group_id != group_ids);
			        });

	                var group_arr = new Array();
	                if (group_ids != ''){
	                    group_arr=group_ids.split(',');
	                    for(var i=0;i<group_arr.length;i++){
	                        var blid = "#block_"+group_arr[i];
	                        if(!$(blid).hasClass('disable')  && !!$(blid)[0]){
	                            delete selectCourts[group_arr[i]];
	                            delete selectCourts2[group_arr[i]];
	            				$(blid).addClass('available');
	            				$(blid).removeClass('selected');
	                        }
	                    }  
	                }	
				}
                
                //打包处理
			} else {
			    var selectNum=1;
                $.each(selectCourts, function(i,v){
    				selectNum++;
    			});
                if (selectNum > 4){
                    showToast("您选择的场次数太多啦，请分两次下单结算哦。");
                    return;
                }
		        bookIndex++;
   				//最小起订时间限制
   				if(minHour>1){
   					var currentIndex = el.index();
					var enableDown = true;
					var enableUp = true;
					var col = el.parent();
					//判断上下时段是否符合选择
					for(var i=1;i<minHour;i++){
						if(!col.find('li').eq(currentIndex+i).hasClass('available')) enableDown = false;
						if(!col.find('li').eq(currentIndex-i).hasClass('available')) enableUp = false;
					}
					if(enableDown==false && enableUp==false){
						showToast('不足两小时，无法预订');
						return;
					}
					//自动选择相邻的场地
					var bindId = 'bind_'+curGid;
					el.attr('bind_id',bindId);//设置打包关联ID
					for(i=1;i<minHour;i++){
						var nextInd = enableDown==true ? currentIndex+i : currentIndex-i;//设置方向往上或往下
						var nextTarget = col.find('li').eq(nextInd)
						var goodsId = nextTarget.attr('goodsid');
						selectCourts[goodsId] = parseInt(nextTarget.find("em").html());
		                selectCourts2[goodsId] = nextTarget.attr('course_content')+","+bookIndex;
		                nextTarget.removeClass('available');
		   				nextTarget.addClass('selected');
		   				nextTarget.attr('bind_id',bindId);
					}
					
   				}else{
   					//打包处理
   	                var group_ids = el.attr('group_ids');
   	                var group_arr = new Array();
   	                if (group_ids != ''){
   	                    group_arr=group_ids.split(',');
		           		var jsonObj = {group_id:group_ids,key:0};
   	           			var timeStr = "";
   	           			var bDisable = false;
   	           			var bindCourtNum = 0;
   	                    for(var i=0;i<group_arr.length;i++){
   	                        var blid = "#block_"+group_arr[i];
   	                        if(!$(blid).hasClass('disable') && !!$(blid)[0]){
   	                            selectCourts[group_arr[i]] = parseInt($(blid).find("em").html());
   	                            selectCourts2[group_arr[i]] = $(blid).attr('course_content')+","+bookIndex;
   	           				    $(blid).removeClass('available');
   	           				    $(blid).addClass('selected');
   	           				    timeStr += (timeStr ? "," : "")+$(blid).attr('course_content').split(",")[3];
   	           				    bindCourtNum++;
   	                        }else{
   	                        	bDisable = true;
   	                        }
   	                    }
   	                    if(!bDisable || bindCourtNum >= 2){
   	                    	jsonObj.timeLen = timeStr;
			           		bindCourtArr.push(jsonObj);
   	                    }
   	                }  	
   				}
                
   				//push it to the array
   				selectCourts[curGid] = parseInt(el.find("em").html());
                selectCourts2[curGid] = el.attr('course_content')+","+bookIndex;
   				el.removeClass('available');
   				el.addClass('selected');
			} 

			$(".book-list ul").each(function(i,item){
				$(".book-area li").eq(i).removeClass("active");
				var ul = $(item);
				$("li",ul).each(function(j,val){
					var li = $(val);
					if(li.hasClass("selected")){
						if(!$(".book-area li").eq(i).hasClass("active")){
							$(".book-area li").eq(i).addClass("active");
						}
						verticalArr.push(j);
					}
				})
			})

			$(".book-time li").removeClass("active");
			for(var k in verticalArr){
				$(".book-time li").eq(verticalArr[k]).addClass("active");
				$(".book-time li").eq(verticalArr[k]+1).addClass("active");
			}
			utils.updateSum();
		});
		
		$('.day-wrap').on(touchType, '.J_selectDay', function(){
			var el = $(this);
			utils.getCourtData({
				datetime: parseInt(el.attr('time'))
			});
		});

		var clickLock = false;
		$('.J_submit').on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			if(clickLock) return;
			if(g.bNopay > 0){
				$(".book-noPaySprite").removeClass("hide");
				return;
			}
            var gids = [];
		    $.each(selectCourts, function(i,v){
  				gids.push(i);
   			});
            if (gids.length > 0){
                //跳转确认页面
				clickLock = true;
                $('.J_goodsIds').val(gids.join(','));
                $('.J_payConfirm').submit();
            }else{
                showToast("请选择场次");
            }
		});
        
        $('.J_submit2').on(touchType, function(){
			var gids = [];
			$.each(selectCourts, function(i,v){
				gids.push(i);
			});
		  $.ajax({
				url: '/order/doconfirm',
				type: 'GET',
				dataType: 'JSON',
				cache: false,
				data: {
					goods_ids: gids.join(',')
				},
				success: function(res){
                    var json=JSON.parse(res);
					if(json && json.code == 1){
						//todo: modify the url
						location.href = '/order/pay?id='+json.data;
					} else {
						utils.showError(res.msg || '支付出错，请稍后再试试');
					}
				},
				error: function(res){
					utils.showError(res.msg || '支付出错，请稍后再试试');
				}
			});
		});
	};

	utils.getUrlParam();
	bindDOM();

	$('.J_selectDay.active').trigger(touchType);
})