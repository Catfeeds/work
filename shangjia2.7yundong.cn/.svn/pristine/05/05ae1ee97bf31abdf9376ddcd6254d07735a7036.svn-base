<?php
/**
 * 错误代码类
 * 
 * @date 2015-08-30
 */
class baf_ErrorCode
{
    const OK = '0000';  //处理成功

    /*** 关于系统底层错误代码  小于100 ***/
    const ERR_SYTEM = '-1'; //系统错误
    const ERR_PARAM = '-2'; //参数错误
    const ERR_EMPTY_RESULT = '-3'; //请求接口无返回
    const ERR_INVALID_PARAMETER = '-4'; //请求参数错误
    const ERR_CHECK_SIGN = '-5'; //签名验证错误
    const ERR_NO_PARAMETERS = '-6'; //参数缺失

    
    /*** 验证错误提示***/
    const ERR_CHECK_PHONE = 100;
    const ERR_VERIFICATION	= 101;
    		
    const ERR_UNKNOWN = '9999';
    
    
    const ERR_LIMIT_LOGIN = '1001';

    //页面session过期
    const ERR_LOGIN_EXPIRE = '10086'; 
	//管理员不能为空
	const ERR_ADMIN_EMPTY = '201';	
	//发送类型出错
	const ERR_SEND_TYPE_EMPTY = '202';
	
	//结果有冲突
	const ERR_DIF_DATA_CHECK = '300';	

    /**
     * 错误代码与消息的对应数组
     * 
     * @var array
     */
    static $msg = array(
            self::OK         => '处理成功',
            self::ERR_SYTEM => '系统错误',
            self::ERR_PARAM  => '参数错误',
            self::ERR_EMPTY_RESULT => '请求接口无返回',
            self::ERR_INVALID_PARAMETER => '请求参数错误',
            self::ERR_CHECK_SIGN        => '签名错误',
            self::ERR_NO_PARAMETERS => '参数缺失',
    		
    		//错误
    		self::ERR_CHECK_PHONE	=>	'请输入正确的手机',
    		self::ERR_LIMIT_LOGIN   =>  '连续输错三次密码,请5分钟后重试',
    		self::ERR_VERIFICATION	=>	'验证码格式错误',
    		//推广类型
    		self::ERR_ADMIN_EMPTY	=>	'请选择管理员',
			self::ERR_SEND_TYPE_EMPTY	=>	'发送类型出错',
    		
			self::ERR_DIF_DATA_CHECK	=>	'结果有冲突'    		
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