
//屏蔽右键鼠标右键
document.oncontextmenu = function() {
    return false;
}

$(function() {
    //确认打包场次
    $('#setting-edit-button').click(settingEdit)
    

    $('#setting-delete-button').click(settingDelete);

    getCookiesBFReload ($('.col-busi.sj-table .tablewrap')[0],'BCSScroll')
});

function settingDelete(e) {
    if(e.type == 'keyup' && e.keyCode != 13 ) return false;
    documentOffKeyup(settingDelete);
    $('#setting-delete-button').unbind("click"); // 防止重复点击，造成并发
    var course_id = $('#setting-delete-course_id').val();
    var hour = $('#setting-delete-hour').val();
    var goods_group_ids = $('#setting-delete-goods_group_ids').val();
    $.get('/Goodsgroup/deleteGoodsGroupSetting/', {
        'course_id': course_id,
        'hour': hour,
        'week': week,
        'cat_id': cat_id,
        'goods_group_ids': goods_group_ids
    }, function (ret) {
        if (ret.status === '0000') {
            setCookiesBFReload($('.col-busi.sj-table .tablewrap')[0],'BCSScroll');
            window.location.reload();
        } else {
            alert(ret.msg);
            setCookiesBFReload($('.col-busi.sj-table .tablewrap')[0],'BCSScroll');
            window.location.reload();
        }
    });

}

function settingEdit(e) {
    if(e.type == 'keyup' && e.keyCode != 13 ) return false;
    var data = new Array();
    $("input:hidden[name='hour[]']").each(function () {
        if (typeof($(this).val()) != "undefined") {
            data.push($(this).val());
        }
    });
    if (data.length > 0) {
        documentOffKeyup(settingEdit);
        $('#setting-edit-button').unbind("click"); // 防止重复点击，造成并发
        var course_id = $('#input_course_id').val();
        var course_name = $('#input_course_name').val();
        var goods_group_data = $('#input_goods_group_data').val();
        $.get('/Goodsgroup/editGoodsGroupSetting/', {
            'hour[]': data,
            'course_id': course_id,
            'course_name': course_name,
            'week': week,
            cat_id: cat_id,
            'goods_group_data': goods_group_data
        }, function (ret) {
            if (ret.status === '0000') {
                setCookiesBFReload($('.col-busi.sj-table .tablewrap')[0],'BCSScroll');
                window.location.reload();
            } else {
                alert(ret.msg);
                setCookiesBFReload($('.col-busi.sj-table .tablewrap')[0],'BCSScroll');
                window.location.reload();
            }
        });
    } else {
        alert("请选择要打包的场地!");
    }
}

//选择场地更新数据
function LockCourse(e, obj) {
    if (e.which == 1 || e.button == 1) {
        $(obj).toggleClass('selecttd');
        var sid = 'goods_group_setting_'+$(obj).attr('course_id')+'_'+$(obj).attr('hour');
        sid = sid.replace(/:/gi, "-"); //替换时间中的':'符号
        //选中,更新input数据
        if ($(obj).attr('class') == 'selecttd') {
            if ($(obj).attr('course_id') > 0){
                var html = '<li id="'+sid+'">'+ '打包场地：'+ $(obj).attr('content') + '<input id="input_course_id" name="course_id[]" type="hidden" value="'+$(obj).attr('course_id')+'" /><input id="input_course_name" name="course_name" type="hidden" value="'+$(obj).attr('course_name')+'" /><input name="hour[]" type="hidden" value="'+$(obj).attr('hour')+'" /></li>';
                $('#goods-group-list-setting-edit').append(html);
            }
        } else {
            $('#'+sid).remove();
        }
    }
    if (e.which == 3 || e.button == 2) {
        //场地确认锁定弹出
        var data = new Array();
        $("input:hidden[name='hour[]']").each(function() {
            if ($(this).val() != '') {
                data.push($(this).val());
            }
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

        //验证两个时段是否连续
        if (Math.abs(parseInt(data[0]) - parseInt(data[1])) != 1) {
            alert('只能打包连续的时段');
            return false;
        }
        if ((data.length > 1) && flag) {
            // 根据场地信息获取goods_id
            $.ajax({
                type : "GET",
                url : "/Goodsgroup/getBookGoodsByCourt",
                data : {'course_id':course_id, 'hour':data.join(','), 'week':week, 'cat_id':cat_id},
                dataType:'JSON',
                async : false,
                success : function(ret){
                    var goods_list = ret.data.list;
                    if (goods_list.length != 'undefined' && goods_list.length > 0){
                        var goods_goods_data = JSON.stringify(goods_list);
                        $('#input_goods_group_data').val(goods_goods_data);
                    }
                }
            });

            $('.popbg').fadeIn().height($(document).height());
            $('.setting-edit').fadeIn();
            documentOnKeyup(settingEdit);
            $('.popbg').click(function() {
                $('.popbg').fadeOut();
                $('.setting-edit').fadeOut();
                documentOffKeyup(settingEdit);
            });
            //关闭
            $('.setting-edit .bind-layer-close').click(function() {
                $('.popbg').fadeOut();
                $('.setting-edit').fadeOut();
                documentOffKeyup(settingEdit);
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
    var course_id = $(obj).attr('course_id');
    if (course_id > 0 && id != '') {
        $('#setting-delete-hour').val(id);
        $('#setting-delete-course_id').val(course_id);
        $('#goods-group-list-setting-delete').html($(obj).attr('content'));

        // 根据场地信息获取group_id
        $.ajax({
            type : "GET",
            url : "/Goodsgroup/getGoodsGroupIdsByCourt",
            data : {'course_id':course_id, 'hour':id, 'week':week, 'cat_id':cat_id},
            dataType:'JSON',
            async : false,
            success : function(ret){
                $('#setting-delete-goods_group_ids').val(ret.data.goods_group_ids);
            }
        });

        $('.popbg').fadeIn().height($(document).height());
        $('.setting-delete').fadeIn();
        documentOnKeyup(settingDelete);
        $('.popbg').click(function () {
            $('.popbg').fadeOut();
            $('.setting-delete').fadeOut();
            documentOffKeyup(settingDelete);
        });
        //关闭
        $('.setting-delete .bind-layer-close').click(function () {
            $('.popbg').fadeOut();
            $('.setting-delete').fadeOut();
            documentOffKeyup(settingDelete);
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
