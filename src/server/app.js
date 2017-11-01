require('dotenv').config();
const BODY_PARSER = require('body-parser');
const express = require('express');
const PATH = require('path');
const MORGAN = require('morgan');
const CONFIG = require('./config');
const CORS = require('./CORS');
const ROUTER = require('../routes');
const app = express();
const FS = require('fs');
const passport = require('passport');
const db = require('./db');
const jwt = require('jsonwebtoken');
const cert = FS.readFileSync('public/cert/server.key');
const Log = require('./Log');
const log = new Log();

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
        log.log('================================================================');
        log.setColor('WHITE').log('ENVIRONMENT INFO').reset();
        log.log('================================================================');
        log.log('NODE_ENV:', Log.COLOR.GREEN, CONFIG.NODE_ENV, Log.COLOR.RESET);
        log.log('PORT:', Log.COLOR.GREEN, CONFIG.PORT, Log.COLOR.RESET);
        log.log('================================================================');
        log.setColor('CYAN').log('Carmelo Huesca Calatayud').reset();
    });
    return app;
};

const closeServer = () => {
    app.close();
};

module.exports = { init, app, closeServer };