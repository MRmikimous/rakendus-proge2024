import express from "express";
import jwt from "jsonwebtoken"

const router = express.Router();
export default router;

const SECRET = "80085";

router.get("/", (req, res) => {
  const name = req.body.name;
  const token = jwt.sign({ name }, SECRET);

  res.json({ token });
});

router.post("/", (req, res) => {
  const token = req.body.token;

  if (jwt.verify(token, SECRET)) {
    res.status(200).json({ message: "Valid token" });
  } else {
    res.status(401).json({ error: "Invalid token" });
  }

});