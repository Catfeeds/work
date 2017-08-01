<?php
/**
 * EMailer class file.
 *
 * @author MetaYii
 * @version 2.2
 * @link http://www.yiiframework.com/
 * @copyright Copyright &copy; 2009 MetaYii
 *
 * Copyright (C) 2009 MetaYii.
 *
 * 	This program is free software: you can redistribute it and/or modify
 * 	it under the terms of the GNU Lesser General Public License as published by
 * 	the Free Software Foundation, either version 2.1 of the License, or
 * 	(at your option) any later version.
 *
 * 	This program is distributed in the hope that it will be useful,
 * 	but WITHOUT ANY WARRANTY; without even the implied warranty of
 * 	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * 	GNU Lesser General Public License for more details.
 *
 * 	You should have received a copy of the GNU Lesser General Public License
 * 	along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * For third party licenses and copyrights, please see phpmailer/LICENSE
 *
 */

/**
 * Include the the PHPMailer class.
 */
require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'phpmailer'.DIRECTORY_SEPARATOR.'PHPMailerAutoload.php');

require_once APP_PATH.'/conf/define_email.php';

/**
 */
class ext_EMailer
{
    /**
     * smtp方式发送邮件
     * @param $subject
     * @param $body
     * @param array $to
     * @return bool
     * @throws phpmailerException
     */
    public static function send($subject,$body, array $to)
    {
        $mail  = new PHPMailer(); //new一个PHPMailer对象出来
        $mail->CharSet ="utf-8";//设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置，否则乱码
        $mail->IsSMTP(); // 设定使用SMTP服务
        //$mail->SMTPDebug  = 2;                     // 启用SMTP调试功能
        // 1 = errors and messages
        // 2 = messages only
        $mail->SMTPAuth   = true;           // 启用 SMTP 验证功能
        $mail->SMTPSecure = "ssl";          // 安全协议，可以注释掉
        $mail->Host       = STMP_HOST;      // SMTP 服务器
        $mail->Port       = STMP_PORT;      // SMTP服务器的端口号
        $mail->Username   = STMP_USERNAME;  // SMTP服务器用户名
        $mail->Password   = STMP_PASSWORD;            // SMTP服务器密码
        $mail->SetFrom(STMP_USERNAME, STMP_USERNAME);
        if(!empty($to)){
            foreach($to AS $c){
                $mail->AddAddress($c, $c);
            }
        }
        $mail->Subject    = $subject;
        $mail->AltBody    = $body; // optional, comment out and test
        $mail->MsgHTML($body);
        //$mail->AddAttachment("images/phpmailer.gif");      // attachment
        //$mail->AddAttachment("images/phpmailer_mini.gif"); // attachment
        if(!$mail->Send()) {
            $logContent = '发送地址:'.implode(',', $to).';标题:'.$subject.';内容:'.$body.';出错:'.$mail->ErrorInfo;
      		baf_Logger::log2File($logContent, 'send_email_failed');
            return false;
        } else {
            //$logContent = '发送地址:'.implode(',', $to).';标题:'.$subject.';内容:'.$body;
            //baf_Logger::log2File($logContent, 'send_email_success');
            return true;
        }
    }

}
