const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Recipient } = require("./Recipient");

// schema contains the recipients array and a reference to the user model
const surveySchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "Users" },
    title: String,
    subject: String,
    body: String,
    recipients: [ Recipient ],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('Surveys', surveySchema);