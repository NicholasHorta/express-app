import express from 'express';
import sessions from '../data/sessions.json'
import debug from 'debug';
import { MongoClient, ObjectId } from 'mongodb'
import chalk from 'chalk';

const appDebug = debug('app:sessionRouter');
const sessionRouter = express.Router();

sessionRouter.use((req, res, next) => {
    if(req.user){
        console.log(req.user, '-- req.user OBJ')
        next();
    } else {
        res.redirect('/auth/signin');
    }
})

sessionRouter.route('/')
    .get((req, res) => {
        const url = 'mongodb+srv://nick:bH9cL32h7GrMHY5P@cluster0.9irb1.mongodb.net?retryWrites=true&w=majority';
        const dbName = 'globomantics';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                appDebug(`Successfully connected MongoDB -- SESSIONS`);
                const db = client.db(dbName);

                const sessions = await db.collection('sessions').find().toArray();
                res.render('sessions', { sessions });
            } catch (error) {
                appDebug(error.stack);
            }
            client.close();
        })();
    })

sessionRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id
        const url = 'mongodb+srv://nick:bH9cL32h7GrMHY5P@cluster0.9irb1.mongodb.net?retryWrites=true&w=majority';
        const dbName = 'globomantics';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                appDebug(`Successfully connected MongoDB -- SESSIONS`);
                const db = client.db(dbName);

                const sessions = await db.collection('sessions').findOne({ _id: new ObjectId(id) })
                res.render('session', { callMeAnything: sessions })
            } catch (error) {
                appDebug(error.stack);
            }
            client.close();
        })();
    })


export default sessionRouter

/// MIDDLEWARE
// NEXT - Is what makes this middleware, it informs the middleware to continue after success/failure 
// The order of the flow matters here, the middleware will need to be above the routes unless provided

// We want to check IF passport has dropped a USER object onto the REQ
// If we drop our server connection, we're dropping our session
// So Passport isn't providing a USER Object to REQ, so we need to sign in again.

// If true, we move on, else, we're redirected
    //@ sessionRouter.use((req, res, next) => {
    //@     if(req.user){
    //@         next();
    //@     } else {
    //@         res.redirect('/auth/signin');
    //@     }
    //@ })

// Another way to implement the middleware in a more explicit way
    //@ const secureMdware = sessionRouter.use((req, res, next) => { <code> })
    
    //@ sessionRouter.route('/')
    //@     .get((req, res, secureMdware) => { <code> })