function pageInit(state,nickname){;
  // code1000,900
  if(/1000|900/i.test(state)){
    $(".pages").addClass("hide");
    $(".page4").removeClass("hide");
    loadingRemove();
  }

  // code300,400,500,700,800
  if(/300|400|500|700|800/i.test(state)){
    $(".pages").addClass("hide");
    $(".page3").removeClass("hide");
    unablePlayButShow(state);
    // loadingRemove();
  }

  // code200 || 600
  if(/200|600/i.test(state)){
    $(".pages").addClass("hide");
    $(".page1").removeClass("hide");
    playAndShow(nickname);
    loadingRemove();
  }

  if(state == "test"){
    $(".pages").addClass("hide");
    $(".check").removeClass("hide");
    $(".check").removeClass("hide");
    loadingRemove();
  }
}

function loadingRemove(){
  document.getElementById("loading").setAttribute("data-lock",document.getElementById("loading").getAttribute("data-lock") - 0 +1);
}

function getURLInformation(){
  var urlMsg = {};
  if(window.location.href.split('#')[0].split('?')[1]){
    var urlSearch = window.location.href.split('#')[0].split('?')[1].split('&');
  }

  if(urlSearch){
    for(var i = 0 ; i < urlSearch.length ; i++){
      urlMsg[urlSearch[i].split('=')[0]] = urlSearch[i].split('=')[1] || "";
    }
  }
  return urlMsg;
}

function playmateShowURL(num){
  var psURL = [
      {url:"/static/act/kan/images/playmateshow1.jpg",height:"4.8rem",css:{"top":" 1.8rem","left":"1.5rem","-webkit-transform":"rotateZ(0deg)"}},
      {url:"/static/act/kan/images/playmateshow2.jpg",height:"5.8rem",css:{"top":" 1.9rem","left":"0.1rem","-webkit-transform":"rotateZ(-2.5deg)"}},
      {url:"/static/act/kan/images/playmateshow3.jpg",height:"5.45rem",css:{"top":" 0.4rem","left":"0.4rem","-webkit-transform":"rotateZ(-25deg)"}}
    ];
  if(num > 0){
    return psURL[num-1];
  }
}

function getTicketImageURL(num){
  if(num == 20){
    return "/static/act/kan/images/ticketyellow.png";
  }else if(num == 30){
    return "/static/act/kan/images/ticketblue.png";
  }else if(num == 40){
    return "/static/act/kan/images/ticketgreen.png";
  }else if(num == 50){
    return "/static/act/kan/images/ticketviolet.png";
  }else if(num == 60){
    return "/static/act/kan/images/ticketcyan.png";
  }
}

$(".btn").each(function (){
  $(this).on('touchstart', function addChangeEvent(event) {
    $(this).addClass("change");
  });
  $(this).on('touchend', function removeChangeEvent(event) {
    $(this).removeClass("change");
  });
});

function activeShow(num){
  
  $(".active").addClass("playmate"+num);
  $(".active").animate({"opacity":"1"},1000,"ease-out");

}

$(".btnHelp").click(function(){
  $(".share").removeClass("hide");
});

$(".btnHelps").click(function(){
  $(".share").removeClass("hide");
});

$(".share").click(function(){
  $(".share").addClass("hide");
});

$(".touchtip").on("touchmove",function(event){
  event.preventDefault();
  $(".touchtip").addClass("hide");
});
