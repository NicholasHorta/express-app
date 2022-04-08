import express from 'express';
import debug from 'debug';
import { MongoClient, ObjectId } from 'mongodb'

const authRouter = express.Router();
const appDebug = debug('app:sessionRouter');


authRouter.route('/signup')
    .post((req, res) => {
        // Want to get access to the document body
        console.log(req.body)
        res.json(req.body)
    })


export default authRouter;