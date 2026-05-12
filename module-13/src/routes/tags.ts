// src/routes/tags.ts
import { Router, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { createTagSchema } from "../schemas";
import { validate } from "../validate";
import { asyncHandler } from "../async-handler";

const router = Router();

// List all tags
router.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
    });
    res.json(tags);
  }),
);

// Create a tag
router.post(
  "/",
  validate(createTagSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const tag = await prisma.tag.create({ data: req.body });
      res.status(201).json(tag);
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        res.status(409).json({ error: { status: 409, message: "Tag name already exists" } });
        return;
      }
      throw err;
    }
  }),
);

export default router;
