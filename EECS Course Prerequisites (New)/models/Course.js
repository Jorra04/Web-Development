const mongoose = require('mongoose');

const  newCourseSchema = mongoose.Schema({
    course_id : {
        type: String,
        required : true
    },

    prerequisites : {
        type : Array,
        required : true
    }
});


module.exports = mongoose.model('Course', newCourseSchema);