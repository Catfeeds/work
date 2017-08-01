/**
 * 开发环境配置
 */
module.exports = {
    database: {
        //whale_business_db
        business: {
            //主库
            master: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_business_db',
                port: '3306',
                connectionLimit: 10
            },
            //从库
            slave: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_business_db',
                port: '3306',
                connectionLimit: 10
            }
        },
        //whale_openplat_db
        openplat: {
            //主库
            master: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_openplat_db',
                port: '3306',
                connectionLimit: 10
            },
            //从库
            slave: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_openplat_db',
                port: '3306',
                connectionLimit: 10
            }
        },
        //whale_member_db
        member: {
            //主库
            master: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_member_db',
                port: '3306',
                connectionLimit: 10
            },
            //从库
            slave: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_member_db',
                port: '3306',
                connectionLimit: 10
            }
        },
        //whale_di_db
        di: {
            //主库
            master: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_di_db',
                port: '3306',
                connectionLimit: 10
            },
            //从库
            slave: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_di_db',
                port: '3306',
                connectionLimit: 10
            }
        },
        //whale_order_db
        order: {
            //主库
            master: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_order_db',
                port: '3306',
                connectionLimit: 10
            },
            //从库
            slave: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_order_db',
                port: '3306',
                connectionLimit: 10
            }
        },
        //whale_report_db
        report: {
            //主库
            master: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_report_db',
                port: '3306',
                connectionLimit: 10
            },
            //从库
            slave: {
                server: '121.41.112.116',
                username: 'whales',
                password: 'ds83H9dY9djp',
                database: 'whale_report_db',
                port: '3306',
                connectionLimit: 10
            }
        },

        // 趣运动数据库
        qyd_business: {
            //主库
            master: {
                server: '121.40.159.17',
                username: 'root',
                password: 'qyd123',
                database: 'qyd_business',
                port: '3306',
                connectionLimit: 10
            },
            //从库
            slave: {
                server: '121.40.159.17',
                username: 'root',
                password: 'qyd123',
                database: 'qyd_business',
                port: '3306',
                connectionLimit: 10
            }
        },
        //趣运动 7yundong库
        qyd_7yundong: {
            //主库
            master: {
                server: '121.40.159.17',
                username: 'root',
                password: 'qyd123',
                database: '7yundong',
                port: '3306',
                connectionLimit: 10
            },
            //从库
            slave: {
                server: '121.40.159.17',
                username: 'root',
                password: 'qyd123',
                database: '7yundong',
                port: '3306',
                connectionLimit: 10
            }
        }
    },
    redis: {
        host: '121.40.159.17',
        port: '6379',
        auth: 'qyd@ningmi#'
    },
    apiUrl:{
        api:'http://api.qydw.net/',
        weixin:'http://wechat.api.qydw.net/',
        gz_weixin:'http://weixin.guanzhang.qydw.net/',
        court:'http://court.qydw.net/',
        order:'http://order.api.qydw.net/'
    },
    weixin:{
        wechat_id:'32',  //对应微信管理后台数据库id
        new_wechat_id:'25'  //对应微信管理后台数据库id,新服务号
    }
};