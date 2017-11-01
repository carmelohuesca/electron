const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const Log = require('./Log');
const log = new Log();
const promise = mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    log.log('================================================================');
    log.setColor('CYAN').log('we are connected!').reset();
    log.log('================================================================');
});
module.exports = db;