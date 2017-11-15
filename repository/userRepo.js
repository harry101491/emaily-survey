const mongoose = require("mongoose");
const Users = mongoose.model("Users");

// finding one user by the applying query
const findOneUser = async (query) => {
    try {
        const userDoc = await Users.findOne(query);
        return userDoc;
    }
    catch(err) {
        return err;
    }
}

// finding one user by ID
const findOneUserById = async (id) => {
    try {
        const doc = await Users.findById(id);
        return doc;
    }
    catch (err) {
       return err; 
    }
}

// Inserting one user
const insertOne = async (doc) => {
    try {
        const docArray = await Users.insertMany(doc);
        return docArray;
    }
    catch(err) {
        return err;
    } 
}

module.exports.findOneUser = findOneUser;
module.exports.insertOne = insertOne;
module.exports.findOneUserById = findOneUserById;