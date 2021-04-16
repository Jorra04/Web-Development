const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv/config');
const Course = require('./models/Course');
const CourseRouter = require('./routes/courses');


//Middlewares
app.use('/static', express.static('public'));
app.use('/courses',CourseRouter);
app.use(bodyParser.json());

//Get and Post
app.get('/', (req, res) => {
    res.send('We are on the home page');
});


app.get('/courses', async (req,res) => {
    const foundCourse = await Course.find();
    res.json({courses : foundCourse});
});

app.post('/newCourse', async (req,res)=>{
    const course = new Course({
        course_id: req.body.course_id,
        prerequisites: req.body.prerequisites
    });


    try{
        const foundCourse = await Course.findOne({ course_id: req.body.course_id });

        if(!foundCourse){

            const addedCourse = await course.save();
            res.json(addedCourse);


        } else {
            res.json({message : "This course has already been listed."});
        }


        
    } catch (err){
        res.json({message : err.message});
    }
    
});

//Connection to DataBase
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@cluster0.zbbk9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    () => {
        console.log("We are connected!");
});


//Starting to listen on port 3000 (open server connection). 
app.listen(3000);