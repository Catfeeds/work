$(document).ready(function() {
    function createStyle(cssText) {
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        if(style.styleSheet){
            style.styleSheet.cssText = cssText;
        }else{
            style.appendChild(document.createTextNode(cssText));
        }
        head.appendChild(style);
    }

    function PopSlider (dom) {
        this.root = dom;
        this.slider = null;
        this.sliderWrap = null;
    }
    PopSlider.cssRequired = 'body{margin:0;padding:0;}.sliderWrap li,.sliderWrap ul{list-style:none;margin:0;padding:0;height:100%;overflow:hidden}.sliderWrap li{position:absolute;display:-webkit-box;-webkit-box-pack:center;-webkit-box-align:center;background-color:#333;}.sliderWrap li img{max-width:100%;max-height:100%}.sliderWrap{background:#333;position:fixed;top:0;left:0;height:100%;width:100%;overflow:hidden}';
    PopSlider.cssInserted = false;
    PopSlider.current = null;
    PopSlider.prototype.init = function() {

        var self = this;

        var srcList = [];
        var imgList = this.root.querySelectorAll('img');

        try{
            [].forEach.call(imgList, function(img, index) {
                srcList.push(img.getAttribute('data-origin') || img.src);
                img.setAttribute('data-index', index);
            });
        }catch(e){

        }
        

        this.render(srcList);
        this.register();

    };
    PopSlider.prototype.render = function (srcList) {

        var self = this;

        var sliderWrap = this.sliderWrap = document.createElement('div');
        sliderWrap.className = 'sliderWrap';
        sliderWrap.style.display = 'none';
        document.body.appendChild(sliderWrap);

        if (!PopSlider.cssInserted) {
            createStyle(PopSlider.cssRequired);
            PopSlider.cssInserted = true;
        }

        this.slider = new Slider({
            dom: sliderWrap,
            list: srcList
        });

    };
    PopSlider.prototype.register = function () {

        var self = this;
        
        $(this.root).on('touchstart', 'img', function(event) {
            event.preventDefault();
            self.popup(this.getAttribute('data-index') || '0');
        });

        window.onhashchange = function() {
            if (location.hash.indexOf('popup') !== -1) return;
            PopSlider.current.close();
        };
    };
    PopSlider.prototype.popup = function (imgIndex) {
        this.slider.popIndex(imgIndex*1);
        this.sliderWrap.style.display = 'block';
        location.hash = 'popup';
        PopSlider.current = this;
    };
    PopSlider.prototype.close = function () {
        this.sliderWrap.style.display = 'none';
        this.slider.reset();
    };

    try{
        [].forEach.call(document.querySelectorAll('ul.j-silder-imglist'), function(ul, index) {
            var pslider = new PopSlider(ul);
            pslider.init();
        });
    }catch(e){

    }
   

    function Score(dom) {
        this.dom = dom;
        this.value = dom.getAttribute('data-value') * 1;
    }
    Score.MAX = 5;
    Score.prototype.render = function () {
        var inner = document.createElement('div');
        inner.className = 'inner';
        inner.style.width = this.value / Score.MAX * 100 + '%';
        this.dom.appendChild(inner);
    };

    $('.yue-dt-cmt-score').each(function(i) {
        var score = new Score(this);
        score.render();
    });

})



