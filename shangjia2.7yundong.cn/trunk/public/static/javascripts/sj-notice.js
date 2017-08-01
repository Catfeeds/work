function SjNotice (opt) {
  this.opt = opt || {};
  this.init();
  this.binding();
} 

SjNotice.prototype.show = function() {
  this.g.style.display = 'block';
};

SjNotice.prototype.hide = function() {
  this.g.style.display = 'none';
};

SjNotice.prototype.changeMsg = function(msg) {
  if(typeof msg == 'string'){
    this.msg.innerHTML = msg
  }
};

SjNotice.prototype.init = function() {
  this.g = this.createDom('div',{
    className:'sj-notice-g',
    style:{
      position: 'fixed',
      top: 0,left: 0,
      right: 0,bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 99999
    }
  })

  this.body = this.createDom('div',{
    className:'sj-notice-body',
    style:{
      padding: '20px',
      width: '460px',
      borderRadius: '5px',
      display: 'inline-block',
      margin: '0 auto',
      position: 'absolute',
      left: '50%',
      marginLeft: '-225px',
      top: '50%',
      mozTransform:'translateY(-50%)',
      webkitTransform:'translateY(-50%)',
      msTransform:'translateY(-50%)',
      transform:'translateY(-50%)',
      backgroundColor: 'rgba(255,255,255,1)',
    }
  },function(hackValue,dom){
    if(hackValue == 'rgba(255,255,255,1)'){
      dom['top'] = '50px';
      dom['border'] = '1px solid #000';
      dom['backgroundColor'] = '#fff';
    }
  })

  this.close = this.createDom('button',{
    className:'close',
    style:{
      position: 'absolute',
      right: '10px',
      top: '10px'
    },
    type:'button',
    innerHTML:'<span aria-hidden="true">&times;</span>'
  })

  this.msg = this.createDom('div',{
    className:'sj-notice-msg',
    style:{
      textAlign: 'center',
      lineHeight: 1.7
    },
    innerHTML:(typeof this.opt == 'string') ? this.opt : ''
  })

  this.body.appendChild(this.close)
  this.body.appendChild(this.msg)
  this.g.appendChild(this.body)
  document.body.appendChild(this.g)
};

SjNotice.prototype.createDom = function(tagName,obj,IE8Hack) {
  var dom = document.createElement(tagName)
  domAddAttr(dom,obj)

  function domAddAttr(dom,obj){
    if(typeof obj != 'object') return;
    for(var x in obj){
      if(typeof obj[x] != 'object'){
        try{
          dom[x] = obj[x]
        }catch(e){
          // IE8 hack
          // alert(e+','+x+','+obj[x])
          // alert(obj[x] == 'rgba(255,255,255,1)')
          if(typeof IE8Hack == 'function'){
            IE8Hack(obj[x],dom)
          }
        }
        
      }else{
        domAddAttr(dom[x],obj[x])
      }
    }
  }
  return dom
};

SjNotice.prototype.binding = function() {
  var that = this
  addEvent(this.close,'click',function(){
    that.g.style.display = 'none'
  })

  function addEvent(dom,event,fn){
    if(dom.attachEvent){
      dom.attachEvent('on'+event,fn)
    }
    if(dom.addEventListener){
      dom.addEventListener(event,fn,false)
    }
  }
};