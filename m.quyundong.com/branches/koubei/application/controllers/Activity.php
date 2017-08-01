<?php
/**
 * @author: SZJ
 * @datetime: 2015/10/27 17:02
 */
class ActivityController extends DefaultController{
    
    
    public function WxauthAction()
    {
        $code = $this->getParam('code');
        $aid = $this->getParam('aid');
        $type = $this->getParam('type');
        $url = $this->getParam('url');
        if (!$type&&!$url) {
            throw new Exception('404');
        }
        $apiSign = $clientTime = $gzOpenid ='';
        if($type==5){
            $apiSign= $this->getParam('api_sign','');
            $clientTime = $this-> getParam('client_time','');
            $gzOpenid = $this->getParam('gz_open_id','');
        }
        if (getenv('PAY_HOST')) {
            $typeArr = array(
                '1' => 'http://act.qydw.net/Sharecoupon/index/?aid=' . $aid . '&code=' . $code,
                '2' => 'http://act.qydw.net/Like/index?aid=' . $aid . '&code=' . $code,
                '3' => 'http://act.qydw.net/Like/create?code=' . $code,
                '4' => 'htpp://act.qydw.net/?aid=' . $aid . '&code=' . $code,
                '5'=> 'http://act.qydw.net/redpack?client_time='.$clientTime.'&gz_open_id='.$gzOpenid.'&api_sign='.$apiSign.'&code='.$code,
            );
        } else {
            $typeArr = array(
                '1' => 'http://act.quyundong.com/Sharecoupon/index/?aid=' . $aid . '&code=' . $code,
                '2' => 'http://act.quyundong.com/Like/index?aid=' . $aid . '&code=' . $code,
                '3' => 'http://act.quyundong.com/Like/create?code=' . $code,
                '4' => 'htpp://act.quyundong.com/?aid=' . $aid . '&code=' . $code,
                '5'=> 'http://act.quyundong.com/redpack?client_time='.$clientTime.'&gz_open_id='.$gzOpenid.'&api_sign='.$apiSign.'&code='.$code,
            );
        }
        if (isset($typeArr[$type])) {
            $this->redirect($typeArr[$type]);
        }else{
            $url = getenv('PAY_HOST') ? 'http://act.qydw.net/':'http://act.quyundong.com/';
            $url .= $type.'/?aid='.$aid.'&code='.$code;
            $this->redirect($url);
        }
        exit;
    }
    
    /**
     * 微信Tickets加密信息
     *
     * @author chenchao
     */
    public function GetWeixinTokenAction(){
        $url = $this->getParam('url', '');
    
        if (empty($url)){
            $this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
        }
    
        $redis =baf_Redis::factory();
        $ticket = $redis->get('NMBWeixinToken');
        $res = array();
        if (!$ticket){
            $token = baf_Http::httpCurlGet('http://weixin.quyundong.com/message/response/gettoken');
            $token = json_decode($token, true);
            if (isset($token['access_token'])){
                $accessToken = $token['access_token'];
                $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
                $ticket_data = baf_Http::httpCurlGet($url);
                $ticket_data = json_decode($ticket_data, true);
                if (isset($ticket_data['ticket'])){
                    $ticket = $ticket_data['ticket'];
                    $redis->set('NMBWeixinToken', $ticket, 7200);
                }
            }
        }
        //返回信息
        if (!empty($ticket) && $ticket){
            $res['jsapi_ticket'] = $ticket;
            $res['timestamp'] = (string) CURRENT_TIMESTAMP;
            $res['noncestr'] = substr(md5($res['timestamp'].'&qyd'),8,16);
            $res['url'] = $url;
            ksort($res);
            $str = '';
            foreach ($res as $key=>$row){
                $str .= $key.'='.$row.'&';
            }
            $str = substr($str, 0, -1);
            //$str = http_build_query($res);
            $res['sha_sign'] = sha1($str);
            $sign = sha1($str);
            api_CoreHelper::setCookie('sha_sign', $sign, 2*60); //2分钟
            $ip = baf_Base::Clientip();
            $longip = ip2long($ip);
            api_CoreHelper::setCookie('wx_sign', $longip, 2*60); //2分钟
            $this->readJson(array(
                'code' => 1,
                'msg' => 'success',
                'data' => $res
            ));
        } else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
        }
    }
}