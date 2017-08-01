//屏蔽右键鼠标右键
document.oncontextmenu = function() {
    return false;
}

$(function() {
    //确认打包场次
    $('#goods-group-bind-button').click(goodsGroupBindHandle)

    $('#goods-group-unbind-button').click(goodsGroupUnbindHandle);

    $(".bind-layer-close").click(function(){
        $(".goods-group-bind").fadeOut();
        $(".goods-group-unbind").fadeOut();
        documentOffKeyup(goodsGroupBindHandle);
        documentOffKeyup(goodsGroupUnbindHandle);
        $('.popbg').fadeOut();
    })
    getCookiesBFReload ($('.col-busi.sj-table .tablewrap'),'BCScroll')
});

function goodsGroupUnbindHandle(e) {
    if(e.type == 'keyup' && e.keyCode != 13 ) return false;
    documentOffKeyup(goodsGroupUnbindHandle);
    $('#goods-group-unbind-button').unbind("click"); // 防止重复点击，造成并发
    var goods_group_id = $('#goods_group-unbind-goodsgroupid').val();
    $.get('/Goodsgroup/unbindGoodsGroup', {'goods_group_id': goods_group_id, 'type': '0'}, function (ret) {
        if (ret.status === '0000') {
            setCookiesBFReload($('.col-busi.sj-table .tablewrap'),'BCScroll');
            window.location.reload();
        } else {
            alert(ret.msg);
            setCookiesBFReload($('.col-busi.sj-table .tablewrap'),'BCScroll');
            window.location.reload();
        }
    });
}

function goodsGroupBindHandle(e) {
    if(e.type == 'keyup' && e.keyCode != 13 ) return false;
    var data = new Array();
    var is_submit = false; // 防止重复提交
    $("input:hidden[name='goods_id[]']").each(function() {
        if ($(this).val() > 0) {
            data.push($(this).val());
        }
    });
    if (data.length > 0) {
        documentOffKeyup(goodsGroupBindHandle);
        $('#goods-group-bind-button').unbind("click"); // 防止重复点击，造成并发
        $.get('/Goodsgroup/bindGoodsGroup', {'goods_ids[]': data, cat_id: cat_id}, function (ret) {
            is_submit = true;
            if (ret.status === '0000') {
                setCookiesBFReload($('.col-busi.sj-table .tablewrap'),'BCScroll');
                window.location.reload();
                return;
                var group_id = 0;
                $("input:hidden[name='goods_id[]']").each(function () {
                    if ($(this).val() > 0) {
                        var sid = '#span_' + $(this).val();
                        group_id = ret.data.goods_group_id;
                        $(sid).attr('group_id', group_id);
                        //更改样式
                        $(sid).attr('class', 'td-cgsd-group');
                        //清理JS事件
                        $(sid).removeAttr('onmousedown');
                        $(sid).attr('onclick', "UnLockCourse(this,'" + group_id + "')");
                    }
                });
                $('span[group_id=' + group_id + ']').eq(0).parent().attr('colspan', '2');
                $('span[group_id=' + group_id + ']').eq(0).parent().next().remove();
                //清除内容
                $('#goods-group-list').empty();
                //退出
                $('.popbg').fadeOut();
                $('.bind-layer').fadeOut();
            } else {
                alert(ret.msg);
                setCookiesBFReload($('.col-busi.sj-table .tablewrap'),'BCScroll');
                window.location.reload();
            }
        });

    } else {
        alert("请选择要打包的场地!");
    }
}


function isStretch (hoursList) {
            if(hoursList.length < 2) return false
            hoursList.sort(function (a,b) {
                return parseInt(a) - parseInt(b)
            })
            for(var i = 0 ; i < hoursList.length - 1 ; i ++){
                if(parseInt(hoursList[i+1]) - parseInt(hoursList[i]) != 1) return false
            }
            return true
        }
