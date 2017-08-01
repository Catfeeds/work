<?php

/**
 * 错误代码管理
 * demo : ErrorCode::ERR_SYTEM
 */
class baf_ErrorCode
{
    const OK = '0000';  //处理成功

    /*** 关于系统底层错误代码  小于100 ***/
    const ERR_SYTEM = -1; //系统错误
    const ERR_PARAM = -2; //参数错误
    const ERR_EMPTY_RESULT = -3; //请求接口无返回
    const ERR_INVALID_PARAMETER = -4; //请求参数错误
    const ERR_CHECK_SIGN = -5; //签名验证错误
    const ERR_NO_PARAMETERS = -6; //参数缺失
    const ERR_SERVICE_NOT_FOUND = -7; //方法未找到
    const ERR_VER_NOTEXISTS = -8; //版本号错误
    const ERR_DB_ERROR = -9; //数据库操作错误
    const ERR_UPLOAD = -10; //上传失败
    const ERR_NOT_LOGIN = -11; //没有登录
    const ERR_NOT_SERVICENAME = -12; //没有服务别名
    const ERR_SYTEM_BUSY = -13; //系统繁忙
    
    const ERR_OTHER = 9001; // 其他错误
    const ERR_UNKNOWN = 9002; // 未知错误
    
    /***********会员业务**********************/
    const USER_EXT_ERR       = '0201'; //会员不存在
    const USER_OPENTYPE_ERR  = '0202'; //联合登录类型错误
    const USER_OPENCHECK_ERR = '0203'; //验证联登失败
    const USER_GETINFO_ERR   = '0204'; //获取会员信息失败
    const USER_ADD_ERR       = '0205'; //会员注册失败
    const PHONE_TYPE_ERR     = '0206'; //手机号码出错
    const PHONE_EXT_ERR      = '0207'; //手机号码已存在
    const USER_PWD_ERR       = '0208'; //密码格式出错
    const USER_UPD_ERR       = '0211'; //更新个人资料出错
    const USER_OLDPWD_ERR    = '0209'; //旧密码错误
    const USER_UPDPWD_ERR    = '0210'; //更新密码错误
    const USER_BIND_ERR      = '0212'; //邦定出错
    const USER_CHECKLOGIN_ERR = '0213'; //参数验证错误
    const USER_SET_ERR        = '0214'; //重复设置密码

    const USER_CHECKDEPOSIT_ERR  = '0219'; //验证出错
    const USER_NOREGISTER_ERR    = '0220'; //用户短信验证码登录
    const TOOMUCH_ERR            = '0221'; //太多短信验证码
    const SMSCODE_ERR            = '0222'; //验证码错误
    const QUCK_USER_ERR          = '0223'; //快捷登录用户
    const MONCARD_UPLOADED       = '1425'; //您已上了头像
    const MONCARD_UPLOAD_EMPTY   = '1426'; //请上传头像
    const COACH_UPLOAD_CONUT     = '1427'; //相册数量超出
    const UNBIND_FAILED          = '1501'; //解除绑定失败
    /***********会员业务**********************/
    

    /*** 教练  ***/ 
    const SET_SERVICE_AREA_FAILED = '0300';      // 设置服务区域失败
    const SET_BESPEAK_TIME_FAILED = '0301';      // 设置预约时间失败
    const SET_EXERCISE_CATEGORY_FAILED = '0302'; // 设置项目和价格失败
    const SET_BANK_ACCOUNT_FAILED = '0303';      // 设置收款账号失败
    const SET_COACH_BASE_INFO = '0304';          // 设置教练的基本信息失败
    const SET_CARD_NO_ERROR = '0305';            // 身份证号码错误
    const DEL_CATEGORY_FAILED = '0306';          // 删除项目分类失败
    const INVALID_INVITE_CODE = '0307';          // 无效的邀请码
    const SUBMIT_INVITE_CODE_FAILED = '0308';    // 提交邀请码失败
    const DEL_BANK_ACCOUNT_FAILED = '0309';      // 删除收款账号失败
    const SET_POSITION_FAILED = '0310';          // 设置经纬度失败
    const COACH_MAX_CATEGORY_NUM = '0311';       // 最多只能添加3个项目
    const EXIST_CARD_NO_ERROR = '0312';            // 身份证号码已存在
    const NO_UPLOAD_CARD_ERROR = '0313';            // 没有上传身份证照片

    
    /*** 订单提现  ***/
    const CASH_ERROR = '0400';      // 提现申请失败
    const CASH_BALANCE_ERROR = '0401';      // 账户余额异常
    const BANK_ERROR = '0410';      // 银行信息错误

    /**
     * 错误代码与消息的对应数组
     * 
     * @var array
     */
    static $msg = array(
            self::OK         => '处理成功',
            self::ERR_SYTEM => '系统错误',
            self::ERR_PARAM  => '参数错误',
            self::ERR_SERVICE_NOT_FOUND  => '方法错误',
            self::ERR_CHECK_SIGN        => '签名错误',
            self::ERR_INVALID_PARAMETER => '请求参数错误',
            self::ERR_EMPTY_RESULT => '请求接口无返回',        
        
            self::ERR_NO_PARAMETERS => '参数缺失',
            self::ERR_SERVICE_NOT_FOUND  => '方法未找到',
            self::ERR_VER_NOTEXISTS  => '版本号错误',
            self::ERR_DB_ERROR  => '数据库操作错误',
            self::ERR_UPLOAD  => '上传失败',
            self::ERR_NOT_LOGIN  => '没有登录',
            self::ERR_NOT_SERVICENAME  => '没有服务别名',
           
            self::USER_EXT_ERR       => '会员不存在',
            self::USER_OPENTYPE_ERR   => '联合登录类型错误',
            self::USER_OPENCHECK_ERR  => '验证联登失败',
            
            self::ERR_UNKNOWN => '未知错误',
            
            
            self::SET_SERVICE_AREA_FAILED => '设置服务区域失败',
            self::SET_BESPEAK_TIME_FAILED => '设置预约时间失败',
            self::SET_EXERCISE_CATEGORY_FAILED => '设置项目和价格失败',
            self::SET_BANK_ACCOUNT_FAILED => '设置收款账号失败',
            self::SET_COACH_BASE_INFO => '设置基本信息失败',
            self::SET_CARD_NO_ERROR => '身份证号码错误',
            self::DEL_CATEGORY_FAILED => '删除项目失败',
            self::INVALID_INVITE_CODE => '无效的邀请码',
            self::SUBMIT_INVITE_CODE_FAILED => '提交邀请码失败',
            self::DEL_BANK_ACCOUNT_FAILED => '删除收款账号失败',
            self::SET_POSITION_FAILED => '设置经纬度失败',
            self::COACH_MAX_CATEGORY_NUM => '最多只能添加3个项目',
            self::EXIST_CARD_NO_ERROR => '该身份证号已被使用，请勿重复提交',
            self::NO_UPLOAD_CARD_ERROR => '没有上传身份证照片',
   		self::UNBIND_FAILED => '解除绑定失败',
            self::USER_PWD_ERR => '密码格式出错',
    );
    
    /**
     * 返回错误代码的描述信息
     * 
     * @param int    $code        错误代码
     * @param string $otherErrMsg 其他错误时的错误描述
     * @return string 错误代码的描述信息
     */
    public static function msg($code, $otherErrMsg = '')
    {
        if ($code == self::ERR_UNKNOWN) {
            return $otherErrMsg;
        }
        
        if (isset(self::$msg[$code])) {
            return self::$msg[$code];
        }
        
        return $otherErrMsg;
    }
    
}