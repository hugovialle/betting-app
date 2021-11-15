const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();
const port = process.env.PORT || 8000
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowHeaders': ['sessionId', 'Content-type'],
    'exposeHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

// JsonWebToken
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

//routes
app.use('/api', userRoutes);

// server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})