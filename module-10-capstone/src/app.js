const express = require('express');
const notesRouter = require('./routes/notes');
const { validateNote } = require('./middleware/validate');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/notes', notesRouter);

app.use(errorHandler);

module.exports = app;
