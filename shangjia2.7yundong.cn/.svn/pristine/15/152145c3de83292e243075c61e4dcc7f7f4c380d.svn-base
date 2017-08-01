<?php
/**
 * 数据对象
 *
 * @desc bind模式只适用于查询，并且只支持bindParam模式
 * @author bigticket
 *
 */

abstract class AbstractModel
{
    /**
     * 表名
     *
     * @var string
     */
    protected $_table;

    /**
     * 主键
     *
     * @var string
     */
    protected $_primary;

    /**
     *
     * @var PDO
     */
    private $_db;

    /**
     *
     * @var string
     */
    public $_errorMsg = null;
    
    /**
     * 记录错误
     * 
     * @var bool
     */
    protected $logError = true;
    
    /**
     * 初始化需传入DB对象
     *
     * @param PDO $db
     */
    public function __construct($db)
    {
        if (empty($db) || !($db instanceof PDO)) {
            throw new Exception('Initialize the db error');
        }

        $this->_db = $db;
    }

    /**
     * 获取错误信息
     *
     * @param string $msg
     */
    public function getErrorMsg()
    {
        return $this->_errorMsg;
    }

    /**
     * 设置错误信息
     *
     * @param string $msg
     */
    public function setErrorMsg($msg)
    {
        $this->_errorMsg = $msg;
    }

    /**
     * 获取db对象
     *
     * @return PDO
     */
    public function getDb()
    {
        return $this->_db;
    }
    
    /**
     * 开始事物
     */
    public function beginTransaction()
    {
        $this->_db->beginTransaction();
    }
    
    /**
     * 提交事物
     */
    public function commit()
    {
        $this->_db->commit();
    }
    
    /**
     * 回滚事物
     */
    public function rollBack()
    {
        $this->_db->rollBack();
    }
    
    
    /**
     * 通过主键查找信息
     *
     * @param int $primaryKey
     * @return false|array
     */
    public function find($primaryKey) {
        $sql = "SELECT * FROM {$this->_table} WHERE {$this->_primary}=:primary_key ";
        return $this->fetchRow($sql, array(':primary_key' => $primaryKey));
    }
    
    /**
     * 通过主键查询记录是否存在
     * 
     * @param int $primaryKey
     * @return int
     */
    public function rowIsExist($primaryKey) {
        $sql = "SELECT COUNT(*) FROM {$this->_table} WHERE {$this->_primary}=:primary_key ";
        return $this->fetchOne($sql, array(':primary_key' => $primaryKey));
    }
    
    /**
     * 执行一条sql语句
     * 
     * @param string $sql  sql语句
     * @param array  $bind 绑定参数数组
     * @throws exception_Db
     * @return int 受影响的行数
     */
    public function execute($sql, array $bind = [])
    {
        list($sql, $bind) = $this->bindInAndNotIn($sql, $bind);
        
        $PDOStatement = $this->_db->prepare($sql);
        $PDOStatement->execute($bind);
        
        // 错误信息
        $error = $PDOStatement->errorInfo();

        if ($error[1] > 0) {
            $errorInfo = "SQL错误: error_code:[{$error[1]}] error_msg:[{$error[2]}] error_sql: [".$this->_getOriginalSql($sql, $bind)."]";
            $this->setErrorMsg($errorInfo);
            
            // 记录所有的sql错误
            if ($this->logError) {
                baf_Logger::log2File($errorInfo."\n trace: ".baf_Logger::getBacktraceString(6), 'db_error_execute');
            }

            return false;
        }
 
        return $PDOStatement->rowCount();  
    }

    /**
     * 获取返回结果中的第一个
     *
     * @param string $sql
     * @param array $bind
     * @return string|boolean
     */
    public function fetchOne($sql, array $bind = [])
    {
        $record = $this->fetchRow($sql, $bind);

        if (false === $record) {
            return false;
        }

        return is_array($record) ? array_shift($record) : null;
    }

    /**
     * 取第一条一条数据，组装SQL的时候外面要自己加LIMIT 1
     *
     * @param string $sql
     * @param array $bind
     * @return array|false sql错误或未查询到返回false
     */
    public function fetchRow($sql, array $bind = [])
    {
        $result = $this->query($sql, $bind);

        if (false === $result) {
            return false;
        }

        $record = $result->fetch(PDO::FETCH_ASSOC);
        return $record;
    }

    /**
     * Fetches all SQL result rows as an associative array.
     *
     * @param string $sql
     * @param string $field
     * @param array $bind
     * @return array|boolean
     */
    public function fetchAssoc($sql, $field = 'id', array $bind = [])
    {
        $records = $this->fetchAll($sql, $bind);
        if (false === $records) {
            return false;
        }

        $newArr = array();
        foreach ($records as $record) {
            $newArr[$record[$field]] = $record;
        }

        return $newArr;
    }

    /**
     * 解析绑定where条件中的 in 或 not in
     *
     * 示例:
     *
     * $sql = 'SELECT * FROM gs_order_info WHERE order_id IN (in:order_id) AND pay_id IN (in:pay_id) AND order_id NOT IN (ex:order_id) AND order_status=:order_status';
     * $bind = array('in:order_id' => [48225, 48226, 48227], ':order_status' => 2, 'in:pay_id' => [0, 6], 'ex:order_id' => [123, 456]);
     * baf_Common::dbModel()->fetchAll($sql, $bind);
     *
     *
     * 解析后的sql: SELECT * FROM gs_order_info WHERE order_id IN (:in0,:in1,:in2) AND pay_id IN (:in3,:in4)
     *              AND order_id NOT IN (:ex0,:ex1) AND order_status=:order_status
     *
     * 解析后的bind: array (
     *          ':order_status' => 2,
     *          ':in0' => 48225,
     *          ':in1' => 48226,
     *          ':in2' => 48227,
     *          ':in3' => 0,
     *          ':in4' => 6,
     *          ':ex0' => 123,
     *          ':ex1' => 456
     *         )
     *
     * @param string $sql
     * @param array  $bind
     * @return array
     * @author xiaoyanchun
     */
    public function bindInAndNotIn($sql, array $bind = []) {
        // 解析 in
        list($sql, $bind) = $this->doBindInAndNotIn($sql, $bind, 'in');
    
        // 解析 not in
        return $this->doBindInAndNotIn($sql, $bind, 'ex'); // ex为exclude简写
    }
    
    /**
     * 解析绑定where条件中的 in 或 not in
     *
     * 示例:
     *
     * $sql = 'SELECT * FROM gs_order_info WHERE order_id IN (in:order_id) AND pay_id IN (in:pay_id) AND order_id NOT IN (ex:order_id) AND order_status=:order_status';
     * $bind = array('in:order_id' => [48225, 48226, 48227], ':order_status' => 2, 'in:pay_id' => [0, 6], 'ex:order_id' => [123, 456]);
     * baf_Common::dbModel()->fetchAll($sql, $bind);
     *
     *
     * 解析后的sql: SELECT * FROM gs_order_info WHERE order_id IN (:in0,:in1,:in2) AND pay_id IN (:in3,:in4)
     *              AND order_id NOT IN (:ex0,:ex1) AND order_status=:order_status
     *
     * 解析后的bind: array (
     *          ':order_status' => 2,
     *          ':in0' => 48225,
     *          ':in1' => 48226,
     *          ':in2' => 48227,
     *          ':in3' => 0,
     *          ':in4' => 6,
     *          ':ex0' => 123,
     *          ':ex1' => 456
     *         )
     *
     * @param string $sql
     * @param array  $bind
     * @param string $type  “in”或“ex” in表示IN  ex表示 NOT IN
     * @return array
     * @author xiaoyanchun
     */
    public function doBindInAndNotIn($sql, array $bind = [], $type = 'in') {
        $res = [$sql, $bind];
    
        if (empty($bind)) { // 没有需要绑定的参数
            return $res;
        }
    
        $num = 0;
        $addBind = [];
    
        foreach ($bind as $key => $value) {
            // 例如:  'in:order_id' => [48225, 48226, 48227]
            $pos = strpos(strtolower($key), "{$type}:");
    
            // 是“in:”或“ex:”开头
            if ($pos === 0 && is_array($value) && !empty($value)) {
                $count = count($value);
    
                $tmp = [];
                for ($i = 0; $i < $count; $i++) {
                    $bindKey = ":{$type}{$num}";
                    $addBind[$bindKey] = $value[$i];
                    $tmp[] = $bindKey;
                    $num++;
                }
    
                // 替换sql中in的部分 例如：  order_id IN (in:order_id)  替换 为  order_id IN (:in_0,:in_1,:in_2)
                $sql = str_replace($key, implode(',', $tmp), $sql);
    
                unset($bind[$key]); // 删除原bind数组中的元素
            }
        }
    
        $bind = array_merge($bind, $addBind);
    
        return [$sql, $bind];
    }
    
    /**
     * 取多条
     *
     * @param string $sql
     * @param array $bind
     * @return array|boolean
     */
    public function fetchAll($sql, array $bind = [])
    {
        $result = $this->query($sql, $bind);

        if (false === $result) {
            return false;
        }

        $record = $result->fetchAll(PDO::FETCH_ASSOC);
        return $record;
    }

