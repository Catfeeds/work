(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.NMShowTips = factory(root.jQuery, root._);
    }
}(this, function() {
    //    methods
    var NMShowTips = {
      isInit: false,
      style: {
        background:[
          { name:'position', value:'fixed',},
          { name:'top', value:'0',},
          { name:'left', value:'0',},
          { name:'right', value:'0',},
          { name:'bottom', value:'0',},
          { name:'display', value:'none',},
          { name:'textAlign', value:'center',},
          { name:'lineHeight', value:'1.6',},
          { name:'fontSize', value:'14px',},
          { name:'color', value:'#000',},
          { name:'z-index', value:'999',},
        ],
        box:[
          { name:'width', value:'80%',},
          { name:'position', value:'absolute',},
          { name:'top', value:'50%',},
          { name:'left', value:'50%',},
          { name:'backgroundColor', value:'#fff',},
          { name:'border', value:'1px solid #eee',},
          { name:'borderRadius', value:'5px',},
          { name:'webkitTransform', value:'translate3d(-50%,-50%,0)',},
          { name:'transform', value:'translate3d(-50%,-50%,0)',},
        ],
        msg:[
          { name:'padding', value:'1em 1.5em',},
          { name:'wordWrap', value:'break-word',},
          { name:'textAlign', value:'center',},
          // { name:'textIndent', value:'2em',},
        ],
        btn:[
          { name:'padding', value:'0.75em 1em',},
          { name:'borderTop', value:'1px solid #eee',},
          { name:'wordWrap', value:'break-word',},
        ],
      },
      show: function show(msg, buttonMsg) {
        this.init();
        this.background.style.display = 'block';
        this.setMsg(msg, buttonMsg);
      },
      init: function init () {
        if (!this.isInit) {
          this.isInit = true;
          this.createDOM();
          this.setDOMStyle();
          this.mixture();
          this.DOMBindFun();
        }
      },
      createDOM: function createDOM() {
        this.background = document.createElement('div');
        this.box = document.createElement('div');
        this.msg = document.createElement('p');
        this.btn = document.createElement('div');
      },
      setDOMStyle: function setDOMStyle () {
        this.setDOMStyleFactory(this.style.background, this.background);
        this.setDOMStyleFactory(this.style.box, this.box);
        this.setDOMStyleFactory(this.style.msg, this.msg);
        this.setDOMStyleFactory(this.style.btn, this.btn);
      },
      setDOMStyleFactory: function setDOMStyleFactory(styleArray, DOM){
        styleArray.forEach(function (item) {
          DOM.style[item.name] = item.value;
        })
      },
      mixture: function mixture () {
        var that = this;
        this.box.appendChild(this.msg);
        this.box.appendChild(this.btn);
        this.background.appendChild(this.box);
        if (document.body) {
          document.body.appendChild(this.background);
        } else {
          var oldWindowOnload = window.onload || function () {};
          window.onload = function () {
            oldWindowOnload();
            document.body.appendChild(that.background);
          }
        }
      },
      setMsg: function setMsg (msg, buttonMsg) {
        this.msg.innerHTML = msg || '';      
        this.btn.innerHTML = buttonMsg || '我知道了';      
      },
      DOMBindFun: function DOMBindFun () {
        var that = this;
        this.btn.onclick = function btnClickHandle (e) {
          that.close();
        };
      },
      close: function close () {
        this.background.style.display = 'none';
      },
    }

    //    exposed public methods
    return NMShowTips;
}));




