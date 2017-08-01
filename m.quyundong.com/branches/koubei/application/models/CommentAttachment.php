<?php
/**
 * 评论附件
 */
class CommentAttachmentModel extends AbstractModel
{
    protected $_table = 'gs_common_comment_attachment';
    protected $_primary = 'id';

    public function addAttachment($param)
    {
        return $this->multiInsert($param);
    }

    public function getAttaList($comment_ids)
    {
        if(empty($comment_ids)) return false;
        $sql     = "SELECT cc.* FROM ".$this->_table." AS cc WHERE comment_id in ($comment_ids) ORDER BY comment_id DESC";

        return $this->fetchALL($sql);
    }
}
