const { stripeSecretKey } = require("../config/keys");
const stripe = require("stripe")(stripeSecretKey);
const authUserMiddleware = require("../middlewares/authUserMiddleware");

module.exports.billingRoutes = (app) => {
    app.post("/api/stripe", authUserMiddleware , async (req, res) => {    
        // creating a charge of $5 by the stripe API
        const charge = await stripe.charges.create({
            amount: 500,
            currency: "USD",
            description: "Charging credit card for adding credits in Emaily",
            source: req.body.id
        });
        
        // user model is already attached to the req object
        // adding 5 credits
        req.user.credits += 5;
        const updatedUser = await req.user.save();
        res.send(updatedUser);
    });
} 