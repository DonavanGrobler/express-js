import { Router } from "express";

import { mockProducts } from "../../utils/mockData.js";

const router = Router();

router.get("/products", (req, res) => {
  if (req.signedCookies.hello && req.signedCookies.hello === "world")
    return res.send(mockProducts);

  return res.status(403).send({ msg: "Sorry. You need the correct cookie" });
});

export default router;
