const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

// rather then registering the schema we will export the schema
module.exports.Recipient = recipientSchema;