import express from "express";
import routes from "./routes/index.js";
const app = express();

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Running Port:", PORT);
});

app.get("/", (req, res) => {
  res.send({ msg: "Hello World <3" });
});
