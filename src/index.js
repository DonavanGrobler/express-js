import express from "express";
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator";
import {
  createUserValidationSchema,
  getUserValidationSchema,
} from "../utils/validationSchemas.js";

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

app.listen(PORT, () => {
  console.log("Running Port:", PORT);
});

const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;

  next();
};

app.get("/", (req, res) => {
  res.send({ msg: "Hello World <3" });
});

app.get("/api/users", checkSchema(getUserValidationSchema), (req, res) => {
  const result = validationResult(req);
  console.log(result);
  const {
    query: { filter, value },
  } = req;

  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));

  return res.send(mockUsers);
});

app.post("/api/users", checkSchema(createUserValidationSchema), (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const data = matchedData(req);

  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...data,
  };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) {
    return res.sendStatus(404);
  }
  return res.send(findUser);
});

app.get("/api/products", (req, res) => {
  res.send(mockProducts);
});

app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  mockUsers.splice(findUserIndex, 1);

  return res.sendStatus(200);
});
