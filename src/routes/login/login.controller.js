const passport = require('passport');

class LoginController {

    static localLogin() {

        return passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: 'Invalid username or password.',
            successFlash: 'Welcome!'
        });
    }

}
module.exports = LoginController;