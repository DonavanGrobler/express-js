import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import routes from "./routes/index.js";
import { mockUsers } from "../utils/mockData.js";
import "./strategies/local-strategy.js";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "donavanSecret",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Running Port:", PORT);
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

app.get("/api/auth/status", (req, res) => {
  console.log("Inside auth/status endpoint");
  console.log(req.user);

  return req.user
    ? res.send(req.user)
    : res.status(401).send({ msg: "Not Authenticated" });
});

app.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
});

// app.get("/", (req, res) => {
//   req.session.visited = true;
//   res.cookie("hello", "world", { maxAge: 60000, signed: true });
//   res.send({ msg: "Hello World <3" });
// });

// app.post("/api/auth", (req, res) => {
//   const {
//     body: { username, password },
//   } = req;

//   const findUser = mockUsers.find((user) => user.username === username);

//   if (!findUser || findUser.password !== password)
//     return res.status(401).send({ msg: "INVALID CREDS" });

//   req.session.user = findUser;
//   return res.status(200).send(findUser);
// });

// app.post("/api/cart", (req, res) => {
//   if (!req.session.user) return res.sendStatus(401);

//   const { body: item } = req;
//   const { cart } = req.session;

//   if (cart) {
//     cart.push(item);
//   } else {
//     req.session.cart = [item];
//   }

//   return res.status(201).send(item);
// });

// app.get("/api/cart", (req, res) => {
//   if (!req.session.user) {
//     return res.sendStatus(401);
//   }
//   console.log("Cart", req.session.cart);
//   return res.send(req.session.cart ?? []);
// });
