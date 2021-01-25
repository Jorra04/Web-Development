const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv/config");

//Middlewares
// app.use('/posts', ()=>{
//     console.log("Hello, this is a middleware running.")
// });

//makes sure whatever post req we get is parsed into json.
app.use(bodyParser.json());

const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);


//Routes
app.get('/', (req, res)=> {
    res.send("Home page.");
});

mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true },
    ()=> {console.log("We are connected")}

);

//start listening
app.listen(3000,()=>{
    console.log("Server is up and running.");
})