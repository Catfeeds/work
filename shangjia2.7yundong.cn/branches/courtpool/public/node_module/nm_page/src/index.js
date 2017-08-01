'use strict';

/*
  // how to use ?

  var nm_page_obj = Object.create(NMPAGE);

  var opt = {
    dom:$('#nm_page-test')[0],
    totlePage:10,
    currentPage:1,
    callback:function(num){
      console.log(num);
      opt.currentPage = num;
      nm_page_obj.setup(opt);
      // or 
      // window.location.href = '/page?page=' + num;
    },
  }

  nm_page_obj.setup(opt);

 */

// UMD
(function(root, factory) {
   if (typeof define === 'function' && define.amd) {
       // AMD
       define([], factory);
   } else if (typeof exports === 'object') {
       // Node, CommonJS-like
       module.exports = factory();
   } else {
       // Browser globals (root is window)
       root.NMPAGE = factory();
   }
}(this, function() {

// *********************** main code start ***********************
var NMPAGE = {
  opt: null,
  DOM: null,
  buttonList: null,
  setup: function setup (opt) {
    var _opt = opt || {};
    this.DOM = _opt.dom || document.body;
    this.opt = {
      totlePage : Number(_opt.totlePage) || 1,
      currentPage : Number(_opt.currentPage) || 1,
      callback : _opt.callback || function(){},
    };
    this.init();
  },
  reset: function reset () {
    this.init();
  },
  init: function init () {
    this.removeDom();
    this.dataInit();
    this.createDom();
    this.bindEvent();
  },
  removeDom: function removeDom () {
    if ( this.containerDOM && this.containerDOM.parentNode ) this.containerDOM.parentNode.removeChild(this.containerDOM);
  },
  dataInit: function dataInit () {
    var list = [ 1, 2 ];
    var that = this;
    var buttonList = [];
    var currentPage = this.opt.currentPage;
    var totlePage = this.opt.totlePage;

    buttonList.push({ value:currentPage ,className:'cur' ,text:currentPage });

    list.forEach(function(item){
      var value = currentPage + item;
      if ( value < totlePage ) {
        buttonList.push({ value:value ,text:value });
      }
    });

    list.forEach(function(item){
      var value = currentPage - item;
      if ( value > 0 ) {
        buttonList.unshift( { value:value ,text:value } );
      }
    });

    if ( buttonList[0].value === 2 ) {
      buttonList.unshift( { value:1 ,text:1 } );
    } else if ( buttonList[0].value !== 1 ) {
      buttonList.unshift( { value:'...' ,className:'sp' ,text:'...' } );
    }

    if ( buttonList[buttonList.length - 1].value === totlePage -1 ) {
      buttonList.push( { value:totlePage ,text:totlePage } ); 
    } else if ( buttonList[buttonList.length - 1].value !== totlePage ) {
      buttonList.push( { value:'...' ,className:'sp' ,text:'...' } );
    }

    if (buttonList[0].value !== 1) {
      buttonList.unshift( { value:1, text:1 } );
    }

    if ( buttonList[buttonList.length -1].value !== totlePage ){
      buttonList.push( { value:totlePage ,text:totlePage } );
    }

    var left = { value:'<' ,className:'left' ,text:'' ,disabled:true };
    var right = { value:'>' ,className:'right' ,text:'' ,disabled:true };

    if ( currentPage !== 1 ) {
      left.value = currentPage - 1;
      left.disabled = false;
    }
    if ( currentPage !== totlePage ) {
      right.value = currentPage + 1;
      right.disabled = false;
    }

    buttonList.unshift( left );
    buttonList.push( right );

    this.buttonList = buttonList;
  },
  createDom: function createDom () {
    this.containerDOM = this.containerDomCreate();
    this.buttonListDom = this.buttonListDomCreate();
    this.gotoDom = this.gotoDomCreate();

    this.containerDOM.appendChild(this.buttonListDom);
    this.containerDOM.appendChild(this.gotoDom);

    this.DOM.appendChild(this.containerDOM);
  },
  containerDomCreate: function containerDomCreate() {
    var div = document.createElement('div');
    div.className = 'nm_page-container';
    return div;
  },
  buttonListDomCreate: function buttonListDomCreate() {
    var ul = document.createElement('ul');
    ul.className = 'nm_page';
    this.buttonList.forEach(function(item){
      item.dom = document.createElement('li');
      item.dom.className = item.className || '';
      item.dom.innerHTML = item.text;
      if ( item.disabled === true ) item.dom.setAttribute('disabled','');
      ul.appendChild(item.dom);
    });
    return ul;
  },
  gotoDomCreate: function gotoDomCreate() {
    var div = document.createElement('div');
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    var span3 = document.createElement('span');
    var i1 = document.createElement('i');
    var i2 = document.createElement('i');
    var input = document.createElement('input');

    div.className = 'goto';
    div._input = input;
    div._goto = span3;

    span1.className = 'totle-page';
    span1.innerHTML = '共'+this.opt.totlePage+'页';

    span3.className = 'go';
    span3.innerHTML = 'GO';

    i1.innerHTML = '第';
    i2.innerHTML = '页';

    input.className = 'page';
    input.type = 'text';

    span2.appendChild(i1);
    span2.appendChild(input);
    span2.appendChild(i2);

    div.appendChild(span1);
    div.appendChild(span2);
    div.appendChild(span3);

    return div;
  },
  bindEvent: function bindEvent () {
    var that = this;
    this.gotoDom._goto.onclick = function(){
      var num = Number(that.gotoDom._input.value);
      if ( num > 0 && num <= that.opt.totlePage ) that.callback(num);
    }
    this.buttonList.forEach(function(item){
      if ( typeof item.value === 'number' ) {
        item.dom.onclick = function(){
          that.callback(item.value);
        }
      }
    });
  },
  callback: function callback (num) {
    this.opt.callback(num);
  }
}
// *********************** main code end ***********************


  //    exposed public methods
  return NMPAGE;
}));
