const moment = require('moment');
const PACKAGE = require('../../package.json');
const Log = require('./log');
const log = new Log();
const env = require('./environment');

module.exports = () => {
    moment.locale('en');
    log.log('————————————————————————————————————————————————————————————————');
    log.setColor('BLUE').log('API ' + PACKAGE.name.toUpperCase() + ' V' + PACKAGE.version).reset();
    log.setColor('CYAN').log('Environment info. Created ' + moment('01112017', 'DDMMYYYY').fromNow()).reset();
    log.log();
    log.log('NODE_ENV:', Log.COLOR.GREEN, env.NODE_ENV, Log.COLOR.RESET);
    log.log('PORT:', Log.COLOR.GREEN, env.PORT, Log.COLOR.RESET);
    log.log('SOCKET_PORT:', Log.COLOR.GREEN, env.SOCKET_PORT, Log.COLOR.RESET);
    log.log();
    log.setColor('CYAN').log('Nov-2017       ' + Log.COLOR.BLUE +
        '                         Carmelo Huesca Calatayud').reset();
};