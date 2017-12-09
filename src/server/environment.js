require('dotenv')
    .config();
const ENV = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_DB: process.env.MONGO_DB || 'mongodb://localhost:27017/animals',
    POSTGRE_DB: process.env.POSTGRE_DB || 'postgres://username:password@host:port/database',
    PORT: process.env.PORT || 3000,
    SOCKET_PORT: process.env.SOCKET_PORT || 3001,
    API: process.env.API || 'http://localhost',
    PLATFORM_ENV: process.env.PLATFORM_ENV || 'development'
};
module.exports = ENV;