const fs = require('fs');
const readline = require('readline');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = new express();

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var coursePrerequisites = [];
var jsonOBJ = JSON.parse(fs.readFileSync(__dirname + "/buildingJSON.json"));

app.get('/', (req, res) => {
    coursePrerequisites = [];
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    console.log(res);
    var name_to_query = req.body.name_to_query;
    
    FindDependantCourses(name_to_query);
    if(coursePrerequisites.length != 0){
        res.send(coursePrerequisites.join(", "));
    }
    else {
        res.send("No Courses Require this course!");
    }
    
});

const FindDependantCourses = (course_to_search) =>{
    if(!course_to_search.includes("LE/EECS")){
        course_to_search = "LE/EECS " + course_to_search.replace(/\D/g,'');
    }
    // console.log(course_to_search);
    jsonOBJ.forEach(course => {
        course.prerequisites.forEach(tmpCourseID =>{
            if(tmpCourseID === course_to_search){
                coursePrerequisites.push(course.course_code);
            }
        });
    });
};


app.listen(3000);


