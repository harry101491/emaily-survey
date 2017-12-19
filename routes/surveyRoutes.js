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
    app.post("/api/surveys", authUserMiddleware, requiredCredit, async (req, res) => {
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
        try {
            // creating mailer object
            const mailer = new Mailer(survey, surveyTemplate(survey));
            // send the mailer object to the sendgrid
            await mailer.send();
            // save the survey object to the mongo db
            await survey.save();
            // update the user credits as user has used the at least 1 credit from the total credits
            req.user.credits -= 1;
            // save the updated user and get the updated user from database
            const user = await req.user.save();
            // send the user to the front end and update new credits
            res.send(user);
        }
        catch(err) {
            // if error has occured then we will reply the error (some wrong data has been sent by user)
            res.status(422).send(err);
        }
    });
}