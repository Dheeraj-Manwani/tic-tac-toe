import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./lib/db";

export const initPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!,
        passReqToCallback: true,
      },

      async (req, accessToken, refreshToken, profile, done) => {
        console.log(
          "req, accessToken, refreshToken, profile, done inside passport.ts === ",
          req,
          accessToken,
          refreshToken,
          profile,
          done
        );
        console.log("process.env ==== ", process.env);
        try {
          const email = profile.emails?.[0].value;
          const googleId = profile.id;

          return done(null, {
            googleId,
            email,
            name: profile.displayName,
            avatar: profile.photos?.[0]?.value,
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
