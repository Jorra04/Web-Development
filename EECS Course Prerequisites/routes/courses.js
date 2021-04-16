const Course = require('../models/Course');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', (req,res)=>{
    res.json({message : "Router to Courses was successful."});
});


router.get('/:faculty:course_id', async (req,res) => {
    // const foundCourse = await Course.findOne({course_id : req.params.course_id});
    // res.json({courses : foundCourse});

    res.json({
        faculty :req.params.faculty ,
        course_id : req.params.course_id

    });
});

module.exports = router

