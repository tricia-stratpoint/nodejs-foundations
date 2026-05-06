const request = require("supertest");
const createApp = require("./comment-api");

describe("Comments API", () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  describe("POST /comments", () => {
    test("creates a comment with text and author", async () => {
      const res = await request(app)
        .post("/comments")
        .send({ text: "Hello", author: "Tricia" });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        id: 1,
        text: "Hello",
        author: "Tricia",
      });
    });

    test("returns 400 if text is missing", async () => {
      const res = await request(app)
        .post("/comments")
        .send({ author: "Tricia" });

      expect(res.status).toBe(400);
    });

    test("returns 400 if author is missing", async () => {
      const res = await request(app).post("/comments").send({ text: "Hello" });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /comments", () => {
    test("returns all comments", async () => {
      await request(app).post("/comments").send({ text: "Hi", author: "A" });
      await request(app).post("/comments").send({ text: "Hello", author: "B" });

      const res = await request(app).get("/comments");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe("GET /comments/:id", () => {
    test("returns one comment", async () => {
      await request(app).post("/comments").send({ text: "Hi", author: "A" });

      const res = await request(app).get("/comments/1");

      expect(res.status).toBe(200);
      expect(res.body.text).toBe("Hi");
    });

    test("returns 404 for missing id", async () => {
      const res = await request(app).get("/comments/999");

      expect(res.status).toBe(404);
    });
  });
});
