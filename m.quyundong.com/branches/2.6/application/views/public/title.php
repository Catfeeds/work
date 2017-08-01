<meta charset="utf-8" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><?php echo !empty($pageTitle) ? $pageTitle : '';?></title>
<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
<meta content="telephone=no" name="format-detection" />
<meta name="keywords" content="<?php echo !empty($pageKeywords) ? $pageKeywords : '';?>" />
<meta name="description" content="<?php echo !empty($pageDescription) ? $pageDescription : '';?>" />
<style>
.wx_group_code{width:100%;background:#FFF;text-align:left;margin-top:10px;padding:1em 0;position:relative;border-top:1px solid #eee;border-bottom:1px solid #eee}.wx_group_code h3{font-size:18px;color:#222;line-height:28px;padding:0 15px}.wx_group_code p{font-size:14px;line-height:22px;color:#666;padding:0 15px}.wx_group_code a:hover,.wx_group_code a:link,.wx_group_code a:visited{position:absolute;right:1.5em;top:2em;display:inline-block;border-radius:15px;line-height:30px;width:108px;text-align:center;background:#5b73f2;color:#FFF;text-decoration:none}#wx_group_code_show{position:fixed;left:0;top:0;width:100%;height:100%;z-index:100;display:none}#wx_group_code_show .code_bg{background:#000;width:100%;height:100%;opacity:.8;z-index:9}#wx_group_code_show .show_code{z-index:10;position:absolute;width:75%;height:auto;top:25%;left:2em;text-align:center;background:#FFF;border-radius:15px;padding:15px}#wx_group_code_show .show_code img{width:80%;height:auto}#wx_group_code_show .show_code h3{font-size:16px;color:#222;line-height:2em}#wx_group_code_show .show_code p{color:#666;line-height:2em}
</style>
<script type="text/javascript">
	var URL_PARAMS = <?php echo !empty($qydUrlParams) ? json_encode($qydUrlParams) : 'null' ?>;
  function urlAddParams (url) {
    if(!URL_PARAMS) return url
    var urlSearch = getURLInformation(url).urlSearch
    var urlPath = getURLInformation(url).urlPath
    var urlHash = getURLInformation(url).urlHash
    var hasSearch = ''
    var hasHash = ''
    var search = objMerge(urlSearch,URL_PARAMS)
    if(urlSearch) hasSearch = '?'
    if(urlHash) hasHash = '#'

    return urlPath + hasSearch + formatSearch(search) + hasHash + urlHash

    function getURLInformation(URL) {

        var urlInfo = {
          urlPath:'',
          urlSearch:{},
          urlHash:''
        };

        urlInfo.urlPath = URL.split('#')[0].split('?')[0];

        if(URL.split('#')[1]){
          urlInfo.urlHash = URL.split('#')
          urlInfo.urlHash.shift()
          urlInfo.urlHash = urlInfo.urlHash.join('#')
        }

        if (URL.split('#')[0].split('?')[1]) {
          var temp = URL.split('#')[0].split('?')[1].split('&');
        }

        if (temp) {
          for (var i = 0; i < temp.length; i++) {
              urlInfo.urlSearch[temp[i].split('=')[0]] = temp[i].split('=')[1] || "";
          }
        }
        return urlInfo;
    }

    function objMerge (obj1,obj2) {
      if(typeof obj1 == 'object' && typeof obj2 == 'object'){
        var obj1 = JSON.parse(JSON.stringify(obj1))
        var obj2 = JSON.parse(JSON.stringify(obj2))
        for(var x in obj2){
          obj1[x] = obj2[x]
        }
      }
      return obj1
    }

    function formatSearch (searchObj) {
      var searchStr = ''
      if(typeof searchObj == 'object'){
        var search = JSON.parse(JSON.stringify(searchObj))
        for(var x in search){
          searchStr += '&' + String(x) + '=' + String(search[x])
        }
      }
      if(searchStr.length > 0){
        searchStr = searchStr.slice(1)
      }
      return searchStr
    }
  }

  function objMerge (obj1) {
    if(!URL_PARAMS) return obj1
    var obj2 = URL_PARAMS
    if(typeof obj1 == 'object' && typeof obj2 == 'object'){
      var obj1n = JSON.parse(JSON.stringify(obj1))
      var obj2n = JSON.parse(JSON.stringify(obj2))
      for(var x in obj2n){
        obj1n[x] = obj2n[x]
      }
    }
    return obj1n
  }

</script>
<?php 
if(baf_Common::isChannel('decathlon')){
 ?>
<link href="/themes/decathlon/stylesheets/decathlon.css?v=1.0" rel="stylesheet" type="text/css">
<?php } ?>
<?php 
$sysMsg = baf_Common::getMessage();
if(!empty($sysMsg)){
 ?>
<script src='/static/js/NMShowTips.js'></script>
<script>
  window.setTimeout(function(){
          var showTips = Object.create(NMShowTips);
          showTips.show('<?php echo addslashes($sysMsg);?>','知道了');
      },1000); 
</script>
<?php } ?>