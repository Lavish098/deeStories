const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const dotenv = require("dotenv");


dotenv.config({ path: "./config/config.env" });


// Local Strategy

  passport.use(new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user)
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          // Assume a validatePassword method on your user schema
          const isValid = await User.login(email, password);

          if (!isValid)
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          return done(null, user);
        } catch (err) {
          if(err.message == 'data and hash arguments required'){
            return done(null, false, { message: 'This account is registered with Goolge' })
          }
          return done(null, false, { message: err.message });
        }
      }
    )
  );


// Google Strategy


  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        console.log(profile.emails[0].value);
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        };
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    done(null, id);
  });

  module.exports = passport
