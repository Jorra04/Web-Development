const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio')

let FACULTY = 'LE';
let SUBJECT = 'EECS';
let STUDY_SESSION = 'FW';
const link = `https://w2prod.sis.yorku.ca/Apps/WebObjects/cdm.woa/wa/crsq1?faculty=${FACULTY}&subject=${SUBJECT}&studysession=${STUDY_SESSION}`
const YEAR = '2020-2021'

//delete the text file before hand.
fs.unlink(`${__dirname}/res.txt`, (err) => {
    if (err) {
        console.log(err.message);
    }
});

const getCourses = async () => {
    await axios.get(link)
        .then((res) => {
            const $ = cheerio.load(res.data);
            let links = $('a');

            $(links).each(async (i, link) => {

                if ($(link).text() === `Fall/Winter ${YEAR} Course Schedule`) {

                    await axios.get(`https://w2prod.sis.yorku.ca${$(link).attr('href')}`)
                        .then((res) => {
                            const $ = cheerio.load(res.data);
                            const boldThing = $('.bold')

                            const courseName = $('.heading').next('h1').text();

                            boldThing.each((i, foundText) => {
                                if ($(foundText).text() === 'Course Description:') {

                                    let description = $(foundText).next().text();
                                    // let writeFileContent = `Course Name: ${courseName}\n\nDescription: ${description}\n\n\n\n`;
                                    let writeFileContent = `Course Name: ${courseName}\n\n`

                                    fs.writeFile(`${__dirname}/res.txt`, writeFileContent, { flag: "a" }, (err, data) => {
                                        if (err) {
                                            console.log(err.message);
                                        }
                                    });
                                }
                            })

                        })
                        .catch(err => {
                            console.log(err.message);
                        })
                }
            });
        })
        .catch(err => {
            console.log(err.message);
        });
};


let someData = 'An introduction to research directions within the department and more broadly within the field. Students will attend lectures and other events organised by the department. Note: This course is expected to be completed in the first-year of study.'

const parsePrerequisites = (data) => {
    if(data.indexOf("Prerequisites") === -1) {
        console.log("This course has no prerequisites.");
    }
    else if (data.indexOf("Prerequisites") != -1 && data.indexOf("Previously offered as") != -1) {
        data = data.substring(data.indexOf("Prerequisites"), data.indexOf("Previously offered as"));
        console.log(data);
    }

}


parsePrerequisites(someData);

// getCourses();


let functionToCall = (course_code, prerequisites ) => {
    
}

let rawdata = fs.readFileSync('CourseList.json');
let student = JSON.parse(rawdata);
student.forEach(element =>{
    functionToCall(element.course_code, element.prerequisites);

});
console.log("Finished Uploading Files");
