<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <!-- <link type="image/x-icon" rel="icon" href="http://www.quyundong.com/favicon.ico" /> -->
	<title><?php echo $title; ?></title>
    <script type="text/javascript">
        var utmSource = '<?php echo UTM_SOURCE; //来源?>';
    </script>
    <?php 
    if(CHANNEL_SOURCE=='qqwallet'){
    ?>  
    <link href="/static/css/reset.css" type="text/css" rel="stylesheet">
    <link href="/themes/qq/stylesheets/mobile-qq.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="/static/js/zeptoWithFx.min.js"></script>
    <script type="text/javascript" src="//open.mobile.qq.com/sdk/qqapi.js?_bid=152"></script>
    <script type="text/javascript" src="/themes/qq/js/mobile-qq-menu.js?ver=20161111"></script>
    <script type="text/javascript">var NM_CHANNEL = 'qqwallet';</script>
    <?php } ?>
</head>
<style>
body,html{
    padding: 0;
    margin: 0;
}
h1{margin:0;font-size: 1em;}
.hide{
    display: none !important;
}
.sport{
    display: inline-block;
    text-align: left; 
    margin-left: 5px; 
    margin-bottom: 10px;
    font-size: 13px;
    line-height: 150%;
    width: 100%;
    font-family:"Microsoft YaHei",微软雅黑;
}
.content{
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    background: #fff;
    width: 96%;
}
.title{
    margin: 0.8125rem auto 0.3125rem;
    border: 0.0625rem solid #e1e1e1;
    color: #636363;
    background: #f9f9f9;
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    padding-left: 15px;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    width: 95%;
}
.detail{
    color: #939393;
    font-size: 14px;
    width: 95%;
    margin: 0 auto;
    line-height: 150%;
    padding-top: 3px;
    padding-bottom: 5px;
    text-align: left;
}
.detail div{
    border-bottom: 0.0625rem solid #e1e1e1;
    width: 99%;
    line-height: 1.5;
    padding: 0.4rem 0;
}	
.di{
    height: 10px;
    background: #f0efed;
}
.header {
    width: 100%;
    height: 44px;
    background-color: #009ff0;
    text-align: center;
    line-height: 44px;
    position: relative
}

.header .center {
    width: 100%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 50px;
    position: relative;
    font-size: 18px;
    color: #fff
}

.header .left,
.header .right {
    width: 50px;
    height: 44px;
    position: absolute;
    top: 0;
    z-index: 99;
    font-size: 0
}

.header .left {
    left: 0
}

.header .right {
    right: 0;
    font-size: 15px;
    color: #fff
}

