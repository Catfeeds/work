<?php
class CashController extends UserBaseController
{
    /**
     * 首页
     */
  public function indexAction()
  {
    //调用获取页面标题、关键字和介绍
    $utm_sources = 'cash';
    try {
        $cashInfo = api_Account::cashInfo(array('user_id'=>$this->uid));
    } catch (Exception $e) {
        $cashInfo = array();
        baf_Common::exceptionLog($e, __CLASS__, 'index');
    }
    $this->setPageTitle(array('utm_source'=>$utm_sources));
    $this->_view->assign(array(
        'cashInfo'    => $cashInfo
    ));
  }

  // 提现
  public function takemoneyAction()
  {
    
    //调用获取页面标题、关键字和介绍
    $utm_sources = 'takemoney';
    try {
        $cashInfo = api_Account::cashInfo(array('user_id'=>$this->uid));
        $bankList = api_Account::bankList();
    } catch (Exception $e) {
        $bankList = array();
        baf_Common::exceptionLog($e, __CLASS__, 'takemoney');
    }    
    $this->setPageTitle(array('utm_source'=>$utm_sources));
    $this->_view->assign(array(
        'bankList'    => $bankList,
        'cashInfo' => $cashInfo
    ));
  }

  // 查看余额
  public function recordAction()
  {
    
    //调用获取页面标题、关键字和介绍
    $utm_sources = 'record';
        
    $this->setPageTitle(array('utm_source'=>$utm_sources));

  }

  /**
   * 提现变动记录接口
   */
  public function cashRecordAction(){
      try {
          $page = intval($this->getParam('page'));
          $res = api_Account::cashRecord(array('user_id'=>$this->uid, 'page'=>$page));
          if(!empty($res['data']['lists'])){
            foreach ($res['data']['lists'] as $key => $value) {
                $res['data']['lists'][$key]['add_time_str'] = !empty($value['add_time']) ? date('Y年m月d日 H:i', $value['add_time']) : '';
            }
          }
      } catch (Exception $e) {
          $res = baf_Common::initRes();
          $res->status = $e->getCode();
          $res->msg = $e->getMessage();
          baf_Common::exceptionLog($e, __CLASS__, 'cashRecord');
      }
      echo json_encode($res);
      return false;
  }

  /**
   * 银行卡列表接口
   */
  public function bankCardListAction(){
      try {
          $res = api_Account::bankCardList(array('user_id'=>$this->uid));
      } catch (Exception $e) {
          $res = baf_Common::initRes();
          $res->status = $e->getCode();
          $res->msg = $e->getMessage();
          baf_Common::exceptionLog($e, __CLASS__, 'bankCardList');
      }
      echo json_encode($res);
      return false;
  }  

  /**
   * 编辑银行卡接口
   * @param bank_card_id 银行卡id
   * @param bank_id 银行id
   * @param card_number 卡号
   * @param card_holder 持卡人
   * @param bank_branch 支行名称
   * @param bank_address 地址
   */
  public function editBankCardAction(){
      try {
          if($this->getRequest()->isPost()){
              $param = array(
                    'user_id' => $this->uid,
                    'bank_card_id' => intval($this->getParam('bank_card_id')),
                    'card_number' => trim($this->getParam('card_number')),
                    'card_holder' => trim($this->getParam('card_holder')),
                    'bank_id' => intval($this->getParam('bank_id')),
                    'bank_branch' => trim($this->getParam('bank_branch')),
                    'bank_address' => trim($this->getParam('bank_address'))
                );
              $res = api_Account::editBankCard($param);  
          }else{
              throw new Exception("非法请求", 1004);
          }
      } catch (Exception $e) {
          $res = baf_Common::initRes();
          $res->status = $e->getCode();
          $res->msg = $e->getMessage();
          baf_Common::exceptionLog($e, __CLASS__, 'editBankCard');
      }
      echo json_encode($res);
      return false;
  }

  /**
   * 添加银行卡接口
   * @param bank_id 银行id
   * @param card_number 卡号
   * @param card_holder 持卡人
   * @param bank_branch 支行名称
   * @param bank_address 地址
   */
  public function addBankCardAction(){
      try {
          if($this->getRequest()->isPost()){
              $param = array(
                    'user_id' => $this->uid,
                    'card_number' => trim($this->getParam('card_number')),
                    'card_holder' => trim($this->getParam('card_holder')),
                    'bank_id' => intval($this->getParam('bank_id')),
                    'bank_branch' => trim($this->getParam('bank_branch')),
                    'bank_address' => trim($this->getParam('bank_address'))
                );
              $res = api_Account::addBankCard($param);  
          }else{
              throw new Exception("非法请求", 1004);
          }
      } catch (Exception $e) {
          $res = baf_Common::initRes();
          $res->status = $e->getCode();
          $res->msg = $e->getMessage();
          baf_Common::exceptionLog($e, __CLASS__, 'addBankCard');
      }
      echo json_encode($res);
      return false;
  }

  /**
   * 删除银行卡接口
   */
  public function deleteBankCardAction(){
      try {
          $bankCardId = intval($this->getParam('bank_card_id'));
          $res = api_Account::deleteBankCard(array('bank_card_id'=>$bankCardId,'user_id'=>$this->uid));
      } catch (Exception $e) {
          $res = baf_Common::initRes();
          $res->status = $e->getCode();
          $res->msg = $e->getMessage();
          baf_Common::exceptionLog($e, __CLASS__, 'addBankCard');
      }
      echo json_encode($res);
      return false;
  }

  /**
   * 提现接口
   */
  public function withDrawCashAction(){
      try {
          if($this->getRequest()->isPost()){
              $param = array(
                    'user_id' => $this->uid,
                    'bank_card_id' => intval($this->getParam('bank_card_id')),
                    'type' => intval($this->getParam('type'))
                );
              $res = api_Account::withdrawCash($param);  
          }else{
              throw new Exception("非法请求", 1004);
          }
      } catch (Exception $e) {
          $res = baf_Common::initRes();
          $res->status = $e->getCode();
          $res->msg = $e->getMessage();
          baf_Common::exceptionLog($e, __CLASS__, 'withdrawCash');
      }
      echo json_encode($res);
      return false;
  }
}
