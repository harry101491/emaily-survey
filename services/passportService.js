const { googleClientID, googleClientSecret } = require("../config/keys");
const passport = require("passport");
const { findOneUser, insertOne, findOneUserById } = require("../repository/userRepo");


// google strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleStrategyOptions = {
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
}

// serializing the user and sending the cookie to browser
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserializing the user and getting the unique identifier for the user
passport.deserializeUser((token, done) => {
    // get the token and find the user with the token in the mongodb
    findOneUserById(token).then((doc) => {
        // everthing went great
        done(null, doc);
    }, (err) => {
        // error has occured
        done(err, null);
    });
});

// using google strategy
passport.use(new GoogleStrategy(googleStrategyOptions, (accessToken, refreshToken, profile, done) => {
    findOneUser({googleID: profile.id}).then((userDoc) => {
        if(!userDoc) {
            // document is not present create a new one
            insertOne({ googleID: profile.id }).then((doc) => {
                done(null, doc);
            }, (err) => {
                done(err, null);
            });
        }
        else {
            // document is already present
            done(null, userDoc);
        }
    });    
}));