const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
    googleID: String,
    credits: { type: Number, default: 0 }
});

mongoose.model("Users", usersSchema);
