<?php
/**
 * 管理员操作日记控制器
 * 
 * @author xiaoyanchun
 * @date 2016-07-11
 */
class AdminlogController extends BaseController
{
    /**
     * 日志记录
     * 
     * @author xiaoyanchun
     */
    public function indexAction() {
        $suppliersId = helper_LoginHelper::getCurrentSuppliersId(); // 商家id
        $search = [];
        $search['cat'] = trim($this->getParam('cat', ''));
        $search['content'] = trim($this->getParam('content', ''));
        $defalut_time = date("Y-m-d", mktime(0,0,0,date("m")-1,date("d"),date("Y")));
        $search['start_date'] = trim($this->getParam('start_date', $defalut_time));  // 开始日期
        $search['end_date']   = trim($this->getParam('end_date', date("Y-m-d", time())));    // 结束日期
        
        $currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码

        if ($search['start_date'] && !helper_CoreHelper::isLawfulDate($search['start_date'])) {
            throw new InvalidArgumentException('开始日期参数有误');
        }
        
        if ($search['end_date'] && !helper_CoreHelper::isLawfulDate($search['end_date'])) {
            throw new InvalidArgumentException('结束日期参数有误');
        }
        
        if ($search['start_date'] && $search['end_date'] && (strtotime($search['start_date']) > strtotime($search['end_date']))) {
            throw new InvalidArgumentException('开始日期不能大于结束日期');
        }
        
        $field = ' category,  action, suppliers_id, user_id, super_user_id, ip, content, add_time ';
        $where = [
            'suppliers_id' => $suppliersId,
        ];
        
        if ($search['cat']) {
            $where['category LIKE :category'] = "%{$search['cat']}%";
        }

        if ($search['content']) {
            $where['content LIKE :content'] = "%{$search['content']}%";
        }
        
        if ($search['start_date']) {
            $where['add_time >= :start_time'] = strtotime($search['start_date']);
        }
        
        if ($search['end_date']) {
            $where['add_time <= :end_time'] = strtotime($search['end_date']) + 86400 - 1;
        }
          
        // 分页获取结算记录
        $pageData = Loader::modelSlave('SuppliersAdminLog')->getPage($field, $where, ' id DESC ', $currentPage);
        
        $page = array(
            'totalPage' => $pageData['total_page'],
            'currentPage' => $currentPage,
            'url' => '/adminlog/index?'.http_build_query(array_filter($search)).'&page='
        );
        
        $this->setTitle('操作日志');
        $this->display('index', [
            'page' => $page,
            'search' => $search,
            'adminlogList' => $pageData['list'],
        ]);
    }
    
}