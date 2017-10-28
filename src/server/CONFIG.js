const CONFIG = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_DB: process.env.MONGO_DB || 'mongodb://localhost:27017/animals',
    POSTGRE_DB: process.env.POSTGRE_DB || 'postgres://username:password@host:port/database'
};

module.exports = CONFIG;