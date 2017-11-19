// importing the send grid api
const sendgrid = require("sendgrid");

// getting the helper from the sendgrid.mail
const helper = sendgrid.mail;

// getting the keys from the config folder
const { sendGridKey } = require("../config/keys");

// extending the class helper.Mail
class Mailer extends helper.Mail {

}

export default Mailer;