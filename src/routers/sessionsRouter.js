import express from 'express';
import debug from 'debug';
import { MongoClient, ObjectId } from 'mongodb'
import speakerService from '../services/speakerService';

console.log(speakerService)

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

                const session = await db.collection('sessions').findOne({ _id: new ObjectId(id) })

                // Speaker Service - getSpeakerById returns a PROMISE
                // So we can then use the await keyword as we're in an async function
                const speaker = await speakerService.getSpeakerById(session.speakers[0].id);
                console.log(speaker)
                session.speaker = speaker.data;
                res.render('session', { singleSession: session });
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