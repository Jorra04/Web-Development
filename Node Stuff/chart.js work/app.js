const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');


app.use(bodyParser.json());



app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});



app.listen(3000,()=>{
    console.log("Server is up and running.");
})