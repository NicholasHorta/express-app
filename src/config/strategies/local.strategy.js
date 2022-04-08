
import passport from 'passport';
import { Strategy } from 'passport-local';

export default function localStrategy(){
    passport.use(
        new Strategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            }, (username, password, done) => {
                const user = {
                    username,
                    password,
                    'name': 'Jonathan'
                };
            done(null, user);
        })
    );
}

/// Strategy
// STRATEGY will handle authentication requests
// Since we will be keeping everything local, we will implement: The Local Strategy
// Basically means that the user will provide a UN and PW
// And we will figure out whether or not they are authenticated locally, using our own codebase 


/// Passport local -- Need to install this
// This will return us an Object - {}
// And from that Object we want - Strategy
    //@ import { Strategy } from 'passport-local';
 

// When using the local strategy, this is the method we are going to call 
// to figure out if someone can be logged in or not. 
// This is the code passport will execute when it comes time to login a new user 

    //@ export default function localStrategy(){}
    

// The Local Strategy - new Strategy constructor takes 2 pieces of information 
// 1: {}    - with 2 pieces of info: UN and PW, (and any other info we want to add) and tell it what the fields are called in our DOCUMENT
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
