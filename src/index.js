import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
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
    id: 3,
    username: "caitlynn",
    displayName: "Caitlynn",
  },
  {
    id: 4,
    username: "anica",
    displayName: "Anica",
  },
  {
    id: 5,
    username: "rynardt",
    displayName: "Rynardt",
  },
  {
    id: 6,
    username: "kobus",
    displayName: "Kobus",
  },
  {
    id: 7,
    username: "teresa",
    displayName: "Teresa",
  },
];

const mockProducts = [
  {
    id: 1,
    name: "chicken",
    price: "14.99",
  },
  {
    id: 2,
    name: "beef",
    price: "18.99",
  },
  {
    id: 3,
    name: "eggs",
    price: "6.99",
  },
];

app.get("/", (req, res) => {
  res.send({ msg: "Hello World <3" });
});

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));

  return res.send(mockUsers);
});

app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...body,
  };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ mesg: "Bad request, invalid ID" });
  }

  const findUser = mockUsers.find((user) => user.id === parsedId);

  if (!findUser) {
    return res.sendStatus(404);
  }
  return res.send(findUser);
});

app.get("/api/products", (req, res) => {
  res.send(mockProducts);
});

app.listen(PORT, () => {
  console.log("Running Port:", PORT);
});