//选择场地更新数据
function LockCourse(e, obj) {
    if (e.which == 1 || e.button == 1) {
        $(obj).toggleClass('selecttd');
        //选中,更新input数据
        if ($(obj).attr('class') == 'selecttd') {
            if ($(obj).attr('goods_id') > 0) {
                var liHtml = '<li id="liHtml_' + $(obj).attr('goods_id') + '">'+ '打包场地：' + $(obj).attr('content') + '<input name="goods_id[]" data-hour="'+$(obj).attr('hour')+'" type="hidden" value="' + $(obj).attr('goods_id') + '" /><input name="course_id[]" type="hidden" value="' + $(obj).attr('course_id') + '" /></li>';
                $('#bind-goods-group-list').append(liHtml);
            }
        } else {
            var sid = '#liHtml_' + $(obj).attr('goods_id');
            $(sid).remove();
        }
    }
    if (e.which == 3 || e.button == 2) {
        //场地确认锁定弹出
        var data = new Array();
        var hourList = []
        $("input:hidden[name='goods_id[]']").each(function() {
            if ($(this).val() > 0) {
                data.push($(this).val());
            }
            hourList.push($(this).attr('data-hour'));
        });
        //是否为同一个场次
        var flag = true;
        var course_id = 0;
        var num = 0;
        $("input:hidden[name='course_id[]']").each(function() {
            if (course_id == 0) {
                course_id = $(this).val();
            } else {
                if (course_id != $(this).val()) {
                    flag = false;
                }
            }
            num++;
        });
        if (!flag) {
            alert('打包必须为同一场地!');
            return false;
        }

        if (num > 2) {
            alert('打包时间不能超过2小时!');
            return false;
        }
        if (num < 2) {
            alert('打包时间至少要2小时!');
            return false;
        }
        if (hourList[0] == hourList[1]){
            alert('场次重复，请联系管理员');
            return false;
        }
        //验证两个时段是否连续
        if (!isStretch(hourList)) {
            alert('只能打包连续的时段');
            return false;
        }
        
        if ((data.length > 1) && flag) {
            $('.popbg').fadeIn().height($(document).height());
            $('.goods-group-bind').fadeIn();
            documentOnKeyup(goodsGroupBindHandle);
            $('.popbg').click(function() {
                $('.popbg').fadeOut();
                $('.goods-group-bind').fadeOut();
                documentOffKeyup(goodsGroupBindHandle);
            });
            //关闭
            $('.closepop').click(function() {
                $('.popbg').fadeOut();
                $('.goods-group-bind').fadeOut();
                documentOffKeyup(goodsGroupBindHandle);
            })
        } else {
            alert('打包必须为同一场地2个及2个以上!');
        }
    }
    //取消关闭
    $('.canclebtn').click(function() {
        $('.popbg').fadeOut();
        $('.pop-lock').fadeOut();
    });
}
//已打包场地，解除打包
function UnLockCourse(obj, id) {
    if (id > 0) {

        $('#goods_group-unbind-goodsgroupid').val(id);
        var content = '<li>'+ '打包场地：' + $(obj).attr('content')+ '</li>';
        $('#unbind-goods-group-list').html(content);

        $('.popbg').fadeIn().height($(document).height());
        $('.goods-group-unbind').fadeIn();
        documentOnKeyup(goodsGroupUnbindHandle);
        $('.popbg').click(function () {
            $('.popbg').fadeOut();
            $('.goods-group-unbind').fadeOut();
            documentOffKeyup(goodsGroupUnbindHandle);
        });
        //关闭
        $('.closepop').click(function () {
            $('.popbg').fadeOut();
            $('.goods-group-unbind').fadeOut();
            documentOffKeyup(goodsGroupUnbindHandle);
        })

    } else {
        alert("请选择要解除打包的场地!");
    }
}

function changeCat() {
    var cat_id = $('#cat_id_value').val();
    if (cat_id > 0) {
        window.location.href = $('#cat_id_'+cat_id).attr('link');
    }
}

function documentOnKeyup (fn) {
    $(document).on('keyup',fn)
}
function documentOffKeyup (fn) {
    $(document).off('keyup',fn)
}

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