    /**
     * 插入数据
     *
     * @param array $data
     * @param array $table
     * @return int|bool
     */
    public function insert(array $data, $table = null)
    {
        $table = !empty($table) ? $table : $this->_table;
    
        if (empty($table) || empty($data)) {
            return false;
        }
        
        $fields = array();
        $placeholder = array();
        $bindValues = array();
        
        foreach ($data as $field => $value) {
            $fields[] = "`{$field}`";
            $ph = ":{$field}";
            $placeholder[] = $ph;
            $bindValues[$ph] = $value;
        }
        
        $fields      = implode(',', $fields);
        $placeholder = implode(',', $placeholder);
        
        //准备SQL语句
        $sql = "INSERT INTO `{$table}` ({$fields}) VALUES({$placeholder})";
        
        $rowCount = $this->execute($sql, $bindValues);
        if ($rowCount <= 0) {
            $this->setErrorMsg('INSERT影响行数为:' . $rowCount . ' || SQL:' . $sql);
            return false;
        }
    
        return $this->_db->lastInsertId();
    }
    
    /**
     * 更新数据
     *
     * $where = [
     *      'app_domain=:app_domain ' => 'admin.qydw.net',
     *      'status' => 1,
     *      'add_time < 1466847885'
     *  ];
     *
     * @param array $data
     * @param array $table
     * @return int|bool
     */
    public function update(array $data, array $where, $table = null)
    {
        $table = !empty($table) ? $table : $this->_table;
    
        if (empty($table) || empty($data)) {
            return false;
        }
    
        $bind = [];
       
        $setData = $this->getBindData($data);
        $setStr = implode(',', $setData['placeholder']);
        $bind = array_merge($bind, $setData['bind']);
        
        $whereStr = '';
        
        if (!empty($where)) {
            $whereData = $this->getBindData($where);
            $whereStr = " WHERE ". implode(' AND ', $whereData['placeholder']);
            $bind = array_merge($bind, $whereData['bind']);
        }
        
        //准备SQL语句
        $sql = "UPDATE `{$table}` SET {$setStr} {$whereStr}";
        
        return $this->execute($sql, $bind);
    }
    
    /**
     * 通过sql插入数据
     *
     * @param string $sql sql语句
     * @param array $bind 需要绑定参数
     * @return int|false  失败返回false，成功返回插入id
     */
    public function insertBySql($sql, array $bind = []) {
        
        $result = $this->query($sql, $bind);

        if (false === $result) {
            return false;
        }

        return $this->_db->lastInsertId();
    }
    
    /**
     * 通过sql更新数据
     * 
     * @param string $sql sql字符串
     * @param array $bind
     * @return false|int 失败返回false,或返回受印象的行数
     */
    public function updateBySql($sql, array $bind = []){
        $result = $this->query($sql, $bind);
        
        if (false === $result) {
            return false;
        }
        
        // 返回受影响的行数
        return $result->rowCount();
    }

    /**
     * 删除数据
     *
     * @param string $where
     * @param string $table
     * @return boolean|int
     */
    public function delete($where, $table = null)
    {
        if (empty($where)) {
            return false;
        }

        $table = !empty($table) ? $table : $this->_table;

        $sql = "DELETE FROM " . $table . " WHERE " . $where;

        $result = $this->query($sql);

        if (false === $result) {
            return false;
        }

        $rowCount = $result->rowCount();

        return $rowCount;
    }

    /**
     * 获取绑定的数据
     * 
     * $data = [
     *      'role_name LIKE :role_name' => '%管理员%',
     *      'status' => 1,
     *      'add_time < 1466847885'
     *  ];
     *
     * @param array $data
     * @return array
     */
    protected function getBindData(array $data) {
        $placeholder = [];
        $bind = [];
        foreach ($data as $key => $value) {
            if (is_numeric($key)) { // 直接是条件 例如:  'add_time > 1466847885'
                $placeholder[] = $value;
            } else {
                $key = trim($key);
                if(strpos($key, ':') != false) { // 例如:  'role_name LIKE :role_name' => '%管理员%',
                    $bindKey = substr($key, strpos($key, ':') );
                    $placeholder[] = $key;
                    $bind[$bindKey] = $value;
                } else { // 例如  'status' => 1,
                    $bindKey = ":{$key}";
                    $placeholder[] = "{$key}={$bindKey}";
                    $bind[$bindKey] = $value;
                }
            }
        }
    
        return [
            'placeholder' => $placeholder,
            'bind' => $bind,
        ];
    }
    
    
    /**
     * 查询sql
     * 
     * @param string $sql  sql语句
     * @param array  $bind 绑定参数数组
     * @return PDOStatement
     * @throws exception_Db
     */
    protected function query($sql, array $bind = [])
    {
        // 解析绑定where条件中的in和not in 
        list($sql, $bind) = $this->bindInAndNotIn($sql, $bind);
        
        $stmt = $this->_db->prepare($sql);
        $stmt->execute($bind);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $error = $stmt->errorInfo();

        if ($error[1] > 0) {
        	$errorInfo = "SQL错误: error_code:[{$error[1]}] error_msg:[{$error[2]}] error_sql: [".$this->_getOriginalSql($sql, $bind)."]";
            $this->setErrorMsg($errorInfo);
  
            // 记录所有的sql错误
            if ($this->logError) {
                baf_Logger::log2File($errorInfo."\n trace: ".baf_Logger::getBacktraceString(6), 'db_error_query');
            }
            
            return false;
        }

        return $stmt;
    }

    /**
     * 获取分页
     *
     * 条件示例
     * $whereArr = [
     *      'role_name LIKE :role_name' => '%管理员%',
     *      'status' => 1,
     *      'add_time < 1466847885'
     *  ];
     *
     * @param string $fileds
     * @param array  $where
     * @param string $order
     * @param int $page
     * @param int $pageSize
     * @param string $table
     * @return array
     */
    public function getPage($fileds, array $whereArr = [], $order = '', $page = 1, $pageSize = 15, $table = '')
    {
        $page = (int) $page;
        $pageSize = (int) $pageSize;
        
        if ($page < 1) {
            throw new Exception('page 参数不能小于1');
        }

        if ($pageSize < 1) {
            throw new Exception('pageSize 参数不能小于1');
        }

        $where = '';
        
        $bind = [];
        if (!empty($whereArr)) {  
            $whereData = $this->getBindData($whereArr);
            $where = " WHERE ". implode(' AND ', $whereData['placeholder']);
            $bind = array_merge($bind, $whereData['bind']);
        }

        if ($order) {
            $order = " ORDER BY {$order} ";
        }
        
        if (!$table) {
            $table = $this->_table;
        }

        $count = $this->fetchOne("SELECT COUNT(*) AS count FROM {$table} {$where}", $bind);
        $offset = ($page - 1) * $pageSize;
        $list = [];
        $totalPage = 0;
        
        if ($count > 0) {
            $sql = "SELECT {$fileds} FROM {$table} {$where} {$order} LIMIT {$offset},{$pageSize}";
            $list = $this->fetchAll($sql, $bind);
            $totalPage = ceil($count / $pageSize);
        }
        
        return [
            'list'         => $list,
            'total_item'   => $count,
            'page_size'    => $pageSize,
            'total_page'   => $totalPage,
        ];
    }

    /**
     * 把时间转为整型
     *
     * @param mixed $time
     * @param boolean $addDay
     * @return int
     */
    protected function _time2int($time, $addDay = false)
    {
        $int = 0;
        if (is_int($time) || is_numeric($time)) {
            $int = (int) $time;
        }
        $int = strtotime($time);
        return $addDay ? $int + 86400 : $int;
    }

    /**
     * 获取原始的sql
     *
     * @param string $sql
     * @param array $bind
     * @return string
     */
    protected function _getOriginalSql($sql, array $bind = [])
    {
        if (is_array($bind) && !empty($bind)) {

            $search = array();
            $replace = array();
            foreach ($bind as $field => $value) {
                //$search[] = ':' . $field;  // modify by xiaosibo 2014-07-18
                $search[] = $field;
                if (is_int($value)) {
                	$replace[] = $value;
                } else {
                	$replace[] = "'" . $value . "'";
                }
            }
            $sql = str_replace($search, $replace, $sql);
        }

        return $sql;
    }
    
    /**
     * 把数组转换为in的sql语句
     * 
     * @param array $array
     * @return string
     */
    protected function arrayToIn($ids)
    {
        if (is_array($ids)) {
            $_ids = array();
            foreach ($ids as $k => $v) {
                $v = trim($v);
                if (empty($v)) {
                    continue;
                }
                $_ids[] = "'{$v}'";
            }
            $idsStr = implode(',', $_ids);
        } else {
            $idsStr = "'{$ids}'";
        }

        return $idsStr;
    }

    /**
     * 批量插入
     *
     * @param array $datas
     * @param string|null $table
     * @return boolean|int
     */
    public function multiInsert($datas, $table = null)
    {
        if (empty($datas)) {
            return false;
        }
        
        $table = !empty($table) ? $table : $this->_table;

        $valueGroups = array();
        foreach($datas as $data) {
            
        	$fields = array();
            $values = array();
            foreach ($data as $field => $value) {
                $fields[] = "`$field`";
                $values[] = "'$value'";
            }
            $valueGroups[] = "(" . implode(',', $values) . ")";
        }
        
        $sql = "INSERT INTO " . $table . " (" . implode(',', $fields) . ") VALUES " . implode(',', $valueGroups);
        
        $result = $this->query($sql);
        
        if (false === $result) {
            return false;
        }
        
        $rowCount = $result->rowCount();
        if ($rowCount <= 0) {
            $this->setErrorMsg('INSERT影响行数为:' . $rowCount . ' || SQL:' . $sql);
            return false;
        }
        
        return $this->_db->lastInsertId();
    }
    
}