const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
    googleID: String
});

mongoose.model("Users", usersSchema);
