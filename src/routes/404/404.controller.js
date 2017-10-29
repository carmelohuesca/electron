class NotFoundController {
    static notFound(req, res, next) {
        res.status(404).send('Resource not found!');
    }
}
module.exports = NotFoundController;