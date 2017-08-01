var crypto = require("crypto");
var moment = require('moment'); // 日期时间
var common = {}


// md5加密字符串
common.md5 = function(string) {
    string = (new Buffer(string)).toString("binary");
    return crypto.createHash('md5').update(string).digest("hex");
};
//sha1加密
common.sha1 = function(string) {
    string = (new Buffer(string)).toString("binary");
    return crypto.createHash('sha1').update(string).digest("hex");
};
// 将对象按键名正向排序
common.sort = function(object) {
    var keyArr = []; // 所有键名的数组

    for (var i in object) {
        keyArr.push(i);
    }

    keyArr.sort(); // 按键名排序

    var keyArrLength = keyArr.length; // 参数数组的长度
    var obj = {}; // 新参数数组

    // 将参数值填入新参数数组中
    for (var i = 0; i < keyArrLength; i++) {
        obj[keyArr[i]] = object[keyArr[i]];
    }

    return obj;
};

//将对象拼接成查询串
common.objToSql = function(obj,sp){
    sp = sp || 'AND';
    var arr = [];
    if(typeof obj === 'object'){
        for(k in obj){
            arr.push(k+"='"+obj[k]+"'");
        }
    }
    return arr.length > 0 ? arr.join(' ' + sp + ' ') : '';
};
//转成一天开始时间戳
common.toStartDayTime = function(time){
    return moment(moment.unix(time).format('YYYY-MM-DD')).unix();
};
/**
 * 获取当天的开始时间戳 (00:00:00)
 *
 * @returns {number}
 * @author xiaoyanchun
 */
common.todayStartTime = function(){
    var dateArr = moment().toArray();
    return moment([dateArr[0], dateArr[1], dateArr[2]]).unix();
};

/**
 * 获取当天的最后时间戳 (23:59:59)
 *
 * @returns {number}
 * @author xiaoyanchun
 */
common.todayEndTime = function(){
    return this.todayStartTime() + 86400 - 1;
};

/**
 * 获取当前时间戳
 *
 * @returns {number}
 * @author xiaoyanchun
 */
common.timestamp = function(){
    return moment().unix();
};

/**
 * 获取返回json数据源对象
 *
 * @returns {{}}
 * @author xiaoyanchun
 */
common.getApiResInit = function() {
    var obj = {};
    obj.status = '0000';
    obj.msg = '';
    obj.data = {};
    return obj;
}

/**
 * 检测当前场馆是否在绑定的场馆内
 *
 * @param req
 * @param venueId
 * @returns {boolean}
 * @author xiaoyanchun
 */
common.inBindVenueList = function(req, venueId){
    var venueList = req.session.venueList;

    if (typeof venueList == 'undefined') {
        return false;
    }

    var len = venueList.length;

    if (len <= 0) {
        return false;
    }

    for (var i = 0; i < len; i++) {
        if (venueList[i].venue_id == venueId) {
            return true;
        }
    }

    return false;
};

/**
 * 通过当天的开始时间获取当天的最后时间
 *
 * @param startTime
 * @author xiaoyanchun
 */
common.getDayEndTime = function(startTime) {
    return startTime + 86400 - 1;
}


/**
 * 通过日期时间戳,获取当天所在周的开始时间 (一周的开始从“星期日”的0点开始算)
 *
 * @param date 0点时间（时间戳）
 * @returns {number}
 * @author xiaoyanchun
 */
common.getWeekStartTime = function (date){
    var dateObj = new Date(date * 1000);
    // 星期几
    var weekDay = dateObj.getDay();
    return date - weekDay * 86400;
}


/**
 * 类似php的date函数
 *
 * @param formatStr 格式化字符串(格式: Y-m-d H:i:s 返回: 2016-04-26 10:23:33)
 * @param timestamp 有指定时间戳，返回指定时间戳的日期
 * @returns {string}
 * @author xiaoyanchun
 */
