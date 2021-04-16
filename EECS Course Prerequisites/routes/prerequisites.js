const Course = require('../models/Course');
const axios = require('axios');
const express = require('express');
const router = express.Router();


router.get('/coursesRequired/:faculty/:course_id/', async (req, res) => {
    let full_course_id = `${req.params.faculty} ${req.params.course_id}`;
    try {
        const foundCourse = await Course.findOne({ course_id: full_course_id });

        let foundPrerequisites = foundCourse.prerequisites;


        res.json({
            message: `The following courses are required before taking ${full_course_id}`,
            course_id: full_course_id,
            courses: foundPrerequisites
        });
    } catch (err) {
        res.json({
            error: err.message,
        });
    }

});

router.get('/coursesRequiring/:faculty/:course_id/', async (req, res) => {
    let full_course_id = `${req.params.faculty} ${req.params.course_id}`;

    try {
        const foundCourse = await Course.find();
        let postrequisites = [];
        foundCourse.forEach(courses => {

            if (courses.prerequisites.includes(full_course_id)) {
                postrequisites.push(courses.course_id);
            }

        });

        res.json({
            message: `The following courses require ${full_course_id}`,
            course_id: full_course_id,
            courses: postrequisites
        });
    } catch (err) {
        res.json({
            error: err.message,
        });
    }
});



module.exports = router;