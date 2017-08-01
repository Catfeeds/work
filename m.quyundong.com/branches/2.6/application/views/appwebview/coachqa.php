<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui"/>
	<title>教练招募Q&A</title>
	<link rel="stylesheet" type="text/css" href="/static/coach/web/style/nm.base.css">
	<link rel="stylesheet" type="text/css" href="/static/coach/web/style/coach.base.css">
</head>
<body>
	<div class="nm-coach-card">
		<div class="title">1.趣运动陪练是个什么样的模式？</div>
		<div class="content">趣运动陪练是主打运动及健身的陪练，是为了帮助运动爱好者提升个人运动技能、寻找运动伙伴而提供的一种运动服务。与此同时，陪练也可以获取收入、与各行各业的人进行交流的机会。</div>
	</div>
	<div class="nm-coach-card">
		<div class="title">2.可以从陪练中得到什么？</div>
		<div class="content">1）学员会支付给陪练一定的费用（30-100元/小时）。<br />
		2）我们的学员是来自各行各业的运动爱好者，在运动之余可以跟Ta们了解行业信息和经验。<br />
		3）趣运动会组织各式的活动，对参与活动的陪练除了订单收入外，还有额外的现金奖励。<br />
		4）趣运动会定期对陪练进行评选，选出来的优秀陪练会有更丰富的运动装备配备，还有可能上趣运动APP封面。</div>
	</div>
	<div class="nm-coach-card">
		<div class="title">3.在趣运动做陪练安全吗？</div>
		<div class="content">趣运动会从以下几个方面保证陪练的安全：<br />
		1）上岗前进行培训。陪练培训中会对运动安全部分进行指导和教学。<br />
		2）建立完善的学员评价体系。学员收到的评价会综合反应该学员的信用、品行等方面的情况。<br />
		3）投诉反应及处理。在陪练进行中、陪练后陪练可以对学员进行投诉，趣运动工作人员会立即介入并处理。被投诉的学员视严重程度会被禁止继续使用趣运动陪练。<br />
		4）陪练如有不便，可通过与学员沟通决定和更改陪练的时间和地点。<br />
		5）针对长期合作的优秀陪练，趣运动会为其购买人身保险。</div>
	</div>
	<div class="nm-coach-card">
		<div class="title">4.陪练的场地在哪里？</div>
		<div class="content">陪练的场地会根据学员和陪练之间的沟通来商定，包括运动场馆、公园等常见运动场所。</div>
	</div>
	<div class="nm-coach-card">
		<div class="title">5.陪练一般都集中在什么时间？</div>
		<div class="content">趣运动规定陪练的时间为上午6：00 至 晚上12：00，具体的时间会由学员和陪练之间的沟通来决定和更改。</div>
	</div>
	<div class="nm-coach-card">
		<div class="title">6.成为趣运动陪练的流程是什么样子的？</div>
		<div class="content">1）扫描陪练招募二维码，填写相关的个人资料进行陪练的申请。<br />
		2）趣运动工作人员会在3天内对申请人进行资格审核。<br />
		3）参加趣运动组织的陪练培训，签署陪练协议。<br />
		4）成为趣运动陪练。</div>
	</div>
	<div class="nm-coach-card">
		<div class="title">7.陪练资格审核会有多久？</div>
		<div class="content">我们会在收到申请的1天内完成对陪练的审核，特殊情况下会在3天内完成。审核结果会以短信和APP通知的形式发送给陪练。</div>
	</div>
	<div class="nm-coach-card">
		<div class="title">8.趣运动对陪练的培训地点和时间是怎么安排的？</div>
		<div class="content">趣运动每周一至周日每天会有两场培训，分别是上午10：00-12：00，下午14：00-16：00，地点会在公司附近（地铁员村站附近）的运动场馆中。陪练可以决定参与培训的时间。</div>
	</div>
	<div class="nm-coach-card">
		<div class="title">9.有哪些陪练项目？</div>
		<div class="content">固定的项目有网球、羽毛球、乒乓球、跑步、散步、游泳几项，陪练也可以自行添加自己擅长的领域，如瑜伽、单车等等。</div>
	</div>
	<div class="nm-coach-card">
		<div class="title">10.对陪练员的运动技能要求如何？</div>
		<div class="content">对陪练的运动技能不会有专业性的要求，只需要陪练员热爱运动，对某一运动项目有热爱和喜欢参与。</div>
	</div>
	<a class="nm-coach-btn-back" href="../static/coach.html" style="color:#fff">返回</a>
	<script type="text/javascript" src="/static/coach/web/js/zeptoWithFx.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			var $windowWidth = $(window).width();
			setTimeout(function(){
				$windowWidth = $(window).width();
				if($windowWidth > 640){
					$windowWidth = 640;
				}
				$("html").css("font-size",(100/320) * $windowWidth + "px");
			},100);
			

			$(window).resize(function(){
				$windowWidth = $(window).width();
				if($windowWidth > 640){
					$windowWidth = 640;
				}
				$("html").css("font-size",(100/320) * $windowWidth + "px");
			});
		});
	</script>
</body>
</html>