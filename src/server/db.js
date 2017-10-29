const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('we are connected!');
});
module.exports = db;