const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema ({
    name: {
        type: String
    },
    checked: {
        type: Boolean
    }
});

module.exports = mongoose.model('Task', Task);