require('dotenv').config();
const BODY_PARSER = require('body-parser');
const express = require('express');
const PATH = require('path');
const MORGAN = require('morgan');
const FS = require('fs');
const CONFIG = require('./config');
const CORS = require('./CORS');
const ROUTER = require('../routes');
const app = express();
const passport = require('passport');
const db = require('./db');

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

    //  PASSPORT SETTINGS
    app.use(passport.initialize());
    app.use(passport.session());

    // ROUTER
    app.use(ROUTER);

    // LISTENER
    app.listen(CONFIG.PORT, () => {
        console.log('================================================================');
        console.log('ENVIRONMENT INFO');
        console.log('================================================================');
        console.log('NODE_ENV: ' + CONFIG.NODE_ENV);
        console.log('PORT: ' + CONFIG.PORT);
        console.log('================================================================');
    });
    return app;
};

const closeServer = () => {
    app.close();
};

module.exports = { init, app, closeServer };