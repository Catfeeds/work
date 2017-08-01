'use strict';

// UMD
;(function(root, factory) {
   if (typeof define === 'function' && define.amd) {
       // AMD
       define(['jquery'], factory);
   } else if (typeof exports === 'object') {
       // Node, CommonJS-like
       module.exports = factory(require('jquery'));
   } else {
       // Browser globals (root is window)
       root.DIYselecter = factory(root.jQuery);
   }
}(this, function($) {

// *********************** main code start ***********************

var DIYselecter = {
  init:function(dom) {
    var that = this
    this.setDom(dom)
    $.each(dom,function(index,item){
      that.createDom(item)
    })
    this.documentListener()
  },
  setDom:function(dom){
    if(this.isArray(dom)){
      this.domList = this.domList.concat(dom)
    }else if(typeof dom === 'object'){
      this.domList.push(dom)
    }
  },
  domList:[],
  isArray:function (obj) {   
    return Object.prototype.toString.call(obj) === '[object Array]';    
  },
  signDom:function(tagName){
    var dom = document.createElement(tagName)
    dom.__sign__ = 'DIYselecter'
    return dom
  },
  documentListener:function(){
    var that = this
    $(document).on('click',function(e){
      if(e.target.__sign__ && e.target.__sign__ == 'DIYselecter'){

      }else{
        $.each(that.domList,function(index,item){

          item.action && item.action.hide()
        })
      }
    })
  },
  createDom:function(dom){
    dom.style.display = 'none'
    var that = this
    var div = this.signDom('div')
    var span = this.signDom('span')
    var button = this.signDom('div')
    var ul = this.signDom('ul')
    var liLists = []

    div.className = 'DIY-selecter'
    button.className = 'button'

    dom.status = {
      show:false
    }
    dom.action = {
      setColor:function(color){
        $(span).css({'color':color});
      },
      show:function(e){
        $(ul).addClass('show')
        $(ul).css({
          position:'fixed',
          top:e.clientY + 'px',
          left:e.clientX + 'px'
        });
        $(button).attr('show','')
        if($(ul).height()<300){
          $(ul).css({'overflow-y':'auto'})
        }else{
          $(ul).css({'overflow-y':'scroll'})
        }
        dom.status.show = true
      },
      hide:function(){
        $(ul).removeClass('show')
        $(button).removeAttr('show')
        dom.status.show = false
      },
      spanChangeInnerHTML:function(str,dom){
        span.innerHTML = str
      },
      select:function(li){
        $.each(liLists,function(index,item){
          item.removeAttribute('selected')
        })
        li.setAttribute('selected','')
        dom.value = li.getAttribute('data-value')
        this.spanChangeInnerHTML(li.innerHTML)
        $(dom).trigger('change')
      },
      init:function(){
        var _this = this
        var count = 0
        if (dom.childNodes.length === 0) this.spanChangeInnerHTML('&nbsp;')
        $.each(dom.childNodes,function(index,item){
          if(item.nodeType === 1){
            if(count === 0){
              _this.spanChangeInnerHTML(item.innerHTML)
              count ++
            }
            var li = that.signDom('li')
            li.innerHTML = item.innerHTML
            li.setAttribute('data-value',String(item.value))
            li.className = item.getAttribute('data-class-name') || '';
            if ( item.hasAttribute('disabled') ) {
              li.setAttribute('disabled','');
            }
            li.targetOption = item
            if(item.hasAttribute('selected')){
              li.setAttribute('selected','')
              _this.spanChangeInnerHTML(item.innerHTML)
            }
            $(li).on('click',function(){
              if ( this.hasAttribute('disabled') ) return false;
              liClick(dom,li)
            })
            liLists.push(li)
          }
        })
        $.each(liLists,function(index,item){
          ul.appendChild(item)
        })
        
      },
      reset:function(){
        liLists = []
        ul.parentNode.removeChild(ul)
        ul = that.signDom('ul')
        if(dom.status.show){
          ul.className = 'show'
        }
        this.init()
        div.appendChild(ul)
      },
      change:function(){
        $.each(liLists,function(index,item){
          if ( dom.value == item.getAttribute('data-value') ) {
            $(item).click();
          }
        });
      }
    }
    
    dom.action.init()

    $(button).on('click',function(e){
      var _domStatusShow = dom.status.show
      $.each(that.domList,function(index,item){
        item.action && item.action.hide()
      })

      if(!_domStatusShow){
        dom.action.show(e)
      }else{
        dom.action.hide()
      }
    })

    function liClick(dom,self){
      dom.action.hide()
      dom.action.select(self)
    }

    div.appendChild(span)
    div.appendChild(button)
    div.appendChild(ul)
    dom.parentNode.insertBefore(div,dom)
    div.targetDom = dom

  }
}

// *********************** main code end ***********************


  //    exposed public methods
  return DIYselecter;
}));