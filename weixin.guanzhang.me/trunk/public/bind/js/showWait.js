function ShowWait (msg,okCallback,cancelCallback) {
  this.coverStyleDisplayNone = 'position: fixed;top:0;left:0;bottom:0;right:0;background-color: rgba(0,0,0,0.3);display:none;'
  this.coverStyleDisplayBlock = 'position: fixed;top:0;left:0;bottom:0;right:0;background-color: rgba(0,0,0,0.3);display:block;'
  this.okCallback = okCallback
  this.cancelCallback = cancelCallback
  this.msg = msg
  this.init() 
}

ShowWait.prototype.showCover = function() {
  this.cover.setAttribute('style',this.coverStyleDisplayBlock)
};

ShowWait.prototype.hideCover = function() {
  this.cover.setAttribute('style',this.coverStyleDisplayNone)
};

ShowWait.prototype.init = function() {
  this.cover = this.createCover()
  this.comfirm = this.createComfirm()
  this.msgbox = this.createMsgbox()
  this.cancel = this.createCancel()
  this.ok = this.createOk()

  this.msgbox.innerHTML = this.msg
  this.cancel.innerHTML = '取消'
  this.ok.innerHTML = '确定'

  this.comfirm.appendChild(this.msgbox)
  this.comfirm.appendChild(this.cancel)
  this.comfirm.appendChild(this.ok)
  this.cover.appendChild(this.comfirm)

  document.body.appendChild(this.cover)
};

ShowWait.prototype.createCover = function () {
  var div = document.createElement('div')
  div.className = 'show-wait-cover'
  div.setAttribute('style',this.coverStyleDisplayNone)
  return div
}

ShowWait.prototype.createComfirm = function () {
  var div = document.createElement('div')
  div.className = 'show-wait-confirm'
  div.setAttribute('style','width: 80%;background-color: #fff;border-radius: 6px;overflow: hidden;padding-top:1em;margin:200px auto;')
  return div
}

ShowWait.prototype.createMsgbox = function () {
  var div = document.createElement('div')
  div.className = 'show-wait-confirm-msgbox'
  div.setAttribute('style','line-height: 1.3;border-bottom: 1px solid #eee;padding: 0.8em;')
  return div
}

ShowWait.prototype.createCancel = function () {
  var that = this
  var div = document.createElement('div')
  div.className = 'show-wait-confirm-cancel'
  div.setAttribute('style','display: inline-block;width: 49%;padding:.7em 0;border-right: 1px solid #eee;')
  if(typeof this.cancelCallback == 'function'){
    div.onclick = function(){
      that.cancelCallback(function () {
        that.hideCover()
      })
    }
  }
  return div
}

ShowWait.prototype.createOk = function () {
  var that = this
  var div = document.createElement('div')
  div.className = 'show-wait-confirm-ok'
  div.setAttribute('style','display: inline-block;width: 49%;padding:.7em 0;')
  if(typeof this.okCallback == 'function'){
    div.onclick = function(){
      that.okCallback(function () {
        that.hideCover()
      })
    }
  }
  return div
}


