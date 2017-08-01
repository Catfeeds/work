Date.prototype.format = function(format) {
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
}


function createPageFn(dom, calFn) {
    var maxPage = parseInt(dom.attr('data-page')) || 1;
    var current = parseInt(dom.attr('data-current')) || 1;
    var go = $('.totalPage', dom).text('共' + maxPage + '页');
    var oPagination = dom.find('.pagination');

    oPagination.createPage({
        pageCount: maxPage,
        current: current,
        backFn: calFn
    });

    dom.on('click', '.go', function() {
        var oPagination = dom.find('.pagination');
        var oPage = dom.find('.page');
        var v = parseInt(oPage.val());
        if (v && /^\d+$/g.test(v)) {
            var maxPage = parseInt(dom.attr('data-page'))
            if (v >= 1 && v <= maxPage) {
                oPagination.createPage({
                    pageCount: maxPage,
                    current: v
                });
                calFn(v);
            }
        }
    })
}

$(window).on('load',function(){
    $("#export_clearing_log_btn").click(function(){
        var href = $(this).attr("data-href") + "?start_date=" + $("#start_date").val() + "&end_date=" + $("#end_date").val();
        $(this).attr("href", href);
    });

   $(".modify-tbn").click(function(evt){
     evt.preventDefault();
     var a = $("#old_password").val();
     var b = $("[name=password]").val();
     var c = $("#repassword").val();
     var d = $(".modify-control>.text-danger");
     var e = ['请填写旧密码','请填写密码','请填写重复密码','密码长度不能小于6位','两次填写密码不一致'];

     if(!(a && /^\S+$/g.test(a))){
        d.eq(0).text(e[0]);
        return;
     }else if(a.length < 6){
        d.eq(0).text(e[3]);
        return;
     }else{
        d.eq(0).text('');
     }

     if(!(b && /^\S+$/g.test(b))){
        d.eq(1).text(e[1]);
        return;
     }else if(b.length < 6){
        d.eq(1).text(e[3]);
        return;
     }else{
        d.eq(1).text('');
     }

     if(!(c && /^\S+$/g.test(c))){
        d.eq(2).text(e[2]);
        return;
     }else if(b !== c){
        d.eq(2).text(e[4]);
        return;
     }else{
        d.eq(2).text('');
     }
     $("#modifyForm").submit();
   })

    function getBLen(str) {  
        if (str == null) return 0;  
        if (typeof str != "string"){  
            str += "";  
        }  
        return str.replace(/[^\x00-\xff]/g,"01").length;  
    }  

    var areaNameLi = '',areaTimeLi = '';
    $("#tableContainer tr").each(function(i,item){
        var txt = $(this).find('td,th').eq(0).text(),
            classN = getBLen(txt) <= 10 ? 'style1' : 'style2' ;
        areaNameLi += "<li class='"+classN+"'>"+txt+"</li>" ;
        if(i==0){
          $(item).find('th,td').each(function(j,obj){
            var $obj = $(obj);
            var wid = $obj.outerWidth();
            areaTimeLi += '<li style="width:'+wid+'px"><em>'+$obj.text()+'</em></li>';
          })
        }
    })
    $(".areanamewrap").html(areaNameLi);
    $(".areatimewrap").html(areaTimeLi);
    areaTimePos();

    $(window).on('scroll',areaTimePos);
    $(window).on('resize',areaTimePos);
    $('.tablewrap').on('scroll',areaTimePos);
   
    function isIe(){
       return ("ActiveXObject" in window);
    }

    if(isIe() && (navigator.userAgent.indexOf("MSIE 9") > -1 || !(!![].forEach))){
        $(".sj-select-lb i").remove();
    }
    
    $(".time-table tr").hover(function(){
        var index = $(this).index();
        if(index == 0){
            $(this).css('backgroundColor','transparent');
            $(".areanamewrap li").eq(index).css('backgroundColor','transparent');
        }
        $(".areanamewrap li").eq(index).css('backgroundColor','#f5f5f5');
    },function(){
        var index = $(this).index();
        $(".areanamewrap li").eq(index).css('backgroundColor','transparent');
    })

    // 限制评论输入字数
    $("#textareaCount textarea").on('input',function(){
        var _this = $(this);
        var oCount = _this.next();
        var a = _this.val();
        var b = a.substring(0,_this.attr('max'));
        _this.val(b);
        oCount.text(_this.val().length+'/'+_this.attr('max'));
    })

    // 关闭评论相关弹层
    $('.dialog-close img,.reply-operate .cancel,.comment-tips .dialog-btn').click(function() {
        $('.popbg').fadeOut();
        $(this).parents('.dialog-layer').fadeOut();
    })

    // 用户评论回复
    $('.comment-reply-btn').click(function(){
        $('#remark').val('');
        if($(this).hasClass('disable')) return;
        if($(this).hasClass('comment-reply-forbid')) {
          $('.comment-tips,.popbg').css('display','block');
          return;
        }

        $('.comment-reply,.popbg').css('display','block');
    })

    // 显示预览图层
    $('.comment-img-list').on('click','li',function(){
        var oUl = $(this).parent();
        createCommentPreview(oUl);
        $('#commentPreview,.popbg').css('display','block');
        commentPreviewGoto($(this).index());
    })

    // 预览图上下翻页
    var clickLock = false;
    $('#commentPreview').on('click','.prev,.next',function(){
        if(clickLock) return;
        clickLock = true;
        setTimeout(function(){
            clickLock = false;
        },300)
        var index = $('#commentPreview li.active').index() + (+$(this).attr('data-delta'));
        var max = $('#commentPreview .pagination em').attr('max');
        if(index >= 0 && index < max){
            commentPreviewGoto(index);
        }
    })

    $('.popbg').click(function(){
        if($('#commentPreview').css('display') == 'block'){
            $('.popbg,#commentPreview').css('display','none');
        }
    })
})

// 预览图添加禁用类
function commentAddDisable(index,max){
  if(index == 0){
      $('#commentPreview .prev').addClass('disabled');
  }else{
      $('#commentPreview .prev').removeClass('disabled');
  }
  if(index == max - 1){
      $('#commentPreview .next').addClass('disabled');
  }else{
      $('#commentPreview .next').removeClass('disabled');
  }
}

//创建图片预览列表
function createCommentPreview(oParent){
    var ht = oParent.html();
    $('#commentPreview .preview-list').html(ht);
    var aLi = $('#commentPreview .preview-list').find('li');
    if(aLi.size() > 0){
        aLi.eq(0).addClass('active');
        $('#commentPreview .pagination em').text(1+'/'+aLi.size()).attr('max',aLi.size());
    }
}

// 显示预览图指定页
function commentPreviewGoto(index){
    var ind = index >= 0 ? index : 1;
    var oContainer = $('#commentPreview');
    var oEm = $('em',oContainer);
    var max = oEm.attr('max');

    commentAddDisable(index,max);

    $('li.active',oContainer).fadeOut(0,function(){
        $(this).removeClass('active')
    });

    $('li',oContainer).eq(ind).fadeIn(300,function(){
        $(this).addClass('active')
    });
    oEm.text(ind+(+1)+'/'+max);
}

// 场地时间段的定位
function areaTimePos(){
  var oTable = $('#tableContainer');
  if(oTable.size() < 1) return;
  var winSL = $(window).scrollLeft();
  var l = oTable.offset().left - winSL;
  var oAreaTime = $('.areatimewrap');
  oAreaTime.css({'left': l,'min-width':oTable.width()});
  if(oTable.offset().top < $(window).scrollTop()){
    oAreaTime.removeClass('hide');
  }else{
    oAreaTime.addClass('hide');
  }
}

