$(document).ready(function  () {
    $('.ic-item-card-name').click(function(){
        var $cardList = $(this).siblings('.ic-item-card-list')
        var parent = this.parentNode
        if(parent.hasAttribute('show')){
            parent.removeAttribute('show')
            // $cardList.addClass('fade-in')
            // setTimeout(function(){
                $cardList.addClass('hide')
            // },300)
        }else{
            parent.setAttribute('show','')
            if($cardList.hasClass('hide')){
                $cardList.removeClass('hide')
                // setTimeout(function(){
                //     $cardList.removeClass('fade-in')
                // },0)
            }
        }
    })

    $('.ic-item-card-all').click(function(){
        $(this).addClass('hide').siblings().addClass('show-block')
    })

    $('.ic-item-card-list a').click(function(){
        if(this.hasAttribute('disabled')){
            return false
        }
    })
})