/**
 * 测试环境配置
 */
module.exports = {
    database: {
        //business
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
        }
    },
    redis: {
        host: '121.40.159.17',
        port: '6379',
        auth: ''
    }
}
