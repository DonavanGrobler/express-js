import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../../utils/mockData.js";

passport.serializeUser((user, done) => {
  console.log("Inside Seriliser");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Inside Deseriliser");
  console.log(`ID: ${id}`);
  try {
    const findUser = mockUsers.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Passport: ${password}`);
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password) throw new Error("Invalid password");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
