// src/schemas.ts
import { z } from "zod";

// Schema for creating a note
export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, "title is required")
    .max(100, "title must be 100 characters or less"),
  content: z
    .string()
    .min(1, "content is required")
    .max(5000, "content must be 5000 characters or less"),
  tag: z.string().max(30).optional(),
});

// Schema for updating a note (all fields optional)
export const updateNoteSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  content: z.string().min(1).max(5000).optional(),
  tag: z.string().max(30).optional().nullable(),
});

// Schema for creating a tag
export const createTagSchema = z.object({
  name: z.string().min(1, "name is required").max(30, "name must be 30 characters or less"),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;

// Schema for query parameters on GET /notes
export const noteQuerySchema = z.object({
  tag: z.string().optional(),
  search: z.string().optional(),
});

// Infer TypeScript types from Zod schemas
// These types are automatically derived — no duplicate definitions!
export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
