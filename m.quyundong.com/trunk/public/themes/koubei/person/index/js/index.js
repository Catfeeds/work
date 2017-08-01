$(document).ready(function () {
  var $domList = $('.person-index-bar-select')
  var $domListParent = $('.person-index-bar')
  var $arrRight = $('.person-index-bar-arr')
  smartBar($domList,$domListParent,$arrRight)
})

function smartBar($domList,$domListParent,$arrRight){

  if( $domList.length <= 4 ){

    $domListParent.css({'padding-right':'0px'})
    $arrRight.addClass('hide')
    $domList.css({'width':100/$domList.length + '%'})

  }else{

    $domListParent.css({'padding-right':'20%'})
    $arrRight.removeClass('hide')
    $domList.css({'width':'25%'})
    $domList.each(function(index,item){
      
      if( index < 4 ){
        $(item).removeClass('hide')
      }else{
        $(item).addClass('hide')
      }

    })

    $arrRight.click(function(){

      if(this.dataset.dir == 'r'){

        this.dataset.dir = 'l'
        $(this).addClass('l')
        $domList.each(function(index,item){

          if( index < 4 ){
            $(item).addClass('hide')
          }else{
            $(item).removeClass('hide')
          }

        })

      }else{

        this.dataset.dir = 'r'
        $(this).removeClass('l')
        $domList.each(function(index,item){

          if( index >= 4 ){
            $(item).addClass('hide')
          }else{
            $(item).removeClass('hide')
          }

        })

      }

    })

  }
}

