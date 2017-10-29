const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Users = mongoose.model('Users', new Schema({
    email: String,
    name: String,
    profile: Object,
    date_created: { type: Date, default: Date.now },
    id: Schema.ObjectId
}));

if (Users.length === 0) {
    new Users({
        name: 'Carmelo Huesca',
        email: 'carmelohuesca@gmail.com'
    }).save();
}

module.exports.Posts = mongoose.model('Posts', new Schema({
    date: { type: Date, default: Date.now },
    author: { type: String, default: 'Anon' },
    text: String,
    id: Schema.ObjectId
}));

module.exports.Users = Users;