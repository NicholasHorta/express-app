import passport from 'passport';



export default function passportConfig(exe) { // param can be called anything we want as it's RX app = express();
    exe.use(passport.initialization());
    exe.use(passport.session());

    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user);
    }) 
    // We want to serialize the entire USER object 
    // Drop that into DONE and this will be added to the session 

    passport.deserializeUser((user, done) => {
        console.log(user);
        done(null, user);
    })
    // This will get handed what's deserializing the user coming out of the COOKIE 
    // It's going to inform "Here's the user that I have" 


    // STRATEGY will handle authentication requests
    // Since we will be keeping everything local, we will implement: The Local Strategy
    // Basically means that the user will provide a UN and PW
    // And we will figure out whether or not they are authenticated locally, using our own codebase 

}


// Sessions
// Password will maintain the login sessions
// As our REQUEST is loaded it will deserialize the user and add that user to the session
// Once the session is done, it will serialise the user back



    //$ Serialize/De - process of transforming information to a legible format dependent on reader/device
    //: deserialize => {011011101001, 100111010110} >>> { John, Qwe23! }
    //: serialize => { John, Qwe23! } >>> {011011101001, 100111010110}