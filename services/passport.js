const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// fetch mongoose model Class
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // mongo record id, identify user in database
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // already have record with profile id
        done(null, existingUser);
      } else {
        // no record with profile id, make a new record
        const user = await new User({
          googleId: profile.id,
        }).save();
        done(null, user);
      }
    }
  )
);