common.date = function(formatStr, timestamp){
    var obj = timestamp ? new Date(timestamp * 1000) : new Date();

    var strFullYear = obj.getFullYear() + ''; // 转换为字符串

    formatStr = formatStr.replace("Y", strFullYear); // 4位年
    formatStr = formatStr.replace("y", strFullYear.substr(2, 2)); // 2位年
    formatStr = formatStr.replace("m", pad2bit(obj.getMonth() + 1)); // 月份
    formatStr = formatStr.replace("d", pad2bit(obj.getDate())); // 日
    formatStr = formatStr.replace("H", pad2bit(obj.getHours())); // 时
    formatStr = formatStr.replace("i", pad2bit(obj.getMinutes())); // 分
    formatStr = formatStr.replace("s", pad2bit(obj.getSeconds())); // 秒

    return formatStr;
};

common.getUpgradeDate = function(req,venueId){
    var venueList = req.session.venueList;

    if (typeof venueList == 'undefined') {
        return 0;
    }

    for (var i = 0; i < venueList.length; i++) {
        // 小于升级的日期
        if (venueList[i].venue_id == venueId) {
            return  venueList[i].upgrade_date ? venueList[i].upgrade_date : 0;
        }
    }
    return 0;
};

/**
 * 判断场馆访问的日期是否是升级以前的日期(等于升级日期也显示旧数据)
 *
 * @param venueId
 * @param date
 * @returns {boolean}
 * @author xiaoyanchun
 */
common.isOldDate = function(req, venueId, date){
    var venueList = req.session.venueList;

    if (typeof venueList == 'undefined') {
        return false;
    }

    var len = venueList.length;

    if (len <= 0) {
        return false;
    }

    for (var i = 0; i < len; i++) {
        // 小于升级的日期
        if (venueList[i].venue_id == venueId && date <= venueList[i].upgrade_date) {
            return true;
        }
    }

    return false;
};


/**
 * 排序时间 (对开灯时间和订单时长排序)
 *
 * @param timeList
 * @returns {*}
 * @author xiaoyanchun
 */
common.sortTimeList = function (timeList){
    /*
    if (timeList.length > 0) {
        timeList.sort(function(a, b){
            return a[0] > b[0];
        });
    }
    return timeList;
    */

    var len = timeList.length;
    for (var i = 0; i < len; i++) {
        common.bubbleSortTimeList(timeList[i]);
    }

    return timeList;
};


/**
 * 排序时间 (对开灯时间和订单时长排序)
 *
 * 冒泡排序一
 *
 * @param timeList
 * @returns {*}
 * @author xiaoyanchun
 */
common.bubbleSortTimeList = function (timeList)
{
    var arr = timeList;
    var len = arr.length;

    for (var i = 0; i < len - 1; i++) {

        for (var j = i + 1; j < len; j++) {
            if (parseInt(arr[i][0]) > parseInt(arr[j][0])) {
                var tmp = arr[j];
                arr[j] = arr[i];
                arr[i] = tmp;
            }
        }
    }
    return arr;
};


/**
 * 日期位数不够2位，前面1位补0
 *
 * @param num
 * @returns {string}
 * @author xiaoyanchun
 */
function pad2bit(num) {
    num += ''; // 转为字符串

    if (num.length >= 2) {
        return num;
    } else {
        return '0' + num; // 不够2位，前面补0
    }
}
//克隆
common.clone = function(obj){
    if(typeof obj !== 'object' || obj === null){
        return obj
    }
    var objClone;  
    if ( obj.constructor == Object ) objClone = new obj.constructor();  
    else objClone = new obj.constructor(obj.valueOf());  
    for ( var key in obj )  
     {  
        if ( objClone[key] != obj[key] )  
         {  
            if ( typeof(obj[key]) == 'object' )  
             {  
                 objClone[key] = common.clone(obj[key]);  
             }  
            else  
             {  
                 objClone[key] = obj[key];  
             }  
         }  
     }  
     objClone.toString = obj.toString;  
     objClone.valueOf = obj.valueOf;  
    return objClone;  
};

// 将对象导出
module.exports = common;