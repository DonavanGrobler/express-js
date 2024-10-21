import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.js";

passport.serializeUser((user, done) => {
  console.log("Inside Seriliser");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside Deseriliser");
  console.log(`ID: ${id}`);
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Passport: ${password}`);
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password) throw new Error("Invalid password");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
