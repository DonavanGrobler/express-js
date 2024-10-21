import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";

import {
  createUserValidationSchema,
  getUserValidationSchema,
} from "../../utils/validationSchemas.js";
import { mockUsers } from "../../utils/mockData.js";
import { resolveIndexByUserId } from "../../utils/middlewares.js";
import { User } from "../mongoose/schemas/user.js";

const router = Router();

router.get("/users", checkSchema(getUserValidationSchema), (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));

  return res.send(mockUsers);
});

router.post(
  "/users",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());

    const data = matchedData(req);

    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }
);

router.get("/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = mockUsers[findUserIndex];

  if (!findUser) {
    return res.sendStatus(404);
  }

  return res.send(findUser);
});

router.put("/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };

  return res.sendStatus(200);
});

router.patch("/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return res.sendStatus(200);
});

router.delete("/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  mockUsers.splice(findUserIndex, 1);

  return res.sendStatus(200);
});

export default router;
