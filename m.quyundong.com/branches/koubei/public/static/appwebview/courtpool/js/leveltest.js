$(document).ready(function(){
  $("img").each(function(){
      var dpr;
      if($("html").attr("data-dpr")>2){
        dpr = "dpr3x";
      }else{
        dpr = "dpr2x";
      }
      
      if(this.getAttribute("data-src")){
        var src = this.getAttribute("data-src").replace(/dpr3x/,dpr);
        this.src = src;
      }
  });
  $(".use-background").each(function(){
    var dpr;
    if($("html").attr("data-dpr")>2){
      dpr = "dpr3x";
    }else{
      dpr = "dpr2x";
    }
    if(this.getAttribute("data-src") && this.getAttribute("data-src") != "url()"){
      var src = this.getAttribute("data-src").replace(/dpr3x/,dpr);
      this.style.backgroundImage = src;
    }
  });
});

$(".button-start").click(function() {
    $(".leveltest-start").addClass("hide");
    $(".leveltest-page-test").removeClass("hide");
    $(".question-1").removeClass("hide");
});

$(".question").on("click",".label",showNextQuestion);

$(".button-finish").click(function () {
  $(".leveltest-page-test").addClass("hide");
  $(".leveltest-finish").removeClass("hide");
});

$(".button-back").click(function () {
  showQuestion($(this).attr("data-back"));
  ortherSp($(this).attr("data-back"));
});

$(".button-finish").click(function () {
  window.history.back();
});

function showQuestion (num) {
  $(".question").addClass("hide");
  $(".question-"+num).removeClass("hide");
}

function ortherSp (num) {
  $(".leveltest-bar-li").removeClass("cur");
  $(".leveltest-bar-li").eq(num-1).addClass("cur");
}

function showNextQuestion() {
  $(this).addClass("cur").siblings().removeClass("cur");
  $(this).find("input").prop("checked",true);
  var next = $(this).find("input").attr("data-next");
  if(next != 0){
    setTimeout(function () {
      showQuestion(next);
      ortherSp(next);
    },500);
  }else{
    startCheck();
  }
}

function questionList(){
  var list = {};
  
  // $(".question").each(function(){
  //   var question = {
  //     qid:this.id,
  //     question:$(this).find("h3").html()
  //   };
  //   $(this).find("input").each(function(){
  //     if(this.checked){
  //       question.answer = this.value;
  //       question.aid = this.id;
  //       question.score = $(this).attr("data-point");
  //     }
  //   });
  //   list.push(question);
  // });

  $(".question").each(function(){
    
    $(this).find("input").each(function(){
      if(this.checked){
        list[$(this).attr("data-question-num")] = $(this).attr("data-point");
      }
    });
  });

  return list;
}

function startCheck() {
  $(".nm-cover").removeClass("hide");
  $(".leveltest-finish span").html(pointToRank(totalPoint()));

  var callback = function(data){
    console.log(data);
    $(".nm-cover").addClass("hide");
    $(".leveltest-page-test").addClass("hide");
    $(".leveltest-finish").removeClass("hide");
  }
  var postData = {
    total:totalPoint(),
    questions:questionList()
  }
  questionAjax(callback,postData);
} 


function questionAjax(callback,postData){
  // console.log(totalPoint());
  console.log(postData);
  $.ajax({
    url: '/courtpool/assess/',
    type: 'POST',
    dataType: 'JSON',
    cache: false,
    data: postData,
    success: function(data){
      try{
        var res = data;
        callback(res);
      }catch(e){
        console.log(e);
        var res = JSON.parse(data);
        callback(res);
      }
    },
    error: function(xhr, type){
      callback(type);
   // alert('网络错误');
    }
  });

  // setTimeout(function(){
  //     var data = {"status":"0000","msg":"\u9886\u53d6\u6b21\u6570\u8d85\u51fa\u9650\u989d","data":[]}; 
  //     try{
  //       var res = data;
  //       callback(res);
  //     }catch(e){
  //       console.log(e);
  //       var res = JSON.parse(data);;
  //       callback(res);
  //     }  
  // },2000);

}


function totalPoint(){
  var total = 0;
  $(".leveltest-subject input").each(function(){
    if(this.checked){
      total = $(this).attr("data-point") - 0 + total;
    }
  });
  return total;
}

function pointToRank(num){
  var num = num * 1;
  if(num <= 8){
    return "新手场";
  }else if(num <= 12){
    return "中级场";
  }else if(num <= 15){
    return "高手场";
  }else{
    return "超级场";
  }
}

function newDate (){
  return parseInt(new Date().getTime()/1000);
}

$(".leveltest-button").on("touchstart",function(){
  $(".leveltest-button").addClass("cur");
});

$(".leveltest-button").on("touchend",function(){
  $(".leveltest-button").removeClass("cur");
});