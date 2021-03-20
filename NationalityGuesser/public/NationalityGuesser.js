const https = require('https');
const http = require('http');
const fs = require('fs');






const findNationality = (name) =>{
    var host = `https://api.nationalize.io/?name=${name}`;
    https.get(host, (resp) => {

        let data = '';
    
        resp.on('data', (chunk) => {
            data += chunk;
        });
    
        resp.on('end', () => {
            const dataObj = JSON.parse(data);
        
            var result = getMostProbabalCountry(dataObj);


        });
    });
};

const getMostProbabalCountry = (JSONObj) => {
    var countries = JSONObj.country;
    var greatestProbability = 0;
    var mostLikelyCountry = '';

    countries.forEach( (country) => {
        if(country.probability > greatestProbability){
            greatestProbability = country.probability;
            mostLikelyCountry = country.country_id;
           
        }
    });
    
    var host = `https://api.worldbank.org/v2/country/${mostLikelyCountry}?format=json`;
    if(countries.length > 0 ){
        https.get(host, (resp) => {

            let data = '';
        
            resp.on('data', (chunk) => {
                data += chunk;
            });
        
            resp.on('end', () => {
                const dataObj = JSON.parse(data);
                // console.log(dataObj);
                return `Your name belongs matches the following nationality: ${dataObj[1][0].name}\n`;
            });
        });
    } else {
        return "That name does not belong to any country in our database!\n" ;
    }
}

var found_nationality = findNationality("Inder");
console.log(found_nationality);



