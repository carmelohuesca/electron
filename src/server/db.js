const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
const Log = require('./log');
const log = new Log();
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    log.log('————————————————————————————————————————————————————————————————');
    log.setColor('CYAN').log('database connection success!').reset();
    log.log('————————————————————————————————————————————————————————————————');
});
module.exports = db;