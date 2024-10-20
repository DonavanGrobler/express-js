import express from "express";
import { mockProducts } from "../utils/mockData.js";
import userRouter from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Running Port:", PORT);
});

app.get("/", (req, res) => {
  res.send({ msg: "Hello World <3" });
});

app.get("/api/products", (req, res) => {
  res.send(mockProducts);
});
