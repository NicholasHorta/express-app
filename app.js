console.log('APP.JS');
import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import passportModule from './src/config/passport';
import sessionsRouter from './src/routers/sessionsRouter';
import adminRouter from './src/routers/adminRouter';
import authRouter from './src/routers/authRouter';

//$ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Importing


const app = express();
const appDebug = debug('app');
const __dirname = path.resolve();
const PORT = process.env.PORT;

//: Config
const appCookieParser = cookieParser;
const appSession = session;

//: Routers
const authRx = authRouter;
const adminRx = adminRouter;
const sessionRx = sessionsRouter;


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
app.use(appCookieParser());
app.use(appSession({ secret: '66F44EYZo0aqPZxZ'}));
console.log("PassportModule about to execute...");
passportModule(app);


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/sessions', sessionRx);
app.use('/admin', adminRx);
app.use('/auth', authRx);
//! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Configuration


app.get('/', (req, res) => {
    res.render('index');
})

//. - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Paths


app.listen(PORT, () => {
    appDebug(`${chalk.cyan('listening on port')} ${chalk.green(PORT)}`)
})











//? -------------------- PACKAGES --------------------

/// EXPRESS
// STATIC is middleware built into EXPRESS that will handle static files
// We tell it where we will pull the static files from using the PATH package from express
// Then we provide "where" on the file system where these static files are
// __dirname - A variable from Node that results in "Where are you running from" for files < /Users/unicompare/Desktop/Node >

// app.get  - Sends responses back for GET requests
// app.use  - Allows use to USE specific Middleware - USE function MUST flow in a specific order!
//          - Just a function, can be for the entire app, or just certain files
//          - More info on --> sessionsRouter
// app.set  - Allows us to set variables inside the context of our application

/// PROCESS.ENV
// process.env - What comes out of the environment 
// So NODEMON is currently dropping in the value 3500 as PORT
// process.env strips out whatever we dropped into the JSON object

/// CHALK
// Run debug for all || just app - DEBUG=* node app.js || DEBUG=app node app.js
    //@ set DEBUG=* & node app.js <Windows>

/// MORGAN
// Logs information to the console regarding web-traffic

/// EJS
// Setting a variable called VIEWS and telling it where our views are, where we're storing all our views for the app
    //@ app.set('views', './src/views');

// Then need to tell EXPRESS "what" the VIEW ENGINE is...
    //@ app.set('view engine', 'ejs');

// Now we have EXPRESS linking in './src/views' for templates associated with EJS


/// ROUTER
// Create a variable which holds an instance of the express router
    //@ const sessionRouter = express.Router();

// Everything that goes to sessions, we want to use the following "sessionRouter" which will hold ALL code to deal with session routes
    //@ app.use('/sessions', sessionRouter)

    
// We use / due to already having specified the path that we're writing for ie: app.use('/sessions', sessionRouter)
    //@ sessionRouter.route('/')
    //@     .get((req, res) => {
    //@         res.render('sessions')
    //@     })

// REQ.PARAMS will supply us with whatever we passed in under the dynamic parameter item
// Dyn title must match the req.params item - but variable can be renamed
    //. href="/sessions/<%= sess.id %>/<%= sess.room"
    //@ sessionRouter.route('/:id/:room')
    //@     .get((req, res) => {
    //@         const id = req.params.id
    //@         const cfRoom = req.params.room
    //@         res.send('sessions id: ' + id + ' ---- ' + cfRoom)
    //@     })
// Use the REQ.PARAMS to access a value which we can reference in the main data
// The specific item within the main data can then be passed onto SINGLE page through it's own properties
// The data is passed the same as variable data assignment NEW-STORAGE <-- VALUE
    //@ sessionRouter.route('/:id')
    //@     .get((req, res) => {
    //@         const id = req.params.id
    //@         res.render('singleSession', { singlePageProps: mainDataSrc[id] })
    //@     })



/// POST
// Used to use BodyParser but now we use express.json()
    //@ app.use(express.json());
// Followed by boilerplate code
    //@ app.use(express.urlencoded({extended: false}));

// We now have this object/function, and when a POST is sent through this REQUEST pipeline 
// Application now has middleware that will interrupt as it's running through 
// Will check if there is something on the BODY, pull it out using express.json() 
// and whatever is returned, drop that back on the REQUEST as REQ.BODY

    //@ authRouter.route('/signup')
    //@     .post((req, res) => {
    //@         res.json(req.body)
    //@     })
// Want to get access to the document body

//: REMEMBER! - Order MATTERS!!!
// So we need to establish our USE of express' initialisation (app)  
// and it's objects/functions BEFORE our routes are established
    //$ USE
    //@ app.use(express.static(path.join(__dirname, '/public/')))
    //@ app.use(express.json()); 
    //@ app.use(express.urlencoded({extended: false}));

    //$ Route
    //@ app.use('/auth', authRx);



/// PASSPORT
// Handle all user authentication & authorization 
// Passport deals with maintaining your USER object IN the SESSION
// Does this by applying/updating cookies, sessions etc 
// We also then require EXPRESS-SESSION and COOKIE-PARSER 
// to store our cookies and session info

    //@ import cookieParser from 'cookie-parser';
    //@ import session from 'express-session';

    //@ app.use(appCookieParser());
    //@ app.use(appSession({ secret: '66F44EYZo0aqPZxZ'}));

// session requires an object that contains a secret key in which we must provide a value for
// Doesn't matter what the secret is, it's simply used to encode the cookie 


// The USED middleware MUST be in the following order as Passport, before initialization,
// REQUIRES, besides the others which DO matter, COOKIE-PARSER & SESSIONS to be established 
    //@ app.use(morgan('tiny'));
    //@ app.use(express.static(path.join(__dirname, '/public/')))
    //@ app.use(express.json()); 
    //@ app.use(express.urlencoded({extended: false}));
    //@ app.use(appCookieParser());
    //@ app.use(appSession({ secret: '66F44EYZo0aqPZxZ'}));
    //@ passportModule(app);


