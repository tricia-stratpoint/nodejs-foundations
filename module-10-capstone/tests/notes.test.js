const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');

beforeEach(async () => {
  await db.note.deleteMany();
});

afterAll(async () => {
  await db.$disconnect();
});

describe('GET /health', () => {
  test('returns { status: "ok" } with 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('POST /notes', () => {
  test('creates a note and returns 201', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'Shopping list', content: 'Milk, bread, eggs', tag: 'personal' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      title: 'Shopping list',
      content: 'Milk, bread, eggs',
      tag: 'personal',
    });
    expect(res.body.id).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
  });

  test('returns 400 when title is missing', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ content: 'Some content' });
    expect(res.status).toBe(400);
    expect(res.body.error.status).toBe(400);
    expect(res.body.error.message).toBe('title is required');
  });

  test('returns 400 when content is missing', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'A title' });
    expect(res.status).toBe(400);
    expect(res.body.error.status).toBe(400);
    expect(res.body.error.message).toBe('content is required');
  });

  test('returns 400 when title exceeds 100 characters', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'a'.repeat(101), content: 'Some content' });
    expect(res.status).toBe(400);
    expect(res.body.error.status).toBe(400);
  });

  test('returns 400 when content exceeds 5000 characters', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'A title', content: 'a'.repeat(5001) });
    expect(res.status).toBe(400);
    expect(res.body.error.status).toBe(400);
  });
});

describe('GET /notes', () => {
  test('returns all notes sorted newest first', async () => {
    await request(app).post('/notes').send({ title: 'First', content: 'Content 1' });
    await request(app).post('/notes').send({ title: 'Second', content: 'Content 2' });

    const res = await request(app).get('/notes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    const dates = res.body.map((n) => new Date(n.createdAt));
    expect(dates[0] >= dates[1]).toBe(true);
  });
});

describe('GET /notes/:id', () => {
  test('returns a single note with 200', async () => {
    const created = await request(app)
      .post('/notes')
      .send({ title: 'Single note', content: 'Some content' });
    const { id } = created.body;

    const res = await request(app).get(`/notes/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.title).toBe('Single note');
  });

  test('returns 404 for a non-existent id', async () => {
    const res = await request(app).get('/notes/9999');
    expect(res.status).toBe(404);
    expect(res.body.error.status).toBe(404);
  });
});

describe('PUT /notes/:id', () => {
  test('updates a note and returns 200', async () => {
    const created = await request(app)
      .post('/notes')
      .send({ title: 'Original title', content: 'Original content' });
    const { id } = created.body;

    const res = await request(app)
      .put(`/notes/${id}`)
      .send({ title: 'Updated title', content: 'Updated content' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated title');
    expect(res.body.content).toBe('Updated content');
  });
});

describe('DELETE /notes/:id', () => {
  test('deletes a note and returns 204', async () => {
    const created = await request(app)
      .post('/notes')
      .send({ title: 'To delete', content: 'Delete me' });
    const { id } = created.body;

    const res = await request(app).delete(`/notes/${id}`);
    expect(res.status).toBe(204);
  });

  test('returns 404 for a non-existent id', async () => {
    const res = await request(app).delete('/notes/9999');
    expect(res.status).toBe(404);
    expect(res.body.error.status).toBe(404);
  });
});
