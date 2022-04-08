import express from 'express';
import debug from 'debug';
import { MongoClient, ObjectId } from 'mongodb'

const authRouter = express.Router();
const appDebug = debug('app:sessionRouter');


authRouter.route('/signup')
    .post((req, res) => {
        // TODO create user
        req.login(req.body, () => {
            res.redirect('/auth/profile');
        })
    })

authRouter.route('/profile')
    .get((req, res) => {
        //! add onto USER below
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
