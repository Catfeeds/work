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
     * 获取返回结果中的第一个
     *
     * @param string $sql
     * @param array $bind
     * @return string|boolean
     */
    public function fetchOne($sql, $bind = array())
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
     * @return array|boolean
     */
    public function fetchRow($sql, $bind = array())
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
    public function fetchAssoc($sql, $field = 'id', $bind = array())
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
     * 取多条
     *
     * @param string $sql
     * @param array $bind
     * @return array|boolean
     */
    public function fetchAll($sql, $bind = array())
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
    public function insert($data, $table = null)
    {
        $table = !empty($table) ? $table : $this->_table;

        $fields = array();
        $values = array();
        
        //$pdo = $this->_db->getPdoInstance();       
        foreach ($data as $field => $value) {
            //$value = $pdo->quote($value);
            $fields[] = "`{$field}`";
            $values[] = "'{$value}'";
        }
        $fields=implode(',', $fields);
        $values=implode(',', $values);
        $sql = "INSERT INTO " . $table . " ({$fields}) VALUES({$values})";

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
    
    /**
     * 通过sql插入数据
     *
     * @param string $sql sql语句
     * @param array $bind 需要绑定参数
     * @return int|false  失败返回false，成功返回插入id
     */
    public function insertBySql($sql, $bind = array()) {
        
        $result = $this->query($sql, $bind);

        if (false === $result) {
            return false;
        }

        return $this->_db->lastInsertId();
    }

    /**
     * 更新数据
     *
     * @param array $data
     * @param string $where
     * @param string $table
     * @param boolean $isRowCount 是否判定影响行数
     * @return boolean|int
     */
    public function update($data, $where, $table = null, $isRowCount = false)
    {
        if (empty($where) || empty($data)) {
            return false;
        }

        $table = !empty($table) ? $table : $this->_table;

        $sets = array();
        foreach ($data as $field => $value) {
            $sets[] = "`{$field}` = '{$value}'";
        }
        $sets = implode(',', $sets);
        $sql = "UPDATE " . $table . " SET " . $sets . " WHERE " . $where;

        $result = $this->query($sql);

        if (false === $result) {
            return false;
        }

        $rowCount = $result->rowCount();

        // 如果要返回影响行数，这里返回影响行数，如果不要求影响行数返回true
        return $isRowCount === false ? true : $rowCount;
    }
    
    /**
     * 通过sql更新数据
     * 
     * @param string $sql sql字符串
     * @param array $bind
     * @return false|int 失败返回false,或返回受印象的行数
     */
    public function updateBySql($sql, $bind = array()){
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
     * DB query
     *
     * @param string $sql
     * @param array $bind
     * @return PDOStatement
     */
    protected function query($sql, $bind = array())
    {
        $stmt = $this->_db->prepare($sql);
        $stmt->execute($bind);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $error = $stmt->errorInfo();
       
        if ($error[1] > 0) {
            //$errorInfo = 'SQL执行出错:' . $this->_getOriginalSql($sql) . ' || Exception:' . implode(' ', $error);
            // modify by xiaosibo 2014-07-18
        	$errorInfo = 'SQL执行出错:' . $this->_getOriginalSql($sql, $bind) . ' || Exception:' . implode(' ', $error);
            $this->setErrorMsg($errorInfo);
            baf_Common::log('db_error', 'EMERG', '数据库错误', $errorInfo);            
            //for---log
            return false;
        } 

        return $stmt;
    }

    /**
     * 获取分页
     *
     * @param string $fileds
     * @param string $table
     * @param array  $where
     * @param string $order
     * @param int $page
     * @param int $pageSize
     * @return array
     */
    protected function _getPage($fileds, $table, $where = array(), $order = '', $page = null, $pageSize = null)
    {
        $page = $page > 0 ? $page : 1;
        $pageSize = $pageSize > 0 ? $pageSize : 20;

        $where = implode(' AND ', $where);
        if ($where) {
            $where = "WHERE {$where}";
        }

        if ($order) {
            $order = "ORDER BY {$order}";
        }

        $count = $this->fetchOne("SELECT COUNT(*) AS count FROM {$table} {$where}");

        $sql = "SELECT {$fileds} FROM {$table} {$where} {$order} LIMIT "
             . (($page - 1) * $pageSize) . ',' . $pageSize;

        $datas = $this->fetchAll($sql);

        return array(
            'datas' => $datas,
            'count' => $count,
            'page'  => $page,
            'page_size' => $pageSize,
            'pages' => ceil($count / $pageSize),
        );
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
    protected function _getOriginalSql($sql, $bind = array())
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
    
    public function InitRes($is_object=true)
    {
        $res = (object)array();
        $res->status = baf_ErrorCode::OK;
        $res->msg = "success";
        if ($is_object) {
            $res->data = (object) array();
        } else {
            $res->data = array();
        }
        return $res;
    }
}