<?php
/**
 * 配置页面标题、关键字和介绍管理
 */
class baf_TitleArr
{

    /**
     * 渠道标题
     */
    static $utmTitle = array(
            'liaoning' => '辽宁全民健身',
            'guangdong' => '广东省社会体育中心',
			'shanghai' => '上海市宝山区体育局',
            'lexin' => '乐心运动',
            'gagc' => '广汽电装',
            'xunqiu' => '寻球',
            'yiqiu' => '壹球'
        );
    static $utmCompanyName = array(
            'guangdong' => '广州嶝柏仕信息科技有限公司'
        );
	 /**
     * 页面标题、关键字和介绍的对应数组
     */
    static $arr = array(
    	//首页
    	'index_index' => array(
    		'weixin' => array(
    			'title' 		=> '订场神器-趣运动'
    			),
    		'qqwallet' => array(
    			'title' 		=> '场地预订'
    			),
            'lexin' => array(
                'title'         => '乐心运动场地预订'
                ),            
            'utm_source' => array(
                'title' => '{TITLE}'
                ),
    		'wap' => array(//默认渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '趣运动-订场神器_订场就这么简单_网上预订_手机订场_羽毛球订场_羽毛球馆_足球场_游泳馆查询预订_去运动'
    			),
    		),

    	//设置城市页面
    	'index_city' => array(
    		'qqwallet' => array(
    			'title' 		=> '选择城市'
    			),
            'utm_source' => array(
                'title' => '选择城市-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '选择城市-趣运动'
    			),
    		),

        //设置新城市页面
        'index_getcity' => array(
            'qqwallet' => array(
                'title'         => '选择城市'
                ),
            'utm_source' => array(
                'title' => '选择城市-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '选择城市-趣运动'
                ),
            ),

    	//搜索页面
    	'index_search' => array(
    		'qqwallet' => array(
    			'title' 		=> '搜索'
    			),
            'utm_source' => array(
                'title' => '搜索-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '搜索-趣运动'
    			),
    		),

        //场馆会员卡
        'usercard_index' => array(
            'utm_source' => array(
                'title' => '场馆会员卡-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '场馆会员卡-趣运动'
                ),
            ),
        //会员卡记录
        'usercard_translist' => array(
            'utm_source' => array(
                'title' => '会员卡记录-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '会员卡记录-趣运动'
                ),
            ),

    	//卡劵列表
    	'coupon_index' => array(
    		'qqwallet' => array(
    			'title' 		=> '我的卡劵'
    			),
            'utm_source' => array(
                'title' => '我的卡劵-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '我的卡劵-趣运动'
    			),
    		),

    	//过期卡劵
    	'coupon_expire' => array(
    		'qqwallet' => array(
    			'title' 		=> '失效卡劵'
    			),
            'utm_source' => array(
                'title' => '失效卡劵-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '失效卡劵-趣运动'
    			),
    		),

    	//选择卡券
    	'coupon_selectcoupon' => array(
    		'qqwallet' => array(
    			'title' 		=> '卡劵'
    			),
            'utm_source' => array(
                'title' => '卡劵-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '卡劵-趣运动'
    			),
    		),

    	//绑定卡劵
    	'coupon_activate' => array(
    		'qqwallet' => array(
    			'title' 		=> '绑定卡劵'
    			),
            'utm_source' => array(
                'title' => '绑定卡劵-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '绑定卡劵-趣运动'
    			),
    		),
        //卡劵说明
        'coupon_couponrule' => array(
            'qqwallet' => array(
                'title'         => '卡劵说明'
                ),
            'utm_source' => array(
                'title' => '卡劵说明-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '卡劵说明-趣运动'
                ),
            ),
        
        //场馆列表
        'court_index' => array(
            'qqwallet' => array(
                'title'         => '场馆列表'
                ),
            'utm_source' => array(
                'title' => '场馆列表-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '场馆列表-趣运动'
                ),
            ),

    	//场馆详情
    	'court_detail' => array(
    		'weixin' => array(
    			'title' 		=> '-趣运动'
    			),
    		'qqwallet' => array(
    			'title' 		=> '场馆详情'
    			),
            'utm_source' => array(
                'title' => '-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '-趣运动'
    			),
    		),

    	//场馆名片页
    	'court_view' => array(
    		'weixin' => array(
    			'title' 		=> '-趣运动'
    			),
            'utm_source' => array(
                'title' => '-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '-趣运动'
    			),
    		),

    	//选择场次页面
    	'court_book' => array(
            'weixin' => array(
                'title'         => '-趣运动'
                ),
    		'qqwallet' => array(
    			'title' 		=> '选择场次'
    			),
            'utm_source' => array(
                'title' => '-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '-趣运动'
    			),
    		),

        //场馆评论页面
        'court_comment' => array(
            'qqwallet' => array(
                'title'         => '评论列表'
                ),
            'utm_source' => array(
                'title' => '评论列表-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '评论列表-趣运动'
                ),
            ),

        //场馆地图详情
        'court_map' => array(
            'qqwallet' => array(
                'title'         => '地图详情'
                ),
            'utm_source' => array(
                'title' => '-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '-趣运动'
                ),
            ),

    	//用户登录、注册
    	'login_index' => array(
            'utm_source' => array(
                'title' => '登录-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '登录-趣运动'
    			),
    		),

        //用户登录
        'login_qucklogin' => array(
            'utm_source' => array(
                'title' => '短信登录-{TITLE}'
                ),
            'xunqiu' => array(
                'title' => '手机号码验证-寻球' 
                ),
            'yiqiu' => array(
                'title' => '手机号码验证-壹球' 
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '短信登录-趣运动'
                ),
            ),

        //用户登录
        'login_register' => array(
            'utm_source' => array(
                'title' => '注册-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '注册-趣运动'
                ),
            ),
        //重置密码
        'login_resetpassword' => array(
            'utm_source' => array(
                'title' => '重置密码-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '重置密码-趣运动'
                ),
            ),

        //用户登录、注册
        'login_qqwallet' => array(
            'qqwallet' => array(
                'title'         => '手机号码验证'
                ),
            'utm_source' => array(
                'title' => '登录-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '登录-趣运动'
                ),
            ),

    	//订单列表
    	'myorder_index' => array(
    		'qqwallet' => array(
    			'title' 		=> '我的订单'
    			),
            'utm_source' => array(
                'title' => '我的订单-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '我的订单-趣运动'
    			),
    		),

    	//订单详情页
    	'myorder_detail' => array(
    		'qqwallet' => array(
    			'title' 		=> '订单详情'
    			),
            'utm_source' => array(
                'title' => '订单详情-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '订单详情-趣运动'
    			),
    		),
    	
        //订单帮助页面
        'order_help' => array(
            'utm_source' => array(
                'title' => '帮助-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '帮助-趣运动'
                ),
            ),


    	//确认订单页面
    	'order_confirm' => array(
    		'qqwallet' => array(
    			'title' 		=> '确认订单'
    			),
            'utm_source' => array(
                'title' => '确认订单-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '确认订单-趣运动'
    			),
    		),

    	//人次商品订单确认页面
    	'order_confirmperson' => array(
    		'qqwallet' => array(
    			'title' 		=> '确认订单'
    			),
            'utm_source' => array(
                'title' => '确认订单-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '确认订单-趣运动'
    			),
    		),

    	//订单支付页
    	'order_pay' => array(
    		'qqwallet' => array(
    			'title' 		=> '支付'
    			),
            'utm_source' => array(
                'title' => '支付-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '支付-趣运动'
    			),
    		),

    	//支付成功页
    	'order_payok' => array(
    		'qqwallet' => array(
    			'title' 		=> '订场成功'
    			),
            'utm_source' => array(
                'title' => '支付成功-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '支付成功-趣运动'
    			),
    		),
        //支付成功页
        'order_paysuccess' => array(
            'qqwallet' => array(
                'title'         => '订场成功'
                ),
            'utm_source' => array(
                'title' => '支付成功-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '支付成功-趣运动'
                ),
            ),

    	//支付操作
    	'order_dopay' => array(
    		'qqwallet' => array(
    			'title' 		=> '支付'
    			),
            'utm_source' => array(
                'title' => '支付-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '支付-趣运动'
    			),
    		),

    	//人次商品详情页
    	'person_detail' => array(
    		'qqwallet' => array(
    			'title' 		=> '商品详情'
    			),
            'utm_source' => array(
                'title' => '-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '-趣运动'
    			),
    		),

    	//用户中心
    	'user_index' => array(
    		'qqwallet' => array(
    			'title' 		=> '我的'
    			),
            'utm_source' => array(
                'title' => '个人中心-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '个人中心-趣运动'
    			),
    		),

    	//帐户管理
    	'user_account' => array(
    		'qqwallet' => array(
    			'title' 		=> '账户管理'
    			),
            'utm_source' => array(
                'title' => '账户管理-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '账户管理-趣运动'
    			),
    		),

    	//绑定手机号
    	'user_bindphone' => array(
    		'qqwallet' => array(
    			'title' 		=> '绑定手机号'
    			),
            'utm_source' => array(
                'title' => '绑定手机号-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '绑定手机号-趣运动'
    			),
    		),

    	//修改密码
    	'user_changepassword' => array(
    		'qqwallet' => array(
    			'title' 		=> '修改密码'
    			),
            'utm_source' => array(
                'title' => '修改密码-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '修改密码-趣运动'
    			),
    		),

    	//设置密码
    	'user_setpassword' => array(
    		'qqwallet' => array(
    			'title' 		=> '设置密码'
    			),
            'utm_source' => array(
                'title' => '设置密码-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '设置密码-趣运动'
    			),
    		),

    	//用户余额
    	'user_balance' => array(
    		'qqwallet' => array(
    			'title' 		=> '我的余额'
    			),
            'utm_source' => array(
                'title' => '我的余额-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '我的余额-趣运动'
    			),
    		),

    	//用户余额使用规则
    	'user_brule' => array(
    		'qqwallet' => array(
    			'title' 		=> '我的余额-使用说明'
    			),
            'utm_source' => array(
                'title' => '余额使用说明-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '余额使用说明-趣运动'
    			),
    		),

    	//余额使用记录
    	'user_moneylog' => array(
    		'qqwallet' => array(
    			'title' 		=> '我的余额-历史记录'
    			),
            'utm_source' => array(
                'title' => '余额记录-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '余额记录-趣运动'
    			),
    		),

    	//忘记密码
    	'user_forget' => array(
    		'qqwallet' => array(
    			'title' 		=> '忘记支付密码'
    			),
            'utm_source' => array(
                'title' => '忘记支付密码-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '忘记支付密码-趣运动'
    			),
    		),
    	
    	//用户资料
    	'user_info' => array(
    		'qqwallet' => array(
    			'title' 		=> '我的资料'
    			),
            'utm_source' => array(
                'title' => '我的资料-{TITLE}'
                ),
    		'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
    			'title' 		=> '我的资料-趣运动'
    			),
    		),
        //用户收藏
        'user_favoritelist' => array(
            'utm_source' => array(
                'title' => '我的收藏-{TITLE}'
                ),
            'wap' => array(//默认的渠道--趣运动m站，必须要写这个数组！
                'title'         => '我的收藏-趣运动'
                ),
            ),
    );
    
    /**
     * 返回页面标题、关键字和介绍
     * @param  [type] $controllerWithAction 控制器_方法名
     * @param  [type] $utm_source           渠道标识
     * @param  string $otherMsg             为空时的返回
     * @return [type]                       string
     */
    public static function getTitle($controllerWithAction='', $utm_source='', $venuesName='', $otherMsg='')
    {
        if (empty($controllerWithAction) || empty($utm_source)) {
            return $otherMsg;
        }
        //存在时，就取下面参数返回
        if (isset(self::$arr[$controllerWithAction])) {
        	//获取controller_action数组
        	$controllerActionArr = self::$arr[$controllerWithAction];
            if (isset($controllerActionArr[$utm_source])) {
                //返回utm_source数组中的标题值
                //如果是场馆详情、预订场地的页面，就增加场馆名称
                if ($controllerWithAction == 'court_detail' || $controllerWithAction == 'court_view' || $controllerWithAction == 'court_book' || $controllerWithAction == 'person_detail' || ($controllerWithAction == 'court_map' && $utm_source!='qqwallet')) {
                    return  $venuesName.$controllerActionArr[$utm_source]['title'];
                }else{
                    return  $controllerActionArr[$utm_source]['title'];
                }
        	}elseif(isset($controllerActionArr['utm_source']['title']) && isset(self::$utmTitle[$utm_source])){
                $utmTitle = self::$utmTitle[$utm_source];
                $title = str_replace('{TITLE}', $utmTitle, $controllerActionArr['utm_source']['title']);
                if ($controllerWithAction == 'court_detail' || $controllerWithAction == 'court_view' || $controllerWithAction == 'court_book' || $controllerWithAction == 'person_detail' || ($controllerWithAction == 'court_map' && $utm_source!='qqwallet')) {
                    $title = $venuesName.$title;
                }
                return $title;
            }elseif(isset($controllerActionArr['wap'])){
                //返回默认的m站的页面标题
                //如果是场馆详情、预订场地的页面，就增加场馆名称
                if ($controllerWithAction == 'court_detail' || $controllerWithAction == 'court_view' || $controllerWithAction == 'court_book' || $controllerWithAction == 'person_detail' || ($controllerWithAction == 'court_map' && $utm_source!='qqwallet')) {
                    return  $venuesName.$controllerActionArr['wap']['title'];
                }else{
                    return  $controllerActionArr['wap']['title'];
                }
        	}
        }
        
        return $otherMsg;
    }

    /**
     * 获取来源名称
     */
    public static function getUtmTitle($utmSource=''){
        return (!empty($utmSource) && isset(self::$utmTitle[$utmSource])) ? self::$utmTitle[$utmSource] : '';
    }

    /**
     * 来源公司名称
     */
    public static function getUtmCompany($utmSource=''){
        return (!empty($utmSource) && isset(self::$utmCompanyName[$utmSource])) ? self::$utmCompanyName[$utmSource] : '广州柠蜜信息科技有限公司';
    }
}