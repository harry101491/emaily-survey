const mongoose = require("mongoose");
const Survey = mongoose.model("Surveys");
const authUserMiddleware = require("../middlewares/authUserMiddleware");
const requiredCredit = require("../middlewares/requiredCredit");

// requring the template
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// requiring Mailer Class
const Mailer = require("../services/Mailer");

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
            dateSent: Date.now(),
            _user: req.user.id,
            recipients: recipients.split(",").map((emailString) => {
                return { email: emailString };
            })
        });
        // console.log(`the value of survey object formed is: ${JSON.stringify(survey)}`);

        // creating mailer object
        const mailer = new Mailer(survey, surveyTemplate(survey));
        mailer.send();
    });
}