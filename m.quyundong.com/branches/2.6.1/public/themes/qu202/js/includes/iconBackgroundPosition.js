var arr = [
  '羽毛球',
  '网球场',
  '桌球室',
  '瑜伽',
  '课程订单',
  '跆拳道',
  '射箭',
  '足球',
  '健身房',
  '保龄球馆',
  '舞蹈',
  '约练订单',
  '溜冰',
  '射击',
  '篮球',
  '壁球',
  '高尔夫场',
  '乒乓球',
  '教练',
  '攀岩',
  '热门',
  '游泳馆',
  '其他',
  '武术场馆',
  '卡丁车',
  '真人CS',
  '拼场',
];

function iconBackgroundPosition (str,dom) {
  var num = iconWhere(str);
  if(!dom.style) return false;
  console.log(num,dom.clientWidth);
  dom.style.backgroundPosition = "0px -"+(dom.clientWidth/3*5)*num+"px";
}

function iconWhere(str){
  for(var i = 0 ; i < arr.length ; i ++){
    if(str == arr[i]){
      return i;
    }
  }
  return 22;
}

export { iconBackgroundPosition };
