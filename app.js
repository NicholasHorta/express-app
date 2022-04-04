import express from 'express';
import chalk from 'chalk';
import debug from 'debug'; 
import morgan from 'morgan'; 
import path from 'path';
//$ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Importing

const app = express();
const appDebug = debug('app'); 
const __dirname = path.resolve();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')))

//! - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Configuration


app.get('/', (req, res) => {
    res.send('gay')
})

//. - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Paths


app.listen(3500, () => {
    appDebug(`${chalk.cyan('listening on port')} ${chalk.green('3500')}`)
})











//? -------------------- PACKAGES --------------------

/// EXPRESS
// STATIC is middleware built into EXPRESS that will handle static files
// We tell it where we will pull the static files from using the PATH package from express
// Then we provide "where" on the file system where these static files are
// __dirname - A variable from Node that results in "Where are you running from" for files < /Users/unicompare/Desktop/Node >

/// CHALK
// Run debug for all || just app - DEBUG=* node app.js || DEBUG=app node app.js
// set DEBUG=* & node app.js <Windows>

/// MORGAN
// Logs information to the console regarding web-traffic