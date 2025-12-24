import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import { getUserById, getUserByUsername } from "../queries.js";
const LocalStrategy = passportLocal.Strategy;

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

passport.use(
  new LocalStrategy(customFields, async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "incorrect username" });
      }

      const matchPw = await bcrypt.compare(password, user.password);

      if (!matchPw) {
        return done(null, false, { message: "incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
