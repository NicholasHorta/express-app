import express from 'express';
import sessions from '../data/sessions.json'
import debug from 'debug';
import { MongoClient, ObjectId } from 'mongodb'
import chalk from 'chalk';

const sessionRouter = express.Router();
const appDebug = debug('app:sessionRouter');


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