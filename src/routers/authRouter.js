import express from 'express';
import debug from 'debug';
import { MongoClient, ObjectId } from 'mongodb';
import chalk from 'chalk';
import passport from 'passport';
const authRouter = express.Router();
const appDebug = debug('app:sessionRouter');

console.log('AUTHRX.JS'); 

authRouter.route('/signup')
    .post((req, res) => {
        /// MAKING A USER
        // First we need to get the UN & PW 
        const { username, password } = req.body; // Destructuring
        const url = 'mongodb+srv://nick:bH9cL32h7GrMHY5P@cluster0.9irb1.mongodb.net?retryWrites=true&w=majority';
        const dbName = 'globomantics';
        (async function addUser() {
            let client;
            try {
                client = await MongoClient.connect(url);
                const db = client.db(dbName);
                const user = { username, password };
                const results = await db.collection('users').insertOne(user);
                appDebug(chalk.red(results.insertedId))
                appDebug(results);// { acknowledged, new ObjectId } - the Object returned from MongoDB success/failure 
                req.login(results, () => {
                    res.redirect('/auth/profile');
                })
            } catch (error) {
                appDebug(error);
            }
            client.close();
        })()
    })

/// GET & POST COMBO
// We want both here, because once we GET signin, We SEND you to 'signin' page
// THEN we chain on the POST request 
// When we POST, we need a function that is executed in order to AUTHENTICATE
// passport has a built in function to this 
// and will RETURN a function handler FOR the POST REQUEST
// function takes 2 params, 1: STRATEGY, 2: Object with 2 options
    //: successRedirect - Where to redirect if successful
    //: failureMessage - What to do/show if the op has failed

authRouter.route('/signin')
    .get((req, res) => {
        res.render('signin')
    })
    .post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureMessage: '/'
    }))

authRouter.route('/profile')
    .get((req, res) => {
        res.json(req.user)
    })


export default authRouter;

/// LOGIN
// LOGIN is a method that has been placed on the request by passport
// Which allows us to log a user in, we'll pass it the body of the request 
// And then a function which tells it that once we're logged in
// Respond with res.redirect to the suitable path
// As we cant have the user go where the form submission goes

    //@ authRouter.route('/signup')
    //@     .post((req, res) => {
    //@         req.login(req.body, () => {
    //@             res.redirect('/auth/profile');
    //@         })
    //@     })

/// USER 
// Passport will, if a user is logged in, provide us with a USER method

    //@ authRouter.route('/profile')
    //@     .get((req, res) => {
    //@         res.json(req.user)
    //@     })
