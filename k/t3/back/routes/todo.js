import express from "express";

const router = express.Router();
export default router;

/**
 * @typedef todo
 * @property {string} id
 * @property {string} name
 * @property {number} [priority=0]
 * @property {number} createdAt
 * @property {number=} updatedAt
 * @property {boolean} deleted
 * @property {boolean} completed
 */

/** @type {todo[]} */
const todos = [
  {
    id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
    name: "Asd",
    priority: 0,
    createdAt: 1727554589792,
    updatedAt: null,
    deleted: false,
    completed: false
  },
  {
    id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
    name: "Dsa",
    priority: 1,
    createdAt: 1727554599606,
    updatedAt: null,
    deleted: true,
    completed: true
  }];

router.get("/", (req, res) => {

  /** @type {todo[]} */
  const todo = todos.filter((todo) => !todo.deleted);

  res.status(200).json(todo);
});

router.post("/", (req, res) => {

  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  /** @type {todo} */
  const todo = {
    id: crypto.randomUUID(),
    name: req.body.name,
    priority: req.body.priority || 0,
    createdAt: Date.now(),
    updatedAt: undefined,
    deleted: false,
    completed: false
  };

  todos.push(todo);

  res.status(201).json(todo);

});

router.put("/", (req, res) => {

  if (!req.body.id) {
    return res.status(400).json({ error: "Id is required" });
  }

  /** @type {todo} */
  const todo = todos.find((t) => t.id === req.body.id);

  if (!todo) {
    return res.status(404).json({ error: "Not found" });
  }

  if (req.body.name !== undefined) {
    todo.name = req.body.name;
  }

  if (req.body.priority !== undefined) {
    todo.priority = req.body.priority;
  }

  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }

  if (req.body.deleted !== undefined) {
    todo.deleted = req.body.deleted;
  }

  todo.updatedAt = Date.now();

  res.status(200).json(todo);
});

router.delete("/", (req, res) => {

  if (!req.body.id) {
    return res.status(400).json({ error: "Id is required" });
  }

  /** @type {todo} */
  const todo = todos.find((t) => t.id === req.body.id);

  if (!todo) {
    return res.status(404).json({ error: "Not found" });
  }

  todo.deleted = true;
  res.status(204).json(todo);
});

router.get("/all", (req, res) => {
  res.status(200).json(todos);
})