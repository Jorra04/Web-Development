const express = require('express');
const app = new express();
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const fs = require('fs');
const axios = require('axios');

let data = '';

//routes

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    var name_to_query = req.body.name_to_query;
    var test = '';
    httpGetNationality(name_to_query).then((value) =>{
        getCountryFromCountryCode(jsonOBJ).then((returnValue) =>{
            res.send(returnValue);
        });
    });
    

    
});

let jsonOBJ = '';
const httpGetNationality = async (name) =>{
    try{
        jsonOBJ = await  axios.get(`https://api.nationalize.io/?name=${name}`);
        jsonOBJ = jsonOBJ.data;
    }
    catch (err) {
        console.log(err);
    }
    
};


const getCountryFromCountryCode = async (JSONObj) =>{
    var countries = JSONObj.country;
    
    var greatestProbability = 0;
    var mostLikelyCountry = '';
    if(countries.length != 0){
        try{
            
            countries.forEach((country) => {
               
                if (country.probability > greatestProbability) {
                    greatestProbability = country.probability;
                    mostLikelyCountry = country.country_id;
                }                
            });
            const tempJSON = await axios.get(`https://api.worldbank.org/v2/country/${mostLikelyCountry}?format=json`);
            
            return `Your name belongs matches the following nationality: ${tempJSON.data[1][0].name}\n`;
        }
        catch(err){
            console.log(err);
        }
    }
    else {
        return 'Name does not belong to a country.' ;
    }
};



app.listen(3000);


