var db = require('../models/db');

var openplat = {};

/**
 * 取开发者账号
 * @param  {[type]}   where    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
openplat.getApplication = function (where, callback) {
    var conn = db.getAdapter('openplat');
    conn.where(where)
        .get('td_applications', function (err, results, fields) {
            conn.disconnect();//释放
            callback(err, results);
            var data = null;
            if (results && results.length > 0) {
                data = results[0];
            } else {
                err = 'can not find in td_applications';
            }

        });
};


//导出
module.exports = openplat;