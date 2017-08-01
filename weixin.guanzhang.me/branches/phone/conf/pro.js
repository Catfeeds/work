/**
 * 生产环境配置
 */
module.exports = {
    database: {
        //whale_business_db
        business: {
            //主库
            master: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_business_db',
                port: '3306',
                connectionLimit: 100
            },
            //从库
            slave: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_business_db',
                port: '3306',
                connectionLimit: 100
            }
        },
        //whale_openplat_db
        openplat: {
            //主库
            master: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_openplat_db',
                port: '3306',
                connectionLimit: 100
            },
            //从库
            slave: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_openplat_db',
                port: '3306',
                connectionLimit: 100
            }
        },
        //whale_member_db
        member: {
            //主库
            master: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_member_db',
                port: '3306',
                connectionLimit: 100
            },
            //从库
            slave: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_member_db',
                port: '3306',
                connectionLimit: 100
            }
        },
        //whale_di_db
        di: {
            //主库
            master: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_di_db',
                port: '3306',
                connectionLimit: 100
            },
            //从库
            slave: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_di_db',
                port: '3306',
                connectionLimit: 100
            }
        },
        //whale_order_db
        order: {
            //主库
            master: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_order_db',
                port: '3306',
                connectionLimit: 100
            },
            //从库
            slave: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_order_db',
                port: '3306',
                connectionLimit: 100
            }
        },
        //whale_report_db
        report: {
            //主库
            master: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_report_db',
                port: '3306',
                connectionLimit: 100
            },
            //从库
            slave: {
                server: '120.26.126.2',
                username: 'whales',
                password: 'qyd2015Smos',
                database: 'whale_report_db',
                port: '3306',
                connectionLimit: 100
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
                connectionLimit: 100
            },
            //从库
            slave: {
                server: '121.40.159.17',
                username: 'root',
                password: 'qyd123',
                database: 'qyd_business',
                port: '3306',
                connectionLimit: 100
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
                connectionLimit: 100
            },
            //从库
            slave: {
                server: '121.40.159.17',
                username: 'root',
                password: 'qyd123',
                database: '7yundong',
                port: '3306',
                connectionLimit: 100
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
        court:'http://court.qydw.net/'
    },
    weixin:{
        wechat_id:'25'  //对应微信管理后台数据库id
    }
};