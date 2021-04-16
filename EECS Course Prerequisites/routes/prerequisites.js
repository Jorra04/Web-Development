const Course = require('../models/Course');
const axios = require('axios');
const express = require('express');
const router = express.Router();


router.get('/:faculty/:course_id/:courses_after', async (req, res) => {
    if (req.params.courses_after == 'true') {
        let full_course_id = `${req.params.faculty} ${req.params.course_id}`;
        const foundCourse = await Course.findOne({ course_id: full_course_id });

        let foundPrerequisites = foundCourse.prerequisites;


        res.json({
            message: `The following courses are required before taking ${full_course_id}`,
            course_id : full_course_id,
            courses : foundPrerequisites
        });
    } else {
        let full_course_id = `${req.params.faculty} ${req.params.course_id}`;

        const foundCourse = await Course.find();
        let postrequisites = [];
        foundCourse.forEach(courses => {
            courses.prerequisites.forEach(course => {
                if(course == full_course_id){
                    postrequisites.push(courses.course_id);
                }
            })
        })


        res.json({
            message: `The following courses require ${full_course_id}`,
            course_id : full_course_id,
            courses : postrequisites
        });
    }
});



module.exports = router;