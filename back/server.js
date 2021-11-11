const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const User = require('./models/user.model.js');

mongoose.connect('mongodb+srv://admin:qKmV4vVmKQcFKYN5@cluster0.bek5z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to DB');
    })
    .catch((error) => {
        console.log('Unable to connect to DB!');
        console.log(error);
    })

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.set('Access-Control-Allow-Credentials', true);
    next();
})

app.use(cors({credentials: true, origin: "http://localhost:4200"}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret:"mySecretKey", cookie:{maxAge: 24 * 60 * 60 * 1000}}))