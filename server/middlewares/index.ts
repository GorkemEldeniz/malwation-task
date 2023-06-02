import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

//validator
export const validate = (validations: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ error: true, ...errors.array()[0] });
  };
};

export const handleError = (error: Error | any, res: Response) => {
  if (error) return res.status(400).send(error);
};
