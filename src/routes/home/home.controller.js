class HomeController {
    static home(req, res, next) {
        res.send('Home works!');
    }
}
module.exports = HomeController;