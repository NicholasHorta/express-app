import express from 'express';
import debug from 'debug';
import { MongoClient } from 'mongodb'
import chalk from 'chalk';
import sessions from '../data/sessions.json'

const adminRouter = express.Router();
const appDebug = debug('app:adminRouter');

adminRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://nick:bH9cL32h7GrMHY5P@cluster0.9irb1.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globomantics';

    (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                appDebug(`Successfully connected MongoDB`);
                const db = client.db(dbName);

                const response = await db.collection('sessions').insertMany(sessions);
                res.json(response);
            } catch (error) {
                appDebug(error.stack);
            }
            client.close();
        })();
})

export default adminRouter;