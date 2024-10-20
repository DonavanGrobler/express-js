import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import routes from "./routes/index.js";
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
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Running Port:", PORT);
});

app.get("/", (req, res) => {
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 60000, signed: true });
  res.send({ msg: "Hello World <3" });
});
