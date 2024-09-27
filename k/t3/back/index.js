import express from "express";

const app = express();

app.use(express.json())

app.listen(42069)

app.get("/", (_, res) => {
  res.end("Hello World!")
})