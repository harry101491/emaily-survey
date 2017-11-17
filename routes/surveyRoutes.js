const mongoose = require("mongoose");
const Survey = mongoose.model("Surveys");
const authUserMiddleware = require("../middlewares/authUserMiddleware");
const requiredCredit = require("../middlewares/requireCredit");

// all the routes that are related to the survey
module.exports.surveyRoutes = (app) => {
    // post request to the server that will create survey document
    app.post("/api/surveys", authUserMiddleware, requiredCredit, (req, res) => {
        // destructuring the request body
        const { title, subject, body, recipients  } = req.body;
        
        // creating a new instance of survey
        const survey = new Survey({
            title: title,
            body: body,
            subject: subject,
            
        });
    });
}