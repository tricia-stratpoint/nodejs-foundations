const express = require('express');
const db = require('../db');
const { validateNote } = require('../middleware/validate');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { tag, q, sort } = req.query;
    const where = {};
    if (tag) where.tag = tag;
    if (q) {
      where.OR = [
        { title: { contains: q } },
        { content: { contains: q } },
      ];
    }

    const validFields = ['id', 'title', 'content', 'tag', 'createdAt', 'updatedAt'];
    const validDirections = ['asc', 'desc'];
    let orderBy = { createdAt: 'desc' };
    if (sort) {
      const [field, direction] = sort.split(':');
      if (validFields.includes(field) && validDirections.includes(direction)) {
        orderBy = { [field]: direction };
      }
    }

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const isPaginated = !isNaN(page) && !isNaN(limit);

    if (isPaginated) {
      const [notes, total] = await Promise.all([
        db.note.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
        db.note.count({ where }),
      ]);
      return res.json({ data: notes, total, page, limit });
    }

    const notes = await db.note.findMany({ where, orderBy });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: { status: 500, message: 'Internal server error' } });
  }
});

router.post('/', validateNote, async (req, res) => {
  try {
    const { title, content, tag } = req.body;
    const note = await db.note.create({
      data: { title, content, tag },
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: { status: 500, message: 'Internal server error' } });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const note = await db.note.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!note) {
      return res.status(404).json({ error: { status: 404, message: 'Note not found' } });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: { status: 500, message: 'Internal server error' } });
  }
});

router.put('/:id', validateNote, async (req, res) => {
  try {
    const { title, content, tag } = req.body;
    const note = await db.note.update({
      where: { id: Number(req.params.id) },
      data: { title, content, tag },
    });
    res.json(note);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: { status: 404, message: 'Note not found' } });
    }
    res.status(500).json({ error: { status: 500, message: 'Internal server error' } });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.note.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: { status: 404, message: 'Note not found' } });
    }
    res.status(500).json({ error: { status: 500, message: 'Internal server error' } });
  }
});

module.exports = router;
