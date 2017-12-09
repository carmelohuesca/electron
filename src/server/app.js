const BODY_PARSER = require('body-parser');
const express = require('express');
const PATH = require('path');
const passport = require('passport');
const MORGAN = require('morgan');
const FS = require('fs');
const jwt = require('jsonwebtoken');

const PACKAGE = require('../../package.json');

const env = require('./environment');
const corsFilter = require('./cors');
const ROUTER = require('../routes');
const db = require('./db');
const Log = require('./log');
const cert = FS.readFileSync('public/cert/server.key');

const app = express();
const status = require('./status');
const log = new Log();
require('./socket')(app);

const init = () => {
    // CORS headers
    app.use(corsFilter);

    // PARSER
    app.use(BODY_PARSER.json());
    app.use(BODY_PARSER.urlencoded({ extended: true }));

    // ENVIRONMENT
    if (env.NODE_ENV !== 'production') {
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
    app.listen(env.PORT, status);

    return app;
};

const closeServer = () => {
    app.close();
};

module.exports = { init, app, closeServer };