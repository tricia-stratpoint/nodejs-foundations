import { Request, Response, NextFunction } from "express";

// --- Custom error class ---
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// --- Typed request body ---
interface CreateTaskBody {
  title: string;
}

// --- Validation middleware ---
export function validateCreateTask(
  req: Request<{}, {}, CreateTaskBody>,
  _res: Response,
  next: NextFunction,
) {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return next(new HttpError(400, "title is required"));
  }

  if (title.length < 1 || title.length > 100) {
    return next(
      new HttpError(400, "title must be between 1 and 100 characters"),
    );
  }

  next();
}

// --- Generic validation factory ---
type Rule = (value: any) => string | null;

type ValidationRules = {
  [key: string]: Rule[];
};

export function validateBody(rules: ValidationRules) {
  return (req: Request, _res: Response, next: NextFunction) => {
    for (const field in rules) {
      const value = req.body[field];

      for (const rule of rules[field]) {
        const error = rule(value);

        if (error) {
          return next(new HttpError(400, error));
        }
      }
    }

    next();
  };
}
