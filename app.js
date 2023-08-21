const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');

// Import User Functions from controllers
const {createNewUser, getPasswordHashByUser} = require("./db_controllers/controllers");
// salty server stuff
const saltRounds = 12;
const { hash, compare } = bcrypt; 

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get data from ui and update Database
//create user
app.post('/users', (req, res) => {
    let { body } = req;
    let { user_username, passwordRaw } = body;
    hash(passwordRaw, saltRounds)
        .then((passwordHash) => {
            createNewUser(user_username, passwordHash)
                .then(data => {
                    if(data.length > 0){
                        res.status(201).send({message:'NEW USER CREATED'})
                    }
                    else{
                        res.status(401).send({message: 'USERNAME IS ALREADY IN USE'})
                    }
                })
                .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
});

//login user with username and raw password
app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    getPasswordHashByUser(username)
    .then((passwordHash) => {
        if(passwordHash){
            if(password == passwordHash) {res.status(202).json(passwordHash)}
            else{
                let passwordRaw = password;
                compare( passwordRaw, passwordHash )
                .then((isMatch) => {
                if (isMatch) res.status(202).json(passwordHash);
                    else {res.status(401).send({message:'INVALID PASSWORD'})}
                })
            }
        }
        else res.status(401).json('INVALID USERNAME')
    })
    .catch((err) => res.status(500).send(err));
});