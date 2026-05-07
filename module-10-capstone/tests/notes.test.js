const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/db', () => ({
  note: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const db = require('../src/db');

beforeEach(() => {
  jest.clearAllMocks();
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
    const mockNote = {
      id: 1,
      title: 'Shopping list',
      content: 'Milk, bread, eggs',
      tag: 'personal',
      createdAt: '2025-10-28T03:15:00.000Z',
      updatedAt: '2025-10-28T03:15:00.000Z',
    };
    db.note.create.mockResolvedValue(mockNote);

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
    const mockNotes = [
      {
        id: 2,
        title: 'Second',
        content: 'Content 2',
        tag: null,
        createdAt: '2025-10-28T04:00:00.000Z',
        updatedAt: '2025-10-28T04:00:00.000Z',
      },
      {
        id: 1,
        title: 'First',
        content: 'Content 1',
        tag: null,
        createdAt: '2025-10-28T03:00:00.000Z',
        updatedAt: '2025-10-28T03:00:00.000Z',
      },
    ];
    db.note.findMany.mockResolvedValue(mockNotes);

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
    const mockNote = {
      id: 1,
      title: 'Single note',
      content: 'Some content',
      tag: null,
      createdAt: '2025-10-28T03:15:00.000Z',
      updatedAt: '2025-10-28T03:15:00.000Z',
    };
    db.note.findUnique.mockResolvedValue(mockNote);

    const res = await request(app).get('/notes/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.title).toBe('Single note');
  });

  test('returns 404 for a non-existent id', async () => {
    db.note.findUnique.mockResolvedValue(null);

    const res = await request(app).get('/notes/9999');
    expect(res.status).toBe(404);
    expect(res.body.error.status).toBe(404);
  });
});

describe('PUT /notes/:id', () => {
  test('updates a note and returns 200', async () => {
    const mockUpdated = {
      id: 1,
      title: 'Updated title',
      content: 'Updated content',
      tag: null,
      createdAt: '2025-10-28T03:15:00.000Z',
      updatedAt: '2025-10-28T05:00:00.000Z',
    };
    db.note.update.mockResolvedValue(mockUpdated);

    const res = await request(app)
      .put('/notes/1')
      .send({ title: 'Updated title', content: 'Updated content' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated title');
    expect(res.body.content).toBe('Updated content');
  });

  test('returns 404 for a non-existent id', async () => {
    const err = new Error('Record not found');
    err.code = 'P2025';
    db.note.update.mockRejectedValue(err);

    const res = await request(app)
      .put('/notes/9999')
      .send({ title: 'Updated title', content: 'Updated content' });
    expect(res.status).toBe(404);
    expect(res.body.error.status).toBe(404);
  });
});

describe('DELETE /notes/:id', () => {
  test('deletes a note and returns 204', async () => {
    db.note.delete.mockResolvedValue({});

    const res = await request(app).delete('/notes/1');
    expect(res.status).toBe(204);
  });

  test('returns 404 for a non-existent id', async () => {
    const err = new Error('Record not found');
    err.code = 'P2025';
    db.note.delete.mockRejectedValue(err);

    const res = await request(app).delete('/notes/9999');
    expect(res.status).toBe(404);
    expect(res.body.error.status).toBe(404);
  });
});
