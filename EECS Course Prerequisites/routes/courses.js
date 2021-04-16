const Course = require('../models/Course');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const allCourses = await Course.find();
    res.json({ courses: allCourses });
});


router.get('/:faculty/:course_id', async (req, res) => {
    let course_id = `${req.params.faculty} ${req.params.course_id}`;

    try {
        const foundCourse = await Course.findOne({ course_id: course_id });
        res.json({ message: foundCourse });
    } catch (err) {
        res.json({ error: err.message });
    }
});


router.post('/newCourse', async (req, res) => {
    const course = new Course({
        course_id: req.body.course_id,
        prerequisites: req.body.prerequisites
    });


    try {
        const foundCourse = await Course.findOne({ course_id: req.body.course_id });

        if (!foundCourse) {

            const addedCourse = await course.save();
            res.json(addedCourse);


        } else {
            res.json({ message: "This course has already been listed." });
        }



    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = router;