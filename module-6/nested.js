const express = require("express");
const app = express();

app.use(express.json());

let projects = [
  {
    id: 1,
    name: "Website Redesign",
    tasks: [
      { id: 1, title: "Mockups", done: true },
      { id: 2, title: "Build homepage", done: false },
    ],
  },
  { id: 2, name: "API Migration", tasks: [] },
];

// GET all projects
app.get("/projects", (req, res) => {
  res.json(projects);
});

// GET tasks of a specific project
app.get("/projects/:id/tasks", (req, res) => {
  const projectId = parseInt(req.params.id);

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(project.tasks);
});

// POST add task to a project
app.post("/projects/:id/tasks", (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  // Generate task ID inside this project
  const nextTaskId =
    project.tasks.length > 0
      ? Math.max(...project.tasks.map((t) => t.id)) + 1
      : 1;

  const newTask = {
    id: nextTaskId,
    title,
    done: false,
  };

  project.tasks.push(newTask);

  res.status(201).json(newTask);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Nested API running at http://localhost:${PORT}`);
});
