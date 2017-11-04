// contain the logic which decides when to take heroku credentials and when to take localhost
if(process.env.NODE_ENV === "production") {
    // return the production set of keys
    module.exports = require("./prod");
}
else {
    // return the development set of keys
    module.exports = require("./dev");
}