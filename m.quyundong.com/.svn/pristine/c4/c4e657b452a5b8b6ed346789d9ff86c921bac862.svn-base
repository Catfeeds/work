
var myScroll,
    pullUpEl,
    pullUpOffset,
    ajaxPage = 1,
    searchTxt="";

function pullUpAction() {
    setTimeout(function() {
        loadMoreElement();
    }, 1000);
}

function loaded() {
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        useTransition: false,
        onRefresh: function() {
            if (pullUpEl.className.match('loadMore')) {
                pullUpEl.className = '';
                // pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function() {
            if (this.y < 0) {
                if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    // pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    // pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    this.maxScrollY = pullUpOffset;
                }
            }
        },
        onScrollEnd: function() {
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loadMore';
                $("#pullUp").removeClass("hide");
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction();
            }
        }
    });

    setTimeout(function() {
        document.getElementById('wrapper').style.left = '0';
    }, 800);
}

//初始化绑定iScroll控件 
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', loaded, false);
// loaded();
