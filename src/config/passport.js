import passport from 'passport';
import localStrategy from './strategies/local.strategy';


localStrategy();

export default function passportConfig(exe) { // param can be called anything we want as it's RX app = express();
    console.log('PASSPORT.JS')
    exe.use(passport.initialize());
    exe.use(passport.session());

    // We want to serialize the entire USER object 
    // Serializing - WRITING the USER object
    passport.serializeUser((user, done) => {
        console.log(user, ' - serialize');
        done(null, user);
    })

    // Deserializing will be what's handed to the session
    // It's going to inform "Here's the user that I have" 
    // Gives it to the COOKIE
    // Deserialization - READING the USER object
    passport.deserializeUser((user, done) => {
        console.log(user, ' - deserialize');
        done(null, user);
    })
    console.log('passportConfig Function end!')
}


/// SESSIONS
// Password will maintain the login sessions
// As our REQUEST is loaded it will deserialize the user and add that user to the session
// Once the session is done, it will serialise the user back

    //$ Serialize/De - process of transforming information to a legible format dependent on reader/device
    //: deserialize => {011011101001, 100111010110} >>> { John, Qwe23! }
    //: serialize => { John, Qwe23! } >>> {011011101001, 100111010110}

// Sessions are like a post-it note, but you write what you want on them. 
// Serialization is the writing part, and deserialization is the reading part.
    //: EG: 
    // User signs in. 
    // You don't want to keep all his info in the session because it's already in your database.
    // But on subsequent requests, you want to remember who he is. 
    // Since you don't want to KEEP checking the DB whenever he does ANYTHING in the site.
    // So all you have to write down on your post-it is his Id, let's say 1234. 
    // By calling done, you're informing passport that this is what you want to stock in the session.
    // On a subsequent call, passport retrieves your post-it and says "Ok, I know this guy, his id is 1234". 
    // findById is the method you call to retrieve all his information, like his name. 
    // By calling done here, you're saying "ok, here's the info about that user. His name is Bob."
    
    //: Signs in --> const user = { un: "Bob", pw: "zxc123", id: 1234 }
    //: SESSION: { user }
    

/// STRATEGY
// SEE --> ./strategies/local.strategy

