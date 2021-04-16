const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio')
const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv/config');

const functionToCall = async (course_code, prerequisites) => {

    const course = new Course({
        course_id: course_code,
        prerequisites: prerequisites
    });


    try{
        const foundCourse = await Course.findOne({ course_id: course_code });

        if(!foundCourse){

            const addedCourse = await course.save();
            console.log(addedCourse);


        } else {
            console.log({message : "This course has already been listed."});
        }


        
    } catch (err){
        console.log({message : err.message});
    }
}


const addData = async () => {
    let rawdata = fs.readFileSync('CourseList.json');
    let student = JSON.parse(rawdata);
    student.forEach(element => {
        functionToCall(element.course_code, element.prerequisites);

    });
}


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@cluster0.zbbk9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    () => {
        console.log("We are connected!");
        
});

addData();