const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv/config');
const Course = require('./models/Course');
const CourseRouter = require('./routes/courses');
const PrerequisiteRouter = require('./routes/prerequisites');

//Middlewares
app.use('/static', express.static('public'));
app.use('/courses',CourseRouter);
app.use('/prerequisites',PrerequisiteRouter );
app.use(bodyParser.json());

//Get and Post
app.get('/', (req, res) => {
    res.send('We are on the home page');
});


//Connection to DataBase
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@cluster0.zbbk9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    () => {
        console.log("We are connected!");
});


//Starting to listen on port 3000 (open server connection). 
app.listen(3000);