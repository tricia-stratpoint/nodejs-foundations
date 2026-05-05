// tasks.js
const express = require("express");
const morgan = require("morgan");

function requestTimer(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const elapsed = Date.now() - start;
    console.log(`${req.method} ${req.path} took ${elapsed}ms`);
  });

  next();
}

// Custom error class for HTTP errors
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function fakeAuth(req, res, next) {
  const apiKey = req.header("X-API-Key");

  if (apiKey !== "secret123") {
    return next(new HttpError(401, "Unauthorized: missing or invalid API key"));
  }

  next();
}

const app = express();
app.use(express.json());
app.use(requestTimer);
app.use(morgan("dev"));

let tasks = [{ id: 1, title: "Learn middleware", done: false }];
let nextId = 2;

// Validation middleware for POST and PUT
function validateTask(req, res, next) {
  const errors = [];
  const { title } = req.body || {};

  // Required check
  if (title === undefined || title === null) {
    errors.push("title is required");
  }

  // Type check
  if (title !== undefined && typeof title !== "string") {
    errors.push("title must be a string");
  }

  // Length check
  if (typeof title === "string" && title.length > 100) {
    errors.push("title must be 100 characters or less");
  }

  // If any errors, return all of them
  if (errors.length > 0) {
    return next(
      new HttpError(400, "Validation failed", errors)
    );
  }

  next();
}

// Routes
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res, next) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return next(new HttpError(404, "Task not found"));
  res.json(task);
});

// POST protected by fakeAuth
app.post("/tasks", fakeAuth, validateTask, (req, res) => {
  const task = { id: nextId++, title: req.body.title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT protected by fakeAuth
app.put("/tasks/:id", fakeAuth, validateTask, (req, res, next) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return next(new HttpError(404, "Task not found"));

  task.title = req.body.title;
  if (req.body.done !== undefined) task.done = req.body.done;

  res.json(task);
});

// DELETE protected by fakeAuth
app.delete("/tasks/:id", fakeAuth, (req, res, next) => {
  const idx = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (idx === -1) return next(new HttpError(404, "Task not found"));

  tasks.splice(idx, 1);
  res.status(204).send();
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  next(new HttpError(404, `Route not found: ${req.method} ${req.path}`));
});

// Global error handler (4 arguments!)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  console.error(`[ERROR] ${status} ${message}`);
  res.status(status).json({
    error: {
      status,
      message,
    },
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Tasks API running at http://localhost:${PORT}`);
});
