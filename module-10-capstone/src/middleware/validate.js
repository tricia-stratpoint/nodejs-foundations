function validateNote(req, res, next) {
  const { title, content, tag } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    const err = new Error('title is required');
    err.status = 400;
    return next(err);
  }

  if (title.length > 100) {
    const err = new Error('title must be 100 characters or fewer');
    err.status = 400;
    return next(err);
  }

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    const err = new Error('content is required');
    err.status = 400;
    return next(err);
  }

  if (content.length > 5000) {
    const err = new Error('content must be 5000 characters or fewer');
    err.status = 400;
    return next(err);
  }

  if (tag !== undefined && tag !== null) {
    if (typeof tag !== 'string') {
      const err = new Error('tag must be a string');
      err.status = 400;
      return next(err);
    }
    if (tag.length > 30) {
      const err = new Error('tag must be 30 characters or fewer');
      err.status = 400;
      return next(err);
    }
  }

  next();
}

module.exports = { validateNote };
