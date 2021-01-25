const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    date : {
        type : Date,
        default : Date.now
    }
});


//give the database the name and the schema it should use.

module.exports = mongoose.model('Posts', PostSchema);