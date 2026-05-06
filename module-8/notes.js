const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// CREATE note
router.post("/", async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const note = await prisma.note.create({
      data: { title, content },
    });

    res.json(note);
  } catch (err) {
    next(err);
  }
});

// GET all notes
router.get("/", async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(notes);
  } catch (err) {
    next(err);
  }
});

// GET one note
router.get("/:id", async (req, res, next) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json(note);
  } catch (err) {
    next(err);
  }
});

// UPDATE note
router.put("/:id", async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const updated = await prisma.note.update({
      where: { id: Number(req.params.id) },
      data: { title, content },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE note
router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.note.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
