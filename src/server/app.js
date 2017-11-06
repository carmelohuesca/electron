require('dotenv').config();
const PACKAGE = require('../../package.json');
const BODY_PARSER = require('body-parser');
const express = require('express');
const PATH = require('path');
const MORGAN = require('morgan');
const CONFIG = require('./config');
const CORS = require('./CORS');
const ROUTER = require('../routes');
const app = express();
const server = require('http').Server(app, {
    origins: 'http://localhost:4200',
    path: '/broadcast',
    pingInterval: 60000
});
const io = require('socket.io')(server);
const FS = require('fs');
const passport = require('passport');
const db = require('./db');
const jwt = require('jsonwebtoken');
const cert = FS.readFileSync('public/cert/server.key');
const Log = require('./Log');
const log = new Log();
const moment = require('moment');

const init = () => {
    // CORS headers
    app.use(CORS);

    // PARSER
    app.use(BODY_PARSER.json());
    app.use(BODY_PARSER.urlencoded({ extended: true }));

    // ENVIRONMENT
    if (CONFIG.NODE_ENV !== 'production') {
        app.use(MORGAN('common', {
            stream: FS.createWriteStream('./LOGS.log', { flags: 'a' })
        }));
        app.use(MORGAN('dev'));
    }

    // STATIC SERVER
    app.use(express.static('public'));

    const token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' });

    //  PASSPORT SETTINGS
    app.use(passport.initialize());
    app.use(passport.session());

    // ROUTER
    app.use(ROUTER);

    // LISTENER
    app.listen(CONFIG.PORT, () => {
        moment.locale('en');
        log.log('================================================================');
        log.setColor('BLUE').log('API ' + PACKAGE.name.toUpperCase() + ' V' + PACKAGE.version).reset();
        log.setColor('CYAN').log('Environment info. Created ' + moment('01112017', 'DDMMYYYY').fromNow()).reset();
        log.log();
        log.log('NODE_ENV:', Log.COLOR.GREEN, CONFIG.NODE_ENV, Log.COLOR.RESET);
        log.log('PORT:', Log.COLOR.GREEN, CONFIG.PORT, Log.COLOR.RESET);
        log.log();
        log.setColor('CYAN').log('Nov-2017       ' + Log.COLOR.BLUE +
            '                         Carmelo Huesca Calatayud').reset();
        // log.log('================================================================');
    });

    // SOCKET
    let usersOnline = 0;
    io.on('connection', (socket) => {
        usersOnline++;
        socket.on('disconnect', () => {
            usersOnline--;
        });
    });
    // setInterval(() => io.emit('time', new Date().toGMTString()), 1000);
    setInterval(() => io.emit('users', usersOnline.toString()), 1000);

    return app;
};

const closeServer = () => {
    app.close();
};

module.exports = { init, app, closeServer };