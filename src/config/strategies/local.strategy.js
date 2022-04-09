import passport from 'passport';
import { Strategy } from 'passport-local';
import { MongoClient } from 'mongodb';
import debug from 'debug';

const appDebug = debug('app:localStrategy');

export default function localStrategy(){
    passport.use(
            new Strategy(
            {
                usernameField: 'usernameSignIn',
                passwordField: 'passwordSignIn'
            }, (username, password, done) => {
                const url = 'mongodb+srv://nick:bH9cL32h7GrMHY5P@cluster0.9irb1.mongodb.net?retryWrites=true&w=majority';
                const dbName = 'globomantics';

                (async function validateUser(){
                    let client;
                    try {
                        client = await MongoClient.connect(url);
                        appDebug('Connected to mongodb app');
                        const db = client.db(dbName);
                        const user = await db.collection('users').findOne({ username });
                        // If USER exists && the USERS obj password === password that came in 
                        if(user && user.password === password){
                            done(null, user);
                        } else {
                            // We DIDN'T get an error, BUT we didn't find a user either
                            done(null, false);
                        }
                    } catch (error) {
                        done(error, false);
                    }
                    client.close();
                })()
                //!! We're going to do the following later on
                // const user = {
                //     username,
                //     password,
                //     'name': username,
                //     'admin': false
                // };
                // console.log(user, ' -- Created USER OBJECT and sending to PASSPORT.JS')
                // done(null, user);
            }
        )
    );
}
























/// STRATEGY
// STRATEGY will handle authentication requests
// Since we will be keeping everything local, we will implement: The Local Strategy
// Basically means that the user will provide a UN and PW
// And we will figure out whether or not they are authenticated locally, using our own codebase 
//! All this is doing is CREATING a USER OBJECT, it's NOT authorizing a sign in. Just creating the Object.


/// PASSPORT LOCAL -- Need to install this
// This will return us an Object - {}
// And from that Object we want - Strategy
    //@ import { Strategy } from 'passport-local';
 

// When using the local strategy, this is the method we are going to call 
// to figure out if someone can be logged in or not. 
// This is the code passport will execute when it comes time to login a new user 

    //@ export default function localStrategy(){}
    

// The Local Strategy - new Strategy constructor takes 2 pieces of information 
// 1: {}    - with 2 pieces of info: UN and PW, (and any other info we want to add) and tell it what the fields are called in our DOCUMENT FORM: name ATTR 
// 2: ()    - Then we'll send these items to this function, along with the DONE callback,
//          - Within the () call, we'll take the UN and PW, go to a DB, lookup user, validate pw
//          - Then create a USER object out of that information 
    //@ passport.use(new Strategy({
    //@     usernameField: 'username',
    //@     passwordField: 'password'
    //@ }, (username, password, done) => {
    //@     const user = {
    //@         username,
    //@         password,
    //@         'name': 'Jonathan'
    //@     };
    //@     done(null, user);
    //@ }));



/// VALIDATING USERS 
// The below block is where we get the UN and PW from Passport
    //@ }, (username, password, done) => {
    //@     const user = {
    //@         username,
    //@         password,
    //@         'name': 'Jonathan'
    //@     };
    //@     done(null, user);
    //@ }));

// First we pull in MongoDB as we'll need to access this in order to validate our User
