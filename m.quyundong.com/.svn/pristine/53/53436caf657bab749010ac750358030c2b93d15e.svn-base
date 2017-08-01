// var cityData = {
//   hot: [
//     { name: "广州", pinyin: "guangzhou", id: 76, },
//     { name: "布尔诺斯艾利斯", pinyin: "buernuoshiailishi", id: 101, },
//   ],
//   list: [
//     { name: "广州", pinyin: "guangzhou", id: 76, },
//     { name: "布尔诺斯艾利斯", pinyin: "buernuoshiailishi", id: 101, },
//     { name: "深圳", pinyin: "shenzhen", id: 80, },
//     { name: "安庆", pinyin: "anqing", id: 1, },
//     { name: "佛山", pinyin: "foshan", id: 4, },
//     { name: "蚌埠", pinyin: "bengbu", id: 2, },
//   ],
// };


var cities = {
  touchmoveTarget: null,
  sideBarTouchEventInit: false,
  alphabet:'abcdefghijklmnopqrstuvwxyz_',
  citiesAlphabet: {},
  sideBarOffsetList:[],
  setData: function setData(obj) {
    this.citiesData = obj;
    this.hotCitiesList = [];
    this.citiesList = [];
    if( obj.hot && this.isArray(obj.hot) ) {
      this.hotCitiesList = obj.hot;
    }
    if( obj.list && this.isArray(obj.list) ) {
      this.citiesList = obj.list;
    }
    this.init();
  },
  init: function init() {
    this.dataProcess();
    this.DOMProcess();
    this.bindEvent();
    this.lacotionCity();
    this.searchInit();
    this.geolocation();
  },
  searchInit: function searchInit() {
    this.searchInput = document.getElementById('searchInput');
    this.searchForm = document.getElementById('searchForm');
    this.searchInput.value = '';
    this.searchBindEvent();
  },
  searchCity: function searchCity(str) {
    var searchStr = str.replace('市','').replace('特别行政区','');
    var res = [];
    if (searchStr === '') return res;
    this.citiesList.forEach(function(item){
      if (item.name.indexOf(searchStr) !== -1) {
        res.push(item);
      }
    });
    if (res.length === 0) {
      this.citiesList.forEach(function(item){
        if (item.pinyin.indexOf(searchStr) !== -1) {
          res.push(item);
        }
      });
    }
    return res;
  },
  searchBindEvent: function searchBindEvent() {
    var that = this;
    $(this.searchInput).focus(function(){
      show();
      $('#search .none').addClass('hide');
    });

    $('.cancel').click(function(){
      hide();
      $(that.searchInput).val('');
    });

    $(this.searchInput).on('input propertychange', changeHandle);

    function changeHandle(){
      // $('#search span').html(this.value);
      // console.log(this.value);
      var citiesList = that.searchCity(this.value);
      var domList = [];
      citiesList.forEach(function(item){
        var li = document.createElement('li');
        li.dataset['city_id'] = item.id;
        li.dataset['city_name'] = item.name;
        li.innerHTML = item.name;
        li.onclick = function(){
          that.citiesClickHandle(li);
        }
        domList.push(li);
      });
      $('#search ul').html('');
      $('#search .none').addClass('hide');
      if (domList.length > 0) {
        domList.forEach(function(item){
          $(item).appendTo('#search ul');
        });
      }else{
        $('#search .none').removeClass('hide');
      }
    }

    function show(){
      $('#index').addClass('hide');
      $('#locationSideBar').addClass('hide');
      $('#search').removeClass('hide');
      $('.cancel').removeClass('hide');
    }

    function hide(){
      $('#index').removeClass('hide');
      $('#locationSideBar').removeClass('hide');
      $('#search').addClass('hide');
      $('.cancel').addClass('hide');
    }
  },
  lacotionCity: function lacotionCity() {
    var city_id = this.getCookies('wx_city_id');
    var city = null;
    this.citiesList.forEach(function(item){
      if (city_id == item.id) {
        city = item;
      }
    });
    if (city) {
      $('.location-city').removeClass('hide');
      $('.location-city span').html(city.name);
    }
  },
  geolocation: function geolocation() {
    var that = this;
    //浏览器定位
    var handleLocationError = function(error){
        // error拥有一个code属性和三个常量属性TIMEOUT、PERMISSION_DENIED、POSITION_UNAVAILABLE
        // 执行失败时，code属性会指向三个常量中的一个，从而指明错误原因
        var myCity = new BMap.LocalCity();
        myCity.get(function(result){
          that.setLocationCity(result.name);
        });
        switch(error.code){
            case error.TIMEOUT:
                console.log('超时');
                break;
            case error.PERMISSION_DENIED:
                console.log('用户拒绝提供地理位置');
                break;
            case error.POSITION_UNAVAILABLE:
                console.log('地理位置不可用');
                break;
            default:
                break;
        }
    };
    if (window.navigator.geolocation){
        var getOptions = {
            //是否使用高精度设备，如GPS。默认是true
            enableHighAccuracy:false,
            //超时时间，单位毫秒，默认为0
            timeout:6000,
            //使用设置时间内的缓存数据，单位毫秒
            //默认为0，即始终请求新数据
            //如设为Infinity，则始终使用缓存数据
            maximumAge:0
        };
        window.navigator.geolocation.getCurrentPosition(function(position) {  
        //百度API读取城市名称
            var myGeo = new BMap.Geocoder();  
            myGeo.getLocation(new BMap.Point(position.coords.longitude, position.coords.latitude), function(result){      
                if (result){      
                    var addComp = result.addressComponents; 
                    that.setLocationCity(addComp.city);   
                }      
            });   
        }, handleLocationError, getOptions); 
    }else{
        //不支持，则使用百度IP地址定位
        var myCity = new BMap.LocalCity();
        myCity.get(function(result){
          that.setLocationCity(result.name);
        });
    }
  },
  setLocationCity: function setLocationCity(cityName) {
    var cityName = cityName.replace('市','').replace('特别行政区','');
    var city = null;
    this.citiesList.forEach(function (item) {
      if(cityName === item.name){
        city = item;
      }
    });
    if (city) {
      $('#locationCity').removeClass('hide');
      $('#locationCity li').html(city.name).attr('data-city_id',city.id).attr('data-city_name',city.name);
    }
  },
  dataProcess: function dataProcess() {
    var that = this;
    this.citiesList.sort(function sort(a, b) {
      if (a.pinyin > b.pinyin)
        return 1;
      else
        return -1;
    }).forEach(function pushDataToAlphabet(item) {
      var letter = '_';
      if (typeof item.pinyin === 'string') {
        letter = item.pinyin.toLowerCase().split('')[0];
      }
      if ( !that.citiesAlphabet[letter] ) {
        that.citiesAlphabet[letter] = [];
      }
      that.citiesAlphabet[letter].push(item);
    })
  },
  isArray: function isArray(obj) {   
    return Object.prototype.toString.call(obj) === '[object Array]';    
  },
  DOMProcess: function DOMProcess() {
    this.hotCitiesDOMProcess();
    this.citiesListDOMProcess();
    this.sideBarDOMProcess();
  },
  hotCitiesDOMProcess: function hotCitiesDOMProcess() {
    var html = '<h4 data-city-group="hot">热门城市</h4><ul>';
    this.hotCitiesList.forEach(function hotCitiesListHTML(item) {
      html += '<li class="J_selectCity" data-city_name="' + item.name + '" data-city_id="' + item.id + '">' + item.name + '</li>';
    })
    html += '</ul>';
    var _html = $('#hotCity').html();
    $('#hotCity').html( _html + html );
    if (this.hotCitiesList.length === 0) {
      $('#hotCity').addClass('hide');
    }
  },
  citiesListDOMProcess: function citiesListDOMProcess() {
    var that = this;
    var html = ''
    this.alphabet.split('').forEach(function (item) {
      if (that.citiesAlphabet[item]) {
        html += '<h4 data-city-group="' + item + '">' + item.toUpperCase() + '</h4><ul>';
        that.citiesAlphabet[item].forEach(function (it) {
          html += '<li class="J_selectCity" data-city_name="' + it.name + '" data-city_id="' + it.id + '">' + it.name + '</li>';
        })
        html += '</ul>';
      }
    })
    var _html = $('#cityList').html();
    $('#cityList').html( _html + html );
  },
  sideBarDOMProcess: function sideBarDOMProcess() {
    var that = this;
    var html = '';
    if (this.hotCitiesList.length === 0) {
      html += '<h5 class="j_touch" data-city-group-name="local">定位</h5><ul>';
    }else{
      html = '<h5 class="j_touch" data-city-group-name="local">定位</h5><h5 class="j_touch" data-city-group-name="hot">热门</h5><ul>';
    }
    this.alphabet.split('').forEach(function (item) {
      if (that.citiesAlphabet[item]) {
        html += '<li class="j_touch" data-city-group-name="' + item + '">' + item.toUpperCase() + '</li>';
      }
    });
    html += '</ul>';
    var _html = $('#locationSideBar .location-side-bar-text').html();
    $('#locationSideBar .location-side-bar-text').html( _html + html );
  },
  bindEvent: function bindEvent() {
    var that = this;
    $('#locationSideBar .j_touch').click(function () {
      var offset = $('h4[data-city-group='+this.dataset["cityGroupName"]+']').offset();
      window.scrollTo(0, offset.top);
    });
    $('#locationSideBar .location-side-bar-text').on('touchstart' ,function (e) {
      that.sideBarTouchEventInitLock();
    });
    $('#locationSideBar').on('touchmove' ,function (e) {
      e.preventDefault();
      that.sideBarTouchEventInitLock();
      var offset = null;
      var sideBarTarget = that.findSideBarTargetByClientY(e.touches[0].clientY);
      if (sideBarTarget && that.touchmoveTarget !== sideBarTarget) {
        that.touchmoveTarget = sideBarTarget;
        if (sideBarTarget.dataset["cityGroupName"]) {
          offset = $('h4[data-city-group='+sideBarTarget.dataset["cityGroupName"]+']').offset();
          window.scrollTo(0, offset.top);
        }else{
          window.scrollTo(0, 0);
        }
      }else{
        return false;
      }
    });
    //切换城市
    $('.J_selectCity').on('click', function(){
      that.citiesClickHandle(this);
    });
  },
  citiesClickHandle: function citiesClickHandle(dom) {
    var that = this;
    var postData = {
      city_id: $(dom).attr('data-city_id'),
      city_name: $(dom).attr('data-city_name'),
    }
    postData = typeof objMerge == 'function' ? objMerge(postData) : postData;
    $.ajax({
      url: '/index/setCity',
      type: 'GET',
      dataType: 'JSON',
      cache: false,
      data: postData,
      success: function(res){
        var res = JSON.parse(res);
        if (res && res.code == 1) {
          var url = '/';
          if (cid > 0) {
            url = '/court/?cid=' + cid;
          }
          location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
        } else {
          that.showError(res.msg);
        }
      },
      error: function(res){
        that.showError('网络出错，请稍后再试');
      }
    });
  },
  findSideBarTargetByClientY: function findSideBarTargetByClientY(clientY) {
    var sideBarTarget = null;
    this.sideBarOffsetList.forEach(function (item, index, array) {
      if (Number(clientY) > Number(item.dataset.offsetY) && Number(clientY) < (Number(item.dataset.offsetY) + Number(item.dataset.height)) ){
        sideBarTarget = item;
      }
    })
    return sideBarTarget;
  },
  sideBarTouchEventInitLock: function sideBarTouchEventInitLock() {
    var that = this;
    if( !this.sideBarTouchEventInit ) {
      this.sideBarTouchEventInit = !this.sideBarTouchEventInit;
      $('.j_touch').each(function (index, item) {
        this.dataset['offsetY'] = $(this).offset().top - window.scrollY;
        this.dataset['height'] = $(this).height();
        that.sideBarOffsetList.push(this);
      })
    }
  },
  showError: function showError(msg){
    alert(msg);
  },
  getCookies: function getCookies(name){
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
  },
};