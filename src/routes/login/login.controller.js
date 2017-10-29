const passport = require('./local.strategy');
const BaseController = require('../base.controller');

class LoginController {

    static localLogin() {
        return passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: 'Invalid username or password.',
            successFlash: 'Welcome!'
        });
    }

    static me(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            BaseController.excepetion(err, next);
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, (err) => {
                BaseController.excepetion(err, next);
                return res.redirect('/users/' + user.id);
            });
        })(req, res, next);
    }




}
module.exports = LoginController;