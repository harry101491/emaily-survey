const mongoose = require("mongoose");
const Q = require("q");
const Users = mongoose.model("Users");

// finding one user by the applying query
const findOneUser = (query) => {
    const defer = Q.defer();
    Users.findOne(query).then((userDoc) => {
        // returning the user object find after running the query
        defer.resolve(userDoc);
    }, (err) => {
        // some error while getting the data from the data base
        defer.reject(err);
    });
    return defer.promise;
}

// finding one user by ID
const findOneUserById = (id) => {
    const defer = Q.defer();
    Users.findById(id).then((doc) => {
        defer.resolve(doc);
    }, (err) => {
        defer.reject(err);
    }); 
    return defer.promise;
}

// Inserting one user
const insertOne = (doc) => {
    const defer = Q.defer();
    Users.insertMany(doc).then((docArray) => {
        defer.resolve(docArray[0]);
    }, (err) => {
        defer.reject(err);
    });
    return defer.promise;
}

module.exports.findOneUser = findOneUser;
module.exports.insertOne = insertOne;
module.exports.findOneUserById = findOneUserById;