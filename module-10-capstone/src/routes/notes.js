const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notes = await db.note.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: { status: 500, message: 'Internal server error' } });
  }
});

router.post('/', async (req, res) => {
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

module.exports = router;
