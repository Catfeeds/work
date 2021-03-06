<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<title>主页-场馆预订</title>
    <style type="text/css">
    	 /*@font-face {
			font-family: 'SC';
			src: url('./PingFang Regular.ttf'),
 			url('./PingFang Regular.ttf');
		}*/
		*{
            margin: 0;
            padding: 0;
            font-family: "PingFangSC-Medium,黑体,宋体"; 
        }
        a:hover, a:visited, a:link, a:active {
           color:none;
        }
        #content {  
            width:100%;
        }
        .content {  
            width: 100%;
            overflow: hidden;
            background: #ffffff;
        }
        .content .tabar{
            overflow: hidden;
            padding:0.8rem 0;
        }
        .content .title{
            color:#000000;
            font-size: 1.2rem;
            text-indent:1rem;
            font-weight: bold;
            float: left;
        }
        .content ul {  
            padding: 0px;
            margin: 0px;
            text-align: center;
            overflow: hidden;
            margin-right: 0.5rem;
        }
        .flow{
            float: right;
        }
        .content li {  
            list-style-type: none;  
            float: left;
            width: 4.5rem;
            height: 2rem;
            border-radius: 1rem;
            color:#888888;
            line-height: 2rem;
            margin-right: 0.5rem;
        }
        .active{
            background: #FB6165;
            color:#FFFFFF !important;
        }
        
        .tab_content{
            width:100%;
        }
        .tabCon{ 
            background: #FAFAFA;
            padding: 0.8rem 0rem;
            overflow: hidden}
        .tabBox{ position: relative}
        .lineBorder{ height: 2px; overflow: hidden;}
        .lineDiv{  height: 2px; }
        .tabList{
            float:left;
            width:100%;
            overflow-x: scroll;
            background: #FAFAFA;
        }
        .tabList .tabcontent{
            width: 100%;
            overflow-x: scroll;
            margin-left:1rem;
        }
        .tabList .list-item{
            border: 1px solid #DDDDDD;
            background: #FFFFFF;
            border-radius: 0.5rem;
            width: 8rem;
            height:8rem;
            margin-right: 0.8rem;
            float: left;
        }
        
        .tabList .list-item div{
            text-align: center;
        }
        .tabList .list-item .date{
            font-size: 1.1rem;
            font-weight: bold;
            margin: 1.3rem 0 0.2rem 0;
            color:black;
        }
        .tabList .list-item .remain{
            color:#888888;
            margin-bottom: 0.55rem;
        }
        .tabList .list-item .price{
            color:#FB6165;
            font-size: 1.1rem;
            font-weight: bold;
        }
        .tabList .list-item .price img{
            width:1.2rem;
            vertical-align: middle;
            margin-left: 0.2rem;
        }
        .muchClass{
            width: 80rem;
        }
    </style>
    <script type="text/javascript" src='/themes/koubei/js/touchScroll.js'></script>
    <script type="text/javascript">
    	var offWidth = window.screen.width/30;
    		document.getElementsByTagName("html")[0].style.fontSize = offWidth + 'px';  
    </script>
    <script type="text/javascript" src='/static/koubei/jquery-2.1.1.min.js'></script>
    <script type="text/javascript">
        $(function () {
            var bookData = <?php echo json_encode($data);?>;
            if(bookData)
            {
                initAll(bookData);
            } 
            function initAll(data) {
                initLi(data,0);
                initTabList(data,0);
                if (data.length>=5) {
                    $("#tabarLi").removeClass('flow').wrap("<div id='scrollbar' style='overflow-x: scroll;float: right;width:70%;'></div>").width(data.length*5+'rem');
                    var scroll = new TouchScroll({id: 'scrollbar',opacity:0});
                }else if(data.length==1){
                    $(".tabar .title").html(data[0].cat_name+'场馆预订');
                    $("#tabarLi").hide();
                };

            }
            function initLi(data,index) {
                for (var i = 0; i < data.length; i++) {
                    $("#tabarLi").append('<li data-i='+i+' class='+(i==index?'active':'')+'>'+ data[i].cat_name +'</li>');
                };
                $("#wrap ul li").click(function(event) {
                    if(!$(this).hasClass('active')){
                        $("#wrap ul li").removeClass('active').eq($(this).index()).addClass('active')
                        $("#wrapper").remove();
                        initTabList(data,$(this).data('i'));    
                    }
                });
            }
            function initTabList(data,i) {
                var haveOther = data[i].items.length>7 ? 9.6 : 0;
                var minWidth = data[i].items.length*8.8 + 1.8 + haveOther;
                var  containLength =  minWidth>30.5?minWidth:30.5;
                var html = "<div class='tabCon wrapper' id='wrapper'><div class='tabBox' id='tabBox'>";
                    html = html + "<div class='tabList' style='width:"+containLength+"rem;'><div class='tabcontent'>";
                for (var l = 0; l < data[i].items.length; l++) {
                    var url = data[i].items[l].url;
                    html = html + "<div class='list-item btn' data-url='"+url+"'>";
                    html = html + "<div class='date' style='color:"+ (data[i].items[l].status=='1'?"":"#888888") +"'>"+ data[i].items[l].week + '(' + data[i].items[l].title +")</div>";
                    html = html + "<div class='remain'>"+ data[i].items[l].tip +"</div>";   
                    html = html + "<div class='price' style='color:"+ (data[i].items[l].status=='1'?"":"#888888") +"'>"+ data[i].items[l].price ;
                    if (data[i].items[l].status=="1") {html = html + "<img src='/static/koubei/arrow.png'>"}
                    html = html + "</div></div>";
                }
                if (data[i].items.length>7) {
                    html = html + "<div data-url='"+data[i].more_url+"' class='btn list-item' style='text-align:center;line-height:8rem;color:#FB6165'> 更多日期 </div>";
                }
                html = html + "</div></div></div></div>";
                $("#wrap").append(html);
                var scroll = new TouchScroll({
                    id: 'wrapper',
                    opacity:0,
                    onscroll: function(){
                    }
                })
                $('.btn').click(function(){
                    var url = $(this).data('url');
                    AlipayJSBridge.call('pushWindow', { url: url})
                });
            }

            if(AlipayJSBridge){
                 AlipayJSBridge.call('postO2ONotification', {
                  name: 'WebViewRenderSuccess',
                  data: { height: $('body').height() }
                })   
            }
        })
    </script>
    </head>  
    <body>  
        <div id="wrap" class="content wrap">
        	<div class="tabar">
        		<div class="title">场馆预订</div> 
        		<ul id="tabarLi" class="flow"></ul>
        	</div>  
        	
            <div class="lineBorder">
		        <div class="lineDiv"><!--移动的div--></div>
		    </div>
            <!-- <div class="tabCon" id='wrapper'>
		        <div class="tabBox" id="tabBox">
		            <div class="tabList">
		            	<div class="tabcontent">
			            	<div class="list-item">
			            		<div class='date'>今天(4-13)</div>
			            		<div class="remain">剩余8场</div>
			            		<div class="price">9元起</div>
			            	</div>
		            	</div>
		            </div>
		        </div>
		    </div> -->
        </div> 
    </body>
</html>  