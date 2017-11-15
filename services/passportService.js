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
passport.deserializeUser(async (token, done) => {
    // get the token and find the user with the token in the mongodb
    try {
        const doc = await findOneUserById(token);
        done(null, doc);
    }
    catch(err) {
        done(err, null);
    }
});

// using google strategy
passport.use(new GoogleStrategy(googleStrategyOptions, async (accessToken, refreshToken, profile, done) => {
    try {
        const userDoc = await findOneUser({googleID: profile.id});
        if(!userDoc) {
            // document is not present create a new one
            const doc = await insertOne({ googleID: profile.id });
            done(null, doc);
        }
        else {
            // document is already present
            done(null, userDoc);
        }
    }
    catch(err) {
        done(err, null);
    }
}));