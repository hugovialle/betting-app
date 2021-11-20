const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'});
require('./config/db.config');
const app = express();
const port = process.env.PORT || 8000
const cors = require('cors');

app.use(session({
    secret: "mySecretKey",
    cookie:{maxAge: 24 * 60 * 60 * 1000},
    resave: true,
    saveUninitialized: true}));

// Routes imports
const eventRoutes = require('./routes/event.routes');
const locationRoutes = require('./routes/location.routes');

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
app.use('/api/events', eventRoutes);
app.use('/api/locations', locationRoutes);
require('./routes/user.routes')(app);

// server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})