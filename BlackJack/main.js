const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv/config');

const BlackJack = require('./BlackJack');
let deckIdentifier = '';

//Middlewares
app.use('/static', express.static('public'));
app.use(bodyParser.json());


app.get('/newGame', async (req, res) => {
    let recievedJSON = await BlackJack.start();
    deckIdentifier = recievedJSON.deck_id;
    res.json(recievedJSON);
});


app.get('/currentGame', async (req, res) => {
    res.json(deckIdentifier);
});

app.get('/deal/:current_score/', async (req, res) => {
    try{
        let current_score = req.params.current_score;
       
        const resp = await BlackJack.Deal(deckIdentifier, current_score);
        res.json(resp);
    } catch (err) {
        res.json({error_message : err});
    }
});



//Starting to listen on port 3000 (open server connection). 
app.listen(3000);