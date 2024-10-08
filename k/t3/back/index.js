import express from "express";
import cors from "cors"
import morgan from "morgan";

import todo from "./routes/todo.js";
import jwt from "./routes/jwt.js";

const app = express();

app.listen(42069)

app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))

app.use("/todo", todo)
app.use("/jwt", jwt)

app.get("/", (_, res) => {
  res.end("Hello World!")
})

