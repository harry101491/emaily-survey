const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
// requring the authRoutes
const {authRoutes} = require("./routes/authRoutes");

const { cookieKey, mongoURI } = require("./config/keys");

const app = express();

const PORT = process.env.PORT || 3000;

// requiring users model
require("./models/Users");

// requring the passport service
require("./services/passportService");

// connecting to the mongodb
mongoose.connect(mongoURI);

// setting cookie session
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

app.get("/", (req, res) => {
    res.send(`<h2> Hello from Node </h2>`);
});

app.listen(PORT, () => {
    console.log(`sucessfully listening on port: ${PORT}`);
}); 