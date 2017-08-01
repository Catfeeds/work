var config = require('../conf/config').database;
var mysqlRecord = require('mysql-activerecord');

var db= {};
var dbcache = {};
var poolcache = {};

db.getPool = function (){
    var dbname = arguments[0] || 'business';
    var server = arguments[1] || 'master';
    var key = dbname + server;
    return poolcache[key] || (poolcache[key]= new Pool(dbname,server,config[dbname][server]));
};


/**
 * 取数据库连接
 */
db.getAdapter = function (dbname,server) {
    dbname = dbname || 'business';
    server = server || 'master';
    var key = dbname + server;
    return new mysqlRecord.Adapter(config[dbname][server]);
};

//改写mysql-activerecord支持多数据库pool
var mysqlPool = {};
var mysqlCharset = {};
var Pool = function (dbname,server,settings) {
    var pool_key = dbname + server;
    if (!mysqlPool[pool_key]) {
        var mysql = require('mysql');

        var poolOption = {
            createConnection: settings.createConnection,
            waitForConnections: settings.waitForConnections,
            connectionLimit: settings.connectionLimit,
            queueLimit: settings.queueLimit
        };
        Object.keys(poolOption).forEach(function (element) {
            // Avoid pool option being used by mysql connection.
            delete settings[element];
            // Also remove undefined elements from poolOption
            if (!poolOption[element]) {
                delete poolOption[element];
            }
        });

        // Confirm settings with Adapter.
        var db = new mysqlRecord.Adapter(settings);
        var connectionSettings = db.connectionSettings();

        Object.keys(connectionSettings).forEach(function (element) {
            poolOption[element] = connectionSettings[element];
        });

        mysqlPool[pool_key] = mysql.createPool(poolOption);
        mysqlCharset[pool_key] = settings.charset;
    }

    this.pool = function () {
        return mysqlPool[pool_key];
    };

    this.getNewAdapter = function (responseCallback) {
        mysqlPool[pool_key].getConnection(function (err, connection) {
            if (err) {
                throw err;
            }
            var adapter = new mysqlRecord.Adapter({
                pool: {
                    pool: mysqlPool[pool_key],
                    enabled: true,
                    connection: connection
                },
                charset: mysqlCharset[pool_key]
            });
            responseCallback(adapter);
            connection.release();
        });
    };

    this.disconnect = function (responseCallback) {
        this.pool().end(responseCallback);
    };

    return this;
};


module.exports = db;