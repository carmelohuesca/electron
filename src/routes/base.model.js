const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Model = mongoose.model('Model', new Schema({
    name: String,
    date_created: { type: Date, default: Date.now },
    id: Schema.ObjectId
}));

module.exports.Model = Model;