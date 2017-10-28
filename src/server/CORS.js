class CORS {
    static INIT(req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    }
}
module.exports = CORS;