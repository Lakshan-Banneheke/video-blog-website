const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const passport = require("passport");
const flash = require("express-flash");
const session = require('express-session');
const helmet = require('helmet');
// const pgConnect = require('connect-pg-simple');
const initializePassport = require("./config/passport");
// const { defaultLogger} = require('./config/logger');

// Make all variables from our .env file available in our process
require('dotenv').config();

// Init express
const app = express();

// set view engine
app.set('view engine', 'ejs');


// setup middleware and configs
initializePassport(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(helmet());

// setup static files
app.use(express.static('./public'));

// session set up
app.use(session({
    store: new (require('connect-pg-simple')(session))(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(
    (req, res, next) => {
        if ((req.isAuthenticated())){
            console.log("Authenticated");
            res.locals.username = req.user.username;
            next();
        } else {
            console.log("Not Authenticated");
            next();
        }
    }
)

// setup routes
app.use(require('./routes'));

// uncomment on deployment
// const errorLogger = defaultLogger('error-handler');

// app.use((err, req, res, next) => {
//     const { query, params, body } = req;
//     errorLogger.error({ err, req: { query, params, body } });
//     res.sendStatus(500);
// });

/* Listen on the port for requests */
const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port %d in %s mode', process.env.PORT, app.settings.env);
});

module.exports = {
    server,
};