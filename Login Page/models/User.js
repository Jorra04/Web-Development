const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    date_joined: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('User', PostSchema);