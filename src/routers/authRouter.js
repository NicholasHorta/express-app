import express from 'express';
import debug from 'debug';
import { MongoClient, ObjectId } from 'mongodb'

const authRouter = express.Router();
const appDebug = debug('app:sessionRouter');
