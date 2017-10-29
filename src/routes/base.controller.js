class BaseController {

    static excepetion(err, next) {
        if (err) { return next(err); }
    }

}
module.exports = BaseController;