const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio')

let FACULTY = 'LE' ;
let SUBJECT = 'EECS';
let STUDY_SESSION = 'FW' ;
const link = `https://w2prod.sis.yorku.ca/Apps/WebObjects/cdm.woa/wa/crsq1?faculty=${FACULTY}&subject=${SUBJECT}&studysession=${STUDY_SESSION}`

//delete the text file before hand.
fs.unlink(`${__dirname}/res.txt`, (err)=>{
    if(err){
        console.log(err.message);
    }
});

const getTorontoRes = async ()=>{
    await axios.get(link)
    .then((res) => {
        const $ = cheerio.load(res.data);
        let links = $('a');
        
        $(links).each( async (i, link) => {
            
            if($(link).text() === 'Fall/Winter 2020-2021 Course Schedule'){
              
                await axios.get(`https://w2prod.sis.yorku.ca${$(link).attr('href')}`)
                .then((res)=>{
                    const $ = cheerio.load(res.data);
                    const boldThing = $('.bold')

                    const courseName = $('.heading').next('h1').text();
                    
                    boldThing.each((i, foundText)=>{
                        if($(foundText).text() === 'Course Description:'){
                            
                            let description = $(foundText).next().text();
                            let writeFileContent = `Course Name: ${courseName}\n\nDescription: ${description}\n\n\n\n`;

                            fs.writeFile(`${__dirname}/res.txt`, writeFileContent,{ flag: "a" }, (err, data)=>{
                                if(err){
                                    console.log(err.message);
                                } else {
                                    console.log(data);
                                }
                            });
                            
                        }
                    })
                    
                })
                .catch(err =>{
                    console.log(err.message);
                })
            }
        });

        // console.log(links.length);
    })
    .catch(err => {
        console.log(err.message);
    });
};


getTorontoRes();

// let rawdata = fs.readFileSync('CourseList.json');
// let student = JSON.parse(rawdata);
// student.forEach(element =>{
//     functionToCall(element.course_code, element.prerequisites);
    
// });
// console.log("Finished Uploading Files");
