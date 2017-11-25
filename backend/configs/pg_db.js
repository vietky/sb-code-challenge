let config = {}

switch (process.env.NODE_ENV) {
    case 'production':
        config = {
            host: '172.18.0.17',
            database: 'shop_back',
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || ''
        }
        break;
    default:
        config = {
            host: '127.0.0.1',
            database: 'shop_back',
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || ''
        }
}

module.exports = config