const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");

// requring the routes
const { authRoutes } = require("./routes/authRoutes");
const { billingRoutes } = require("./routes/billingRoutes");
const { surveyRoutes } = require("./routes/surveyRoutes");

const { cookieKey, mongoURI } = require("./config/keys");

const app = express();

const PORT = process.env.PORT || 5000;

// requiring models
require("./models/Users");
require("./models/Surveys");

// requring the passport service
require("./services/passportService");

// connecting to the mongodb
mongoose.connect(mongoURI);

// using body parser middleware for parsing the req body data
app.use(bodyParser.json());
// setting cookie session
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// hooking up the routes
authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

// handling the two things when the NODE_ENV is production
// 1. the public assests should be served from the /client/build directory
// 2. whenever a route comes to the express server which it doesn't know (/surveys) it should serve index.html
if(process.env.NODE_ENV === "production") {
    // serving the static resources
    app.use(express.static("client/build"));

    // serving the index.html file
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.get("/", (req, res) => {
    res.send(`<h2> Hello from Node </h2>`);
});

app.listen(PORT, () => {
    console.log(`sucessfully listening on port: ${PORT}`);
}); 