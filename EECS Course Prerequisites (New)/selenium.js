const webDriver = require('selenium-webdriver');

let FACULTY = 'LE' ;
let SUBJECT = 'EECS';
let STUDY_SESSION = 'FW' ;
const link = `https://w2prod.sis.yorku.ca/Apps/WebObjects/cdm.woa/wa/crsq1?faculty=${FACULTY}&subject=${SUBJECT}&studysession=${STUDY_SESSION}`;
let By = webDriver.By;
let until = webDriver.until;


let driver = new webDriver.Builder()
    .forBrowser('chrome')
    .build();


const search = async () => {
    driver.get(link);
}

search();

// driver.close();
document.querySelector("#subjectSelect > option:nth-child(62)")
