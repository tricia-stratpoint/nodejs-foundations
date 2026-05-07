# Notes API

A REST API for managing personal notes, built with Node.js, Express, and SQLite via Prisma. Users can create, read, update, and delete notes. Each note has a title, content, an optional tag, and timestamps. The API includes input validation, consistent error handling, and integration tests.

## Prerequisites

- Node.js v18 or higher

## Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd module-10-capstone

# 2. Install dependencies
npm install

# 3. Copy the environment file
cp .env.example .env

# 4. Run database migrations
npm run db:migrate
```

## Running the server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

The server runs on `http://localhost:3000` by default.

## Running tests

```bash
npm test
```

## Endpoints

| Method | Route        | Description                       | Status codes    |
|--------|--------------|-----------------------------------|-----------------|
| GET    | /health      | Health check                      | 200             |
| GET    | /notes       | List all notes, newest first      | 200             |
| GET    | /notes/:id   | Get a single note                 | 200, 404        |
| POST   | /notes       | Create a new note                 | 201, 400        |
| PUT    | /notes/:id   | Update a note                     | 200, 400, 404   |
| DELETE | /notes/:id   | Delete a note                     | 204, 404        |

## Field rules

| Field     | Rules                                      |
|-----------|--------------------------------------------|
| title     | Required. String. 1–100 characters.        |
| content   | Required. String. 1–5000 characters.       |
| tag       | Optional. String. Max 30 characters.       |

## Example

**POST /notes**

Request:
```json
{
  "title": "Shopping list",
  "content": "Milk, bread, eggs",
  "tag": "personal"
}
```

Response `201 Created`:
```json
{
  "id": 1,
  "title": "Shopping list",
  "content": "Milk, bread, eggs",
  "tag": "personal",
  "createdAt": "2025-10-28T03:15:00.000Z",
  "updatedAt": "2025-10-28T03:15:00.000Z"
}
```

**Error response format:**
```json
{
  "error": {
    "status": 400,
    "message": "title is required"
  }
}
```