.header .icon-back {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-bottom: 2px solid #fff;
    border-left: 2px solid #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -7.5px;
    margin-top: -7.5px;
    -moz-transform: rotateZ(45deg);
    -ms-transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg)
}
</style>
<body style="background: #f0efed;">
	<div class="sport">
        <?php if ($id == '38'){ ?>
            <div class="content">
                <div class="title">1、什么是运动券</div>
                <div class="detail">运动券可在趣运动APP和官网上兑换预订相应运动种类任意场馆任意时间一个场次</div>
            </div>
            <div class="content">
                <div class="title">2、如何使用运动券</div>
                <div class="detail">将票券绑定至我的账户、选择场次确认、提交订单页面使用绑定票券或直接输入票券密码，提交订单、确认完成，手机收到提示短信，到场馆使用。</div>
            </div>
            <div class="content">
                <div class="title">3、什么是代金券</div>
                <div class="detail">代金券是在趣运动客户端或网站交易中使用的现金抵用券，可以在消费付款时抵扣相应面值的金额。</div>
            </div>
            <div class="content">
                <div class="title">4、如何获取代金券</div>
                <div class="detail">可通过邀请好友注册并下单获取代金券，此外，趣运动不定期推出优惠活动，可享受超低折扣订场优惠。</div>
        	</div>
        	<div class="content">
                <div class="title">5、如何使用代金券</div>
                <div class="detail">提交订单支付时，添加使用代金券，根据代金券金额，将在支付金额里抵扣相应的金额。</div>
        	</div>
        	<div class="content">
                <div class="title">6、代金券找零兑现吗</div>
                <div class="detail">代金券不找零，不兑现，每个订单仅限使用一张代金券。</div>
        	</div>
            <div class="content">
                <div class="title">7、卡券使用限制</div>
                <div class="detail">预订同一个场馆及项目中同一天的场地时，最多使用1张卡券（包括代金券和运动券）。</div>
            </div>
        <?php } else if ($id == '37'){?>
        <div class="content">
            <div class="title">积分规则</div>
            <div class="detail" style="padding-top: 0px;">
                <div>1、场地过了消费时间后，将获得积分</div>
                <div>2、规定时间内评价球馆一次可得10个积分</div>
                <div>3、评价中添加图片，一张图片可得5积分</div>
                <div>4、通过打卡可以获得积分</div>
                <div>5、向趣运动报告场馆错误信息，审核通过后可得100积分</div>
                <div>6、关注[趣运动]公众号，绑定微信可得200积分</div>
                <div style="border: 0px;">7、向趣运动推荐搜索不到的场馆，审核通过后可得300积分</div>
                <!--<div style="border: 0px;">4、完善个人资料可得50个积分</div>
                <div style="border: 0px;">5、场地预订成功后分享可得30积分</div>-->
            </div>
        </div>
        <?php } else if ($id == '39'){ ?>
        <div class="content">
            <div class="title">抽奖规则</div>
            <div class="detail" style="padding-top: 0px;">
                <div>1、每次抽奖使用10积分，抽奖次数不限</div>
                <div>2、抽中的积分将于10分钟内充入您的积分中</div>
                <div>3、若未中奖，消耗的积分不予返还。</div>
                <div style="border: 0px;">4、抽中的奖品可在中奖记录中查看</div>
            </div>
        </div>
        <?php } else if ($id == '40'){ ?>
        <div class="content">
            <div class="title">一、订单问题</div>
            <div class="detail">
                您提交的订单我们会为您保存10分钟， 请尽快完成支付，如果10分钟之内没有完成支付，系统将自动取消该订单。
            </div>
        </div>
        <div class="content">
            <div class="title">二、支付问题</div>
            <div class="detail">
                1、如果支付宝客户端支付失败，请使用支付宝网页支付或微信支付。为保证顺利支付，请在网络良好的状态下操作<br />
                2、如果支付后订单仍显示“未支付”，请确认您的支付宝账户是否被扣取相应的费用，如果没有，请您在“我的订单”里重新支付未支付的订单<br />
                3、如果支付后订单显示“已取消”，请确认您的支付宝账户是否已经被扣取相关费用，如果已扣，请拨打我们的客服电话。我们会尽快为您处理。
            </div>
        </div>
        <div class="content">
            <div class="title">三、代金券说明</div>
            <div class="detail">
                1、参与趣运动优惠活动有机会获得代金券<br />
                2、请在代金券的有效日期内使用，逾期无效<br />
                3、每个订单只能使用一张代金券，不累加使用<br />
                4、每个代金券兑换码只能兑换一次，在兑换之前请妥善保管您的兑换码以保证正常使用。<br /><br />
                如果以上解答没有解决您的问题，可致电客服电话。感谢您对趣运动的支持，您的反馈是我们的宝贵财富。
            </div>
        </div>
        <?php } else if ($id == '41'){ ?>
        <div class="content">
            <div class="title">趣运动用户协议</div>
            <div class="detail" style="font-size: 12px;">
                趣运动与用户共同确认：<br />

                1. 用户点击趣运动注册页面的同意注册按钮并完成注册程序、获得趣运动账号和密码时，视为用户与趣运动已达成《趣运动用户协议》，就用户进入趣运动消费（即用户通过趣运动与场馆商家进行交易）达成本协议的全部约定。<br />

                2. 趣运动及用户均已认真阅读本《趣运动用户协议》(下称“本协议”)中全部条款及趣运动发布的其他全部服务条款和操作规则的内容，对本协议及前述服务条款和规则均以知晓、理解并接受，同意将其作为确定双方权利义务的依据。趣运动《法律声明》为本协议的必要组成部分，用户接受本协议的同时即视为接受趣运动《法律声明》的全部内容。<br />
                
                一、用户注册<br />
                1.1.注册资格<br />
                用户承诺：用户具有完全民事权利能力和行为能力或虽不具有完全民事权利能力和行为能力但经其法定代理人同意并由其法定代理人代理注册及应用趣运动服务。<br />
                1.2.注册目的<br />
                用户承诺：用户进行用户注册并非出于违反法律法规或破坏趣运动的交易秩序的目的。<br />
                1.3.注册流程<br />
                1.3.1.用户同意根据趣运动用户注册页面的要求提供有效电子邮箱、所在城市等信息，设置趣运动账号及密码，用户应确保所提供全部信息的真实性、完整性和准确性。<br />
                1.3.2.用户在注册时有权选择是否订阅趣运动发送的关于趣运动的电子邮件和或短信息。<br />
                1.3.3.用户合法、完整并有效提供注册所需信息的，有权获得趣运动账号和密码，趣运动账号和密码用于用户在趣运动进行会员登录。<br />
                1.3.4.用户获得趣运动账号及密码时视为用户注册成功，用户同意接收趣运动发送的与趣运动网站管理、运营相关的电子邮件和或短消息。
                二、用户服务<br />
                趣运动为用户通过趣运动进行网络交易活动提供网络交易平台服务，目前趣运动对用户提供的趣运动网络交易平台服务为免费服务，但趣运动保留未来对趣运动网络交易平台服务收取服务费用的权利。<br />
                2.1.服务内容<br />
                
                2.1.1.用户有权在趣运动浏览运动场馆信息、有权通过趣运动与商家进行场次预订。<br />
                
                2.1.2.用户有权在趣运动查看其趣运动会员账号下的信息，有权应用趣运动提供的功能进行操作。<br />
                
                2.1.3.用户有权按照趣运动发布的活动规则参与趣运动组织的网站活动。<br />
                
                2.1.4.趣运动承诺为用户提供的其他服务。<br />
                
                2.2.服务规则<br />
                用户承诺遵守下列趣运动服务规则：<br />
                2.2.1.用户应当遵守法律法规、规章、规范性文件及政策要求的规定，不得在趣运动或利用趣运动服务从事非法或其他损害趣运动或第三方权益的活动，如发送或接收任何违法、违规、违反公序良俗、侵犯他人权益的信息，发送或接收传销材料或存在其他危害的信息或言论，未经趣运动授权使用或伪造趣运动电子邮件题头信息等。<br />
                
                2.2.2.用户应当遵守法律法规应当妥善使用和保管趣运动账号及密码，对其趣运动账号和密码下进行的行为和发生的事件负责。当用户发现趣运动账号被未经其授权的第三方使用或存在其他账号安全问题时应立即有效通知趣运动，要求趣运动暂停该趣运动账号的服务。趣运动有权在合理时间内对用户的该等请求采取行动，但对采取行动前用户已经遭受的损失不承担任何责任。用户在未经趣运动同意的情况下不得将趣运动账号以赠与、借用、租用、转让或其他方式处分给他人。<br />
                
                2.2.3.用户通过趣运动与商家进行运动场馆场次预订时，应当遵守本协议的全部约定及趣运动发布的其他关于场馆交易的服务条款和操作规则的全部规定。<br />
                
                2.2.4.用户在趣运动对服务进行评价时应当根据实际情况如实进行评价。<br />
                
                2.2.5.用户应当按照趣运动发布的规则参加趣运动抽奖等活动，遵守活动秩序。<br />
                
                2.2.6.趣运动发布的其他服务条款和操作规则。<br />
                三、用户的权利和义务<br />

                3.1.用户有权按照本协议约定接受趣运动提供的趣运动网络交易平台服务。<br />
                
                3.2.用户有权在注册时选择是否订阅趣运动发送的关于场馆信息的电子邮件或短消息，并在注册成功后有权随时订阅或退订趣运动该等信息。<br />
                
                3.3.如用户要求获得场馆的发票、其他付款凭证、购货凭证或服务单据，有权且应当在对场馆进行消费时向场馆方提出，发票金额以实际支付的价款为准。<br />
                
                3.4.用户在消费的过程中，如发现场馆服务与订单内容不符或存在质量、服务态度等其他问题的，应与商家采取协商或其他方式予以解决，趣运动可向用户提供商家的真实网站登记信息并积极协助用户与商家解决争议。<br />
                
                3.5.用户有权随时终止使用趣运动服务。<br />
                
                3.6.用户应保证其在注册时和提交订单时所提供的姓名、联系方式、联系地址等全部信息真实、完整、准确，并当上述信息发生变更时及时进行更新提供给趣运动的信息。<br />
                
                3.7.用户在趣运动进行交易时不得恶意干扰交易的正常进行、破坏趣运动的交易秩序。<br />
                
                3.8.用户不得以任何技术手段或其他方式干扰趣运动的正常运行或干扰其他用户对趣运动服务的使用。<br />
                
                3.9.用户不得以虚构事实等方式恶意诋毁趣运动或商家的商誉。<br />
                
                3.10.用户通过趣运动进行交易应出于真实消费目的，不得以转售等商业目的进行交易。<br />
                
                3.11.用户不得对场馆服务进行虚假评价或虚假投诉。<br />
                
                四、趣运动的权利和义务 <br />
                
                4.1.如用户不具备本协议约定的注册资格，则趣运动有权拒绝用户进行注册，对已注册的用户有权注销其趣运动会员账号，趣运动因此而遭受损失的有权向前述用户或其法定代理人主张赔偿。同时，趣运动保留其他任何情况下决定是否接受用户注册的权利。<br />
                
                4.2.趣运动发现账户使用者并非账户初始注册人时，有权中止该账户的使用。<br />
                
                4.3.趣运动通过技术检测、人工抽检等检测方式合理怀疑用户提供的信息错误、不实、失效或不完整时，有权通知用户更正、更新信息或中止、终止为其提供趣运动服务。<br />
                
                4.4.趣运动有权在发现趣运动上显示的任何信息存在明显错误时，对信息予以更正。<br />
                
                4.5.用户付款成功前，趣运动有权接受商家委托对订单内容作出变更，如用户接受变更后的内容则用户可确认订单及付款，如用户不接受变更后内容则有权取消订单。用户付款成功后，如确因情况变化导致商家需对订单内容作出变更的，趣运动有权接受商家委托单方对订单内容作出变更，如用户接受变更则按变更后的订单内容进行消费，如用户不接受变更则用户有权取消订单并要求趣运动代商家全额退款。<br />
                
                4.6.趣运动保留随时修改、中止或终止趣运动服务的权利，趣运动行使修改或中止服务的权利不需事先告知用户，趣运动终止趣运动一项或多项服务的，终止自趣运动在网站上发布终止公告之日生效。<br />
                
                4.7.趣运动应当采取必要的技术手段和管理措施保障趣运动的正常运行，并提供必要、可靠的交易环境和交易服务，维护交易秩序。<br />
                
                4.8.如用户连续一年未使用趣运动会员账号和密码登录趣运动，则趣运动有权注销用户的趣运动账号。账号注销后，趣运动有权将相应的会员名开放给其他用户注册使用。<br />
                
                4.9.趣运动有权在本协议履行期间及本协议终止后保留用户的注册信息及用户应用趣运动服务期间的全部交易信息，但不得非法使用该等信息。<br />
                
                4.10.趣运动有权随时删除趣运动网站内各类不符合国家法律法规、规范性文件或趣运动网站规定的用户评价等内容信息，趣运动行使该等权利不需提前通知用户。<br />
                
                五、特别声明<br />
                
                5.1.用户未通过趣运动与商家之间进行的交易不属于趣运动的交易，趣运动对不属于趣运动交易的交易事项不承担任何责任，用户不得因其与商家之间因此类交易发生的任何争议投诉趣运动或要求趣运动承担任何责任。不属于趣运动交易的情况具体包括：用户未在趣运动与商家成立订单；用户虽在趣运动与商家成立订单，但未通过趣运动而直接向商家支付价款。<br />
                
                5.2.不论在何种情况下，趣运动对由于信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、政府行为、司法行政机关的命令、其他不可抗力或第三方的不作为而造成的不能服务或延迟服务承担责任。<br />
                
                5.3.为了用户更加方便和安全的使用趣运动的服务，趣运动将使用cookie，收集用户与趣运动站点有关的特征信息，用于标识用户的设备。同时，趣运动会积极采取先进的技术手段和有效的管理机制来保障用户的账户安全，保障用户的隐私信息不被任何未授权的使用或者泄露。<br />
                
                六、知识产权<br />
                
                6.1.趣运动所包含的全部智力成果包括但不限于数据库、网站设计、文字和图表、软件、照片、录像、音乐、声音及其前述组合，软件编译、相关源代码和软件 (包括小应用程序和脚本) 的知识产权权利均归趣运动所有。用户不得为商业目的复制、更改、拷贝、发送或使用前述任何材料或内容。<br />
                
                6.2.趣运动名称中包含的所有权利 (包括商誉和商标) 均归趣运动所有。<br />
                
                6.3.用户接受本协议即视为用户主动将其在趣运动发表的任何形式的信息的著作权，包括但不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利无偿独家转让给趣运动所有，趣运动有权利就任何主体侵权单独提起诉讼并获得全部赔偿。本协议属于《中华人民共和国著作权法》第二十五条规定的书面协议，其效力及于用户在趣运动发布的任何受著作权法保护的作品内容，无论该内容形成于本协议签订前还是本协议签订后。<br />
                
                6.4.用户在使用趣运动服务过程中不得非法使用或处分趣运动或他人的知识产权权利。用户不得将已发表于趣运动的信息以任何形式发布或授权其它网站（及媒体）使用。<br />
                
                七、客户服务<br />
                
                趣运动建立专业的客服团队，并建立完善的客户服务制度，从技术、人员和制度上保障用户提问及投诉渠道的畅通，为用户提供及时的疑难解答与投诉反馈。<br />
                
                八、协议的变更和终止<br />
                
                8.1.协议的变更<br />
                
                趣运动有权随时对本协议内容或趣运动发布的其他服务条款及操作规则的内容进行变更，变更时趣运动将在趣运动网站显著位置内发布公告，变更自公告发布之时生效，如用户继续使用趣运动提供的服务即视为用户同意该等内容变更，如用户不同意变更后的内容则用户有权注销趣运动账户、停止使用趣运动服务。<br />
                
                8.2.协议的终止
                
                8.2.1.趣运动有权依据本协议约定注销用户的趣运动账号，本协议于账号注销之日终止。<br />
                
                8.2.2.趣运动有权依据本协议约定终止全部趣运动服务，本协议于趣运动全部服务终止之日终止。<br />
                
                8.2.3.本协议终止后，用户无权要求趣运动继续向其提供任何服务或履行任何其他义务，包括但不限于要求趣运动为用户保留或向用户披露其原趣运动账号中的任何信息，向用户或第三方转发任何其未曾阅读或发送过的信息等。
                <br />
                8.2.4.本协议的终止不影响守约方向违约方追究违约责任。<br />
                
                九、违约责任<br />
                
                9.1.趣运动或用户违反本协议的约定即构成违约，违约方应当向守约方承担违约责任。<br />
                
                9.2.如用户违反本协议约定，以转售等商业目的进行交易，则趣运动有权代商家取消相关交易，并有权注销其趣运动账号，终止为其提供趣运动服务，如趣运动因此而遭受损失的，有权要求用户赔偿损失。<br />
                
                9.3.如因用户提供的信息不真实、不完整或不准确给趣运动或商家造成损失的，趣运动有权要求用户对趣运动或对商家进行损失的赔偿。<br />
                
                9.4.如因用户违反法律法规规定或本协议约定，在趣运动或利用趣运动服务从事非法活动的，趣运动有权立即终止继续对其提供趣运动服务，注销其账号，并要求其赔偿由此给趣运动造成的损失。<br />
                
                9.5.如用户以技术手段干扰趣运动的运行或干扰其他用户对趣运动使用的，趣运动有权立即注销其趣运动账号，并有权要求其赔偿由此给趣运动造成的损失。<br />
                
                9.6.如用户以虚构事实等方式恶意诋毁趣运动或商家的商誉，趣运动有权要求用户向趣运动或商家公开道歉，赔偿其给趣运动或商家造成的损失，并有权终止对其提供趣运动服务。<br />
                
                十、争议解决<br />
                
                用户与趣运动因本协议的履行发生争议的应通过友好协商解决，协商解决不成的，任何一方均可向人民法院提起诉讼。<br />
                
                十一、协议生效<br />
                
                本协议于用户点击趣运动注册页面的同意注册并完成注册程序、获得趣运动账号和密码时生效，对趣运动和用户均具有约束力。<br />
            </div>
        </div>
        
        <?php } else if ($id == '42'){ ?>
        <div class="content">
            <div class="title">退款说明</div>
            <div class="detail" style="font-size: 12px;">
1、通过趣运动预订羽毛球、篮球、足球、乒乓球、网球的场次类订单可支持退款。其他项目不支持退款；<br />
2、退款需在运动项目开始时间算起，提前24小时以上申请；<br />
3、退款仅支持转入您的趣运动账户余额，确认退款后立即到账，余额暂不可以提现；<br />
4、款项可在“我的”页面上，点击“余额”进行查看，并可在趣运动上进行消费；<br />
5、30天内仅有一次退款机会；<br />
6、场地订单退款会同时退掉所购买的商品。<br />
            </div>
        </div>
        <?php } else if ($id == '43'){ ?>
            <div class="content">
                <div class="title">1、什么是储值卡</div>
                <div class="detail">储值卡用于余额充值，充值后转化成余额，适用于趣运动上所有可预订及支付项目，包含羽毛球、足球、篮球、健身月卡、陪练，以及各种优惠活动。</div>
            </div>
            <div class="content">
                <div class="title">2、储值卡如何使用</div>
                <div class="detail">点击余额充值输入VIP储值卡密码，完成激活后、储值卡的金额即已充入到余额中。</div>
            </div>
            <div class="content">
                <div class="title">3、什么是余额</div>
                <div class="detail">余额可支付场地预订费用，运动套餐购买费用，以及未来更多的运动服务费用。</div>
            </div>
            <div class="content">
                <div class="title">4、余额如何使用</div>
                <div class="detail">选择您要预订的场地或要购买的商品，提交订单后，您的余额会自动抵扣掉您要支付的金额。</div>
            </div>
            <div class="content">
                <div class="title">5、余额能充值或者提现吗</div>
                <div class="detail">余额可以充值，但不能提现，如造成不便，敬请谅解。</div>
            </div>
        <?php } else if ($id == '44'){ ?>
        <div class="content" style="display: none;">
            <div class="title">会员卡说明</div>
            <div class="detail" style="font-size: 12px;">
            1、会员卡是您在场馆办理的会员卡，与趣运动绑定后，可在趣运动上随时随地享受预订场地，充值会员卡等服务。<br />
            2、绑定会员卡需验证您在场馆预留的手机号码（在场馆办理会员卡时填写的手机号码）；没有预留，手机号忘记或者已停用，请联系场馆进行处理。<br />
            3、在趣运动上使用会员卡预订场地后，订场费用将会在您前往场馆消费时，由场馆扣取。
            </div>
        </div>
        <?php } ?>
    </div>
</body>
</html>
