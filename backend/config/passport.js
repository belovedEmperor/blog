import { prisma } from "../lib/prisma.js";
import passport from "passport";
import bcrypt from "bcryptjs";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

import passportJwt from "passport-jwt";
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: jwt_payload.id },
        });

        if (!user) {
          return done(null, false, { message: "JWT cannot be verified" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
