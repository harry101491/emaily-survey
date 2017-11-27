// importing the send grid api
const sendgrid = require("sendgrid");
const _ = require("lodash");

// getting the helper from the sendgrid
const helper = sendgrid.mail;

// getting the keys from the config folder
const { sendGridKey } = require("../config/keys");

// extending the class helper.Mail
class Mailer extends helper.Mail {
    // constructor with the two arguments
    // 1. the object containing subject and recipients to send
    // 2. the html content that will sent to the user
    constructor({ subject, recipients }, content) {
        super();

        console.log("Inside the constructor");
        // creating the sendgrid api instance
        this.SGAPI = sendgrid(sendGridKey);
        // the email address that is sending the emails to user like (no-reply@emaily.com)
        this.from_email = new helper.Email("no-reply@emaily.com");
        // subject of the email
        this.subject = subject;
        // specifiying the content of the email
        this.body = new helper.Content("text/html", content);
        // formatting the recipients addresses by helper function
        this.recipients = this.formatAddresses(recipients);
        
        // registering the content with Mail class built-in function addContent
        this.addContent(this.body);
        // adding the clicktracking in the email
        this.addClickTracking();
        // helper method for adding the recipients
        this.addRecipients();

    }
    // helper method to format the addresses of the recipients
    formatAddresses(recipients) {
        // return an array of all email objects for every recipients
        // console.log(`Inside the formatAddress method ${JSON.stringify(recipients)}`);
        // console.log(`the value of helper Email Object is: ${helper.Email(recipients[0].email)}`);
        return _.map(recipients, ({ email }) => {
            return helper.Email(email);
        });
    }
    // helper method for click tracking funtionality
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    // helper method for the adding all the recipients
    addRecipients() {
        // creating personalization object
        const personalize = new helper.Personalization();

        // adding every recipient to sending list of the mail
        _.forEach(this.recipients, (recipient) => {
            personalize.addTo(recipient);
        });
        
        // adding our personalization with addPersonalization method in Mail
        this.addPersonalization(personalize);
    }

    async send() {
        console.log(`Inside the send method`);
        // creating an empty request
        const request = this.SGAPI.emptyRequest({
            method: "POST",
            path: "v3/mail/send",
            body: this.toJSON()
        });

        // waiting for the responce
        const responce = await this.SGAPI.API(request);
        return responce;
    }
}

module.exports = Mailer;