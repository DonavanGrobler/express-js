import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ msg: "Hello World <3" });
});

app.get("/api/users", (req, res) => {
  res.send([
    {
      id: 1,
      username: "donavan",
      displayName: "Donavan",
    },
    {
      id: 2,
      username: "domenique",
      displayName: "Domenique",
    },
    {
      id: 1,
      username: "caitlynn",
      displayName: "Caitlynn",
    },
  ]);
});

app.listen(PORT, () => {
  console.log("Running Port:", PORT);
});
