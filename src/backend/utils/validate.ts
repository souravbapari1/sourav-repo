import express from "express";
import { ValidationChain, validationResult } from "express-validator";
import { RunnableValidationChains } from "express-validator/lib/middlewares/schema";
export const validateRequest = (
  ...validations: RunnableValidationChains<ValidationChain>[]
) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next(); // Proceed to the next middleware or route handler
  };
};
