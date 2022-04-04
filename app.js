import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import path from 'path';
//$ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Importing

const app = express();
const appDebug = debug('app');
const __dirname = path.resolve();
const PORT = process.env.PORT;
const sessionRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')))
app.use('/sessions', sessionRouter)
app.set('views', './src/views');
app.set('view engine', 'ejs');
//! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Configuration

sessionRouter.route('/')
    .get((req, res) => {
        res.render('sessions', {
            sessions: [
                {title: 'Session 1', description: 'Session 1 includes a talk from: ', speaker: 'John Wayland'},
                {title: 'Session 2', description: 'Session 2 includes a talk from: ', speaker: 'Stephen Root'},
                {title: 'Session 3', description: 'Session 3 includes a talk from: ', speaker: 'Jimmy James'},
                {title: 'Session 4', description: 'Session 4 includes a talk from: ', speaker: 'Arnold Palmer'},
            ]
        })
    })

// We use / due to already having specified the path that we're writing for ie: app.use('/sessions', sessionRouter)
//| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Routing


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

// app.get - Sends responses back for GET requests
// app.use - Allows use to USE a sepcific Middleware 
// app.set - Allows us to set variables inside the context of our application

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