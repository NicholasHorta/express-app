import passport from 'passport';
import localStrategy from './strategies/local.strategy';

localStrategy();


export default function passportConfig(exe) { // param can be called anything we want as it's RX app = express();
    exe.use(passport.initialize());
    exe.use(passport.session());

    // We want to serialize the entire USER object 
    // Drop that into DONE and this will be added to the session 
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user);
    })

    // This will get handed what's deserializing the user coming out of the COOKIE 
    // It's going to inform "Here's the user that I have" 
    passport.deserializeUser((user, done) => {
        console.log(user);
        done(null, user);
    })

}


/// Sessions
// Password will maintain the login sessions
// As our REQUEST is loaded it will deserialize the user and add that user to the session
// Once the session is done, it will serialise the user back

    //$ Serialize/De - process of transforming information to a legible format dependent on reader/device
    //: deserialize => {011011101001, 100111010110} >>> { John, Qwe23! }
    //: serialize => { John, Qwe23! } >>> {011011101001, 100111010110}


/// Strategy
// SEE ./strategies/local.strategy