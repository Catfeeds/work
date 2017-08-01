<?php

//错误码类

class baf_ResCode {

	const SUCCESS              = SUCCESS_STATUS;
	const PHONE_ERROR 			= 1001;
	const PASSWORD_LENGH_ERROR	= 1002;
	const USERID_ERROR			= 1003;
	const USER_PASSWORD_ERROR	= 1004;
	const GET_SMS_CODE_ERROR	= 1005;
	const GET_SMS_CODE_LIMIT	= 1006;
	const GET_SMS_CODE_DAYLIMIT = 1007;
	const PASSWORD_NOT_MATCH	= 1008;

	const SYSTEM_ERROR			= 1009;

	const SMS_CODE_NOT_MATCH 	= 1010;
	const USERNAME_NOT_FOUND 	= 1011;
	const LOGINED				= 1012;
	const OLD_PASSWORD_ERROR	= 1013;

	const COURT_ORDERED			= 1014;
	const PHONE_REGISTER		= 1015;
    const COUPON_ERR		    = 1016;
    const REG_ERR		        = 1017;
    const SMS_CODE_NOT_EXIT		= 1018;
    const SMSCODE_ERR		    = 1019;
    const SMSCODE_TIME_LIMIT	= 1020;

    const NOT_LOGIN 			= 1021;

    const OTHER_ERR		        = 9001;
    const NEED_LOGIN			= 9002;

    const NMB_KEYWORD_ERR       = 2001;
    const NMB_USER_EXIT         = 2002;
    const NMB_USER_ACT          = 2003;
	const NMB_NUMBER_EXIT       = 2004;
    const NMB_NUMBER_EMPTY      = 2005;
    const NMB_USER_ACTING       = 2007;
    const NMB_UPLOAD_AVATAR     = 2008;
    const NMB_AVATAR_LEN        = 2009;
    const NMB_COUNT             = 2010;
    const NMB_SHAREIP_ERR       = 2011;
    const NMB_USER_NOACT        = 2012;
    const PARAM_ERR             = 2013;
	const REGISTER_PARAM_ERR    = 2014;

    const USER_HAD_REGISTER     = 3001;
    const UBER_CODE_OVER_LIMIT  = 3002;
    const UBER_HAD_JOINED       = 3003;

    const UPLOAD_ERR = 4001;
    const COACH_RECRUIT_EXIST = 4002;
    const COACH_RECRUIT_ERROR = 4003;
	const ACCESS_DENIED			= 4004;

	const WX_AUTH_FAILED      = 5001;
	const ACTIVITY_NONEXISTS = 5002;
	const ACTIVITY_END        = 5003;
	const ACTIVITY_PLAYED     = 5004;
	const CREATE_FAILED       = 5005;
	const ALREADY_CREATED     = 5006;
	const CASH_FAILED          = 5007;
	const CASH_SMS_NOT_MATCH  = 5008;
	const NOT_WEIXIN_BROWSER  = 5009;
	const ALREADY_CASHED      = 5010;
	const GET_RANK_FAILED     = 5011;
	const ACTIVITY_OFFLINE    = 5012;
	const PHONE_USED           = 5013;
	const MONEY_EQ_ZERO		 = 5014;

	const NON_NEW_USER = 6002;
	const GET_USER_FAILED = 6003;

	const FOLLOW_FAILED = 7001;
	const NOT_FOLLOWED = 7002;
	const NOT_ENOUGH_COUPON = 7003;
	const NOT_CHINA_MOBILE = 7004;
	const ERR_PHONE_BAND = 7005;
	const ERR_UNION_ID = 7006;
	const HAS_PHONE_BAND = 7007;
	const ERR_PHONE_HAS_BAND = 7008;
	const ERR_PASSWORD_HAS_SET = 7009;
	const ERR_OPEN_INFO_NOTFOUND = 7010;

	const ERR_VERIFY_PASSWORD = 8001;
	const ERR_SET_PASSWORD = 8002;
	const ERR_UPDATE_PASSWORD = 8003;
	const ERR_RECHARGE_DEBIT = 8004;
	const ERR_ORDER_ERROR = 8005;
	/**报名活动**/
	const ORDER_UNPAID = "0501"; //订单未支付
	const ORDER_UNPAID_FAILED = "0502"; //获取未支付订单失败
	const ERR_NAME_EMPTY ='0502';  //姓名为空
	const ERR_ALREADY_SIGNUP = '0503'; //已报名过此项目
	const ERR_NO_MORE_SEAT = '0504'; //名额已满
	const ERR_SIGNUP_FAILED = '0505'; //报名失败
	const ERR_SIGNUP_END = '0506'; //报名已结束
	const ERR_OUT_NUMBER_SEAT = '0507';//超过现有名额
	const ERR_JOIN_FAILED     = '0508';//评论失败
	const ERR_ACT_FAILED      = '0509';//活动已结束
	const ERR_ALREADY_JOIN    = '0510';//已参与过此项目
	const ERR_ACT_NO_START    = '0511';//活动未开始，敬请期待
	const ERR_IDCARD          = '0512';//请输入正确的身份证
	const ACT_SUCCESS         = '0513';//参与成功
	const ACT_ONLY_SHOW       = '0514';//只做展示活动
	const ERR_IDCARD_REPEAT   = '0515';//身份证不可重复
	const ERR_NEED_JOIN		  = '0516';//需要报名

	const ERR_CONTENT_ILLEGAL      = '0517'; //内容非法，不允许发布
	const ERR_COMMENT_OVER_LIMIT   = '0518'; //评论太频繁了
    const ERR_POST_FORBIDDEN       = '0519'; //您已被禁言，请联系管理员
	const ERR_LENGTH_EXCEEDED      = '0521';//内容长度不符合
	const ERR_HAS_COMMENT          = '1520'   ; //已评论
    /** 上传图片 **/
    const UPLOAD_IMAGE_TYPE_ERROR = '0601'; // 上传图片类型错误
	const ERR_UPLOAD_EMPTY = '0602'; // 上传图片不能为空

	public static function getMsg($key='', $data=null){
		$msg = array(
			self::PHONE_ERROR 			=> '手机号码有误',
			self::PASSWORD_LENGH_ERROR	=> '密码长度有误（范围6--20位）',
			self::USERID_ERROR			=> 'userid有误',
			self::USER_PASSWORD_ERROR	=> '用户名或密码有误',
			self::GET_SMS_CODE_ERROR    => '系统繁忙，请稍后获取',
			self::GET_SMS_CODE_LIMIT	=> '一分钟内只能获取一次手机验证码',
			self::GET_SMS_CODE_DAYLIMIT	=> '获取手机验证码次数太频繁',
			self::PASSWORD_NOT_MATCH 	=> '两次密码不一致',
			self::SYSTEM_ERROR			=> '网络繁忙，请稍后重试',
			self::SMS_CODE_NOT_MATCH	=> '手机验证码有误或已过期',
			self::USERNAME_NOT_FOUND	=> '用户不存在或密码错误,请重新输入',
			self::LOGINED				=> '您已登录',
			self::OLD_PASSWORD_ERROR	=> '旧密码不正确',
			self::COURT_ORDERED			=> '场地已出售,请返回刷新重新选择',
			self::PHONE_REGISTER		=> '此手机号码已注册，请返回登录',
            self::COUPON_ERR		    => '代金券已激活或无效',
            self::SMSCODE_ERR		    => '验证码不正确',
            self::SMS_CODE_NOT_EXIT	    => '手机号码和短信验证码不能为空',
            self::REG_ERR		        => $data,
            self::OTHER_ERR		        => $data,
            self::NOT_LOGIN				=>	'请登录',

            self::NMB_KEYWORD_ERR	    => '请输入参赛号码',
            self::NMB_USER_EXIT	        => '参赛选手不存在',
            self::NMB_USER_ACT	        => '参赛选手未激活',
            self::NMB_NUMBER_EXIT	    => '参赛码不存在',
            self::PARAM_ERR	            => '参数不能为空',
            self::NMB_USER_ACTING	    => '参赛选手已激活',
            self::NMB_UPLOAD_AVATAR	    => '头像上传出错',
            self::NMB_AVATAR_LEN	    => '头像上传长度出错',
            self::NMB_COUNT	            => '柠檬数不足',
            self::NMB_SHAREIP_ERR	    => '操作IP有误',
            self::NMB_USER_NOACT	    => '该选手还未参加活动呢！',
		    self::USER_HAD_REGISTER     => '该手机号码已注册',
		    self::UBER_CODE_OVER_LIMIT  => '优惠券已抢完',
		    self::UBER_HAD_JOINED       => '您已参加过此次活动！',
		    self::UPLOAD_ERR            => '上传失败',
		    self::COACH_RECRUIT_EXIST   => '您已提交了申请！',
		    self::COACH_RECRUIT_ERROR   => '申请失败，请稍后重试',
			self::NON_NEW_USER           => '抱歉，该活动仅限新用户参加',
			self::GET_USER_FAILED       =>'获取用户信息失败',
			self::WX_AUTH_FAILED        => '微信未授权或授权失败',
			self::ACTIVITY_NONEXISTS   => '活动不存在',
			self::ACTIVITY_PLAYED       => '已参加过该活动，不能重复参加',
			self::ACTIVITY_END          => '活动已结束',
			self::CASH_FAILED            => '兑奖失败',
			self::CREATE_FAILED		   => '活动创建失败',
			self::ALREADY_CREATED       => '已创建活动，不能重复创建',
			self::CASH_SMS_NOT_MATCH   => '手机验证码有误或已过期',
			self::NOT_WEIXIN_BROWSER   => '请在微信浏览器中打开此页面',
			self::ALREADY_CASHED        => '此活动已兑换过优惠券',
			self::GET_RANK_FAILED       => '获取排名数据失败',
			self::ACTIVITY_OFFLINE      => '活动已下线',
			self::PHONE_USED             => '该手机号已领过优惠券',
			self::MONEY_EQ_ZERO		   => '奖池累计不到20元，无法兑换',
			self::FOLLOW_FAILED       => '关注失败',
			self::NOT_FOLLOWED =>'未关注',
			self::NOT_ENOUGH_COUPON => '优惠券已被领完了',
			self::SUCCESS =>'领取成功',
			self::NOT_CHINA_MOBILE=>'非移动号码，无法参加',
			self::SMSCODE_TIME_LIMIT => '验证码已发送,60秒内无需重复获取',
			self::ERR_PHONE_BAND => '绑定手机失败',
			self::ERR_UNION_ID => '获取微信用户信息失败',
			self::HAS_PHONE_BAND => '该手机号已绑定',
			self::ERR_PHONE_HAS_BAND => '此手机号码己经绑定其他账号',
			self::ERR_PASSWORD_HAS_SET => '操作有误或者已设置了密码',
			self::ERR_OPEN_INFO_NOTFOUND => '缺少外部用户信息',

			self::ERR_VERIFY_PASSWORD => '验证旧支付密码错误',
			self::ERR_SET_PASSWORD => '设置支付密码错误',
			self::ERR_UPDATE_PASSWORD => '更新支付密码错误',
			self::ERR_RECHARGE_DEBIT => '密码错误，充值失败',
			self::ERR_ORDER_ERROR => '订单已过期，自动取消',
			self::ACCESS_DENIED => '请刷新重试',

			self::ORDER_UNPAID=>'未支付的订单',
			self::ORDER_UNPAID_FAILED => '系统错误',

			self::ERR_NAME_EMPTY      => '请输入正确的姓名',
			self::ERR_IDCARD          => '请输入正确的身份证',

			/** 活动 **/
			self::ERR_IDCARD_REPEAT	  => '身份证不可重复',
			self::ERR_ALREADY_SIGNUP  => '已报名过此项目',
			self::ERR_NO_MORE_SEAT    => '名额已满',
			self::ERR_SIGNUP_FAILED   => '报名失败',
			self::ERR_SIGNUP_END      => '报名已结束',
			self::ERR_OUT_NUMBER_SEAT => '超过现有名额',
			self::ERR_JOIN_FAILED     => '评论失败',
			self::ERR_ACT_FAILED      => '活动已结束',
			self::ERR_ALREADY_JOIN    => '您已参与该活动',
			self::ERR_ACT_NO_START    => '活动未开始，敬请期待',
			self::ACT_SUCCESS	      => '参与成功',
			self::ACT_ONLY_SHOW	      => '只做展示活动',
			self::ERR_NEED_JOIN  	  => '需要报名',

			/** 评论 **/
			self::ERR_CONTENT_ILLEGAL => '内容非法，不允许发布',
			self::ERR_COMMENT_OVER_LIMIT => '评论太频繁了',
			self::ERR_POST_FORBIDDEN  => '您已被禁言，请联系管理员',
			self::ERR_LENGTH_EXCEEDED   => '内容长度不符合',
			self::REGISTER_PARAM_ERR	=> '请求参数错误',
			self::ERR_HAS_COMMENT		=> '您已评论',
			/** 附件 **/
			self::UPLOAD_IMAGE_TYPE_ERROR=> '图片类型不合法',
			self::ERR_UPLOAD_EMPTY => '上传图片不能为空',
		);
		if($key){
			return isset($msg[$key]) ? $msg[$key] : '';
		}
		return $msg;
	}

	public static function msg($code='',$data=array()){
		if(isset($data['redirect_url'])) $data['redirect_url'] = baf_CHtml::createUrl($data['redirect_url']);
		if(isset($data['url'])) $data['url'] = baf_CHtml::createUrl($data['url']);

		$msg = self::getMsg(null,$data);
		if($code == '' || !isset($msg[$code]) ){
			$res = array('code'=>'1','msg'=>'操作成功');
		}
		else{
			$res = array('code'=>$code,'msg'=>$msg[$code]);
		}
		if(empty($data)){
		    $data = (object) array();
		}
		$res['data'] = $data;
		return $res;
	}
}
