const mongoose = require('mongoose');
const promise = mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('we are connected!');
});

module.exports = db;