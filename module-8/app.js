// app.js
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const notesRouter = require("./notes");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use("/notes", notesRouter);

// List all tasks
app.get("/tasks", async (req, res, next) => {
  try {
    const where = {};

    if (req.query.done !== undefined) {
      where.done = req.query.done === "true";
    }

    if (req.query.tag) {
      where.tag = req.query.tag;
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// Get one task
app.get("/tasks/:id", async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Create a task
app.post("/tasks", async (req, res) => {
  const { title, tag } = req.body;

  const task = await prisma.task.create({
    data: {
      title,
      tag,
    },
  });

  res.json(task);
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, done, tag } = req.body;

  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: {
      title,
      done,
      tag,
    },
  });

  res.json(updatedTask);
});

// Delete a task
app.delete("/tasks/:id", async (req, res, next) => {
  try {
    await prisma.task.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Task not found" });
    }
    next(err);
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Tasks API running at http://localhost:${PORT}`);
});
