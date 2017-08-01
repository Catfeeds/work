<?php
include APP_PATH.'/application/vendor/autoload.php';
use Gregwar\Captcha\CaptchaBuilder;

/**
* 验证码
*/
class CaptchaController extends DefaultController
{
    /**
     * 登陆验证码
     */
    public function indexAction() { 
        $builder = new CaptchaBuilder();
        
        $builder->setMaxBehindLines(0); // 去掉背景干扰线
        $builder->setMaxFrontLines(0); // 去掉文字干扰线
        $builder->setBackgroundColor(255,255,255);
        $builder->setTextColor(50,50,50);
        $builder->build($width = 120, $height = 40);
  
        $_SESSION['vf_code'] = $builder->getPhrase();
        
        header('Content-type: image/jpeg');
        $builder->output();
        exit;
    }
}