const passport = require("passport");

module.exports.authRoutes = (app) => {
    // providing passport middleware and giving scope to access the profile and email of the user
    app.get("/auth/google", passport.authenticate("google", {
        scope: ['profile', 'email']
    }));

    // handling the callback from the google after authentication
    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.redirect("/surveys");
    });

    // logging out from the application
    app.get("/api/logout", (req, res) => {
        // logged out from the application with destroying the user object
        req.logout();
        res.redirect("/");
    });

    // handling the route when the cookie has been set and user model is returned
    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
}