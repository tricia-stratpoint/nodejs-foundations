// src/users.ts
import { Router, Request, Response } from "express";

// --- Interfaces ---
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "member";
  bio?: string;
}

export interface CreateUserBody {
  name: string;
  email: string;
  role: "admin" | "member";
  bio?: string;
}

export interface UpdateUserBody {
  name?: string;
  email?: string;
  role?: "admin" | "member";
  bio?: string;
}

// --- In-memory store ---
let users: User[] = [];
let nextId = 1;

// --- Router ---
const router = Router();

// GET /users
router.get("/", (_req: Request, res: Response) => {
  res.json(users);
});

// GET /users/:id
router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// POST /users
router.post("/", (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  const { name, email, role, bio } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required" });
  }
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "email is required" });
  }
  if (role !== "admin" && role !== "member") {
    return res.status(400).json({ error: "role must be 'admin' or 'member'" });
  }

  const user: User = { id: nextId++, name, email, role, ...(bio && { bio }) };
  users.push(user);
  res.status(201).json(user);
});

// PUT /users/:id
router.put(
  "/:id",
  (req: Request<{ id: string }, {}, UpdateUserBody>, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.name !== undefined) user.name = req.body.name;
    if (req.body.email !== undefined) user.email = req.body.email;
    if (req.body.role !== undefined) user.role = req.body.role;
    if (req.body.bio !== undefined) user.bio = req.body.bio;

    res.json(user);
  },
);

// DELETE /users/:id
router.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users.splice(idx, 1);
  res.status(204).send();
});

export default router;
