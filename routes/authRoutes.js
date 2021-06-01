const passport = require("passport");

module.exports = (app) => {
  // request code
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // use code
  app.get("/auth/google/callback", passport.authenticate("google"));
};
