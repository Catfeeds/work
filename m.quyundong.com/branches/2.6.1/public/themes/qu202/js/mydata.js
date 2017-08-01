$('#saveData').click(function(){
  if(this.hasAttribute('disable')) return false
  this.setAttribute('disable','')
  $(this).text('修改保存中')
  var that = this
  var url = $('#selectFrom').attr('data-href')
  var successCallback = function(res){
    var date = res
    that.removeAttribute('disable')
    $(that).text('保存修改')
    if(date.code == '1'){
      showToast('修改成功',function(){
        window.location.href = date.redirect_url
      })
    }else{
      showToast(date.msg)
    }
  }
  var errorCallback = function(){
    that.removeAttribute('disable')
    $(that).text('保存修改')
    showToast('网络错误，请稍后再试')
  }
  ajaxFromData(url,successCallback,errorCallback)
})

function ajaxFromData(url,successCallback,errorCallback){
  var formData = {};
  var inputList = [];
  var inputHiddenList = Array.prototype.slice.call($('#selectFrom input[type="hidden"]'));
  inputList = inputList.concat(inputHiddenList);

  $.each(inputList,function (index,item) {
    formData[item.name] = item.value;
  })
  var postData = formData
      postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        dataType: 'json',
        success: function(data){
          successCallback(data);
        },
        error: function(data){
          errorCallback(data);
        }
      });
}

function showToast(errMsg,fn) {
  $(".toast .toast-msg").text(errMsg);
  $(".toast").removeClass('hide');
  setTimeout(function(){
      $(".toast").animate({"opacity":0},300,function(){
          $(this).css("opacity",1).addClass("hide");
          if(fn){
              fn();
          }
      })
  },1000);
}

function sexSelect(){
  if($('#male')[0].checked){
    return 'm'
  }else if($('#female')[0].checked){
    return 'f'
  }else{
    return false
  }
}

function sexShow(){
  $('.selecter').removeClass('hide')
  $('.select-sex').addClass('hide')
  $('#selectFrom').removeClass('hide')
}

function sexHide(){
  $('.selecter').addClass('hide')
  $('.select-sex').removeClass('hide')
  $('#selectFrom').addClass('hide')
}

$('.select-mysex').click(function(){
  sexHide()
})

var okCallback = function(cb){
  console.log('ok')
  var sex = sexSelect()
  console.log(sex)
  if(sex == 'm'){
    $('.select-mysex div').eq(1).html('男')
  }else if(sex == 'f'){
    $('.select-mysex div').eq(1).html('女')
  }
  $('#sex').val(sex)
  sexShow()
  if(typeof cb == 'function') cb()
}
var cancelCallback = function(cb){
  console.log('cancel')
  sexShow()
  if(typeof cb == 'function') cb()
}

// var showWait = new ShowWait(okCallback,cancelCallback)

$('.select-sex label').click(function(){
  // showWait.showCover()
  setTimeout(okCallback,200)
})

$(window).on('load',function(){
  var loadInterval = setInterval(function() {
    if($(".loading").attr("data-lock") == 1){
       $(".loading").addClass("hide");
       $(".main").removeClass("hide");
       clearInterval(loadInterval);
    }
  },500);
})