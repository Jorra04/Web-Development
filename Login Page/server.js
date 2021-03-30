const express = require('express');
const app = new express();
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv/config');
const newUser = require('./models/User');
app.use('/static', express.static('public'));

const saltRounds = 10;

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('We are on the home page');
});

app.get('/users', async (req, res) => {
    try {
        const allUsers = await newUser.find();
        res.json({
            status: 201,
            category: "ALL-USERS",
            users: allUsers
        });
    } catch (err) {
        res.json({ message: err.message });
    }
});


app.get(`/:username/`, async (req, res) => {

    try {
        let username = req.params.username;
        await newUser.findOne({ username: username }).then(foundUser => {
            if (foundUser) {
                res.json({
                    status: 201,
                    category: "SEARCH-USERS",
                    user: foundUser
                });
            } else {
                res.json({
                    status: 401,
                    category: "SEARCH-USERS",
                    user: "No users Found!"
                });
            }
        }).catch(err => {
            console.log(err.message);
        });

    } catch (err) {
        res.json({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let foundUsername = false;
    let logged_in = false;

    try {
        await newUser.findOne({ username: username }).then(async (foundUser) => {
            if (foundUser != null) {
                foundUsername = true;
                await bcrypt.compare(password, foundUser.password).then(passwordMatch => {
                    logged_in = passwordMatch;
                }).catch(err => {
                    console.log(err.message);
                });
            }


        }).catch(err => {
            console.log(err.message);
        });


        if (logged_in) {
            res.json({
                status: 201,
                category: "LOGIN",
                message: "Logged in successfully."
            });
        } else if (foundUsername) {
            res.json({
                status: 401,
                category: "LOGIN",
                message: "Incorrect Password."
            });
        } else {
            res.json({
                status: 402,
                category: "LOGIN",
                message: "User does not exist."
            });
        }

    }
    catch (err) {
        console.log(err.message);
    }
});



app.post('/createuser', async (req, res) => {

    let user = req.body.username;
    const allUsers = await newUser.find();
    let password = '';
    let userFound = false;
    allUsers.forEach(element => {
        if (element.username === user) {
            userFound = true;
        }
    });



    if (!userFound) {
        await bcrypt.hash(req.body.password, saltRounds).then(hash => {
            password = hash;
        });

        const user = new newUser({
            username: req.body.username,
            password: password
        });

        try {
            const createdUser = await user.save();
            res.json({
                status: 201,
                category: "CREATE-USER",
                user_info: createdUser
            });
        } catch (err) {
            res.json({
                status: 401,
                category: "CREATE-USER",
                message: err.message
            });
        }
    }
    else {
        res.json({
            status: 401,
            category: "CREATE-USER",
            message: "This user exists",

        });
    }

});

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}$@cluster0.zbbk9.mongodb.net/restAPIDb?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    () => console.log("We are connected!"));

app.listen(3000);