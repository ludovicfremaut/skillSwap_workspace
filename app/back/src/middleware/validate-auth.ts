import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import authSchema from "../schemas/auth.schema";

export const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // console.log("Je suis dans validateAuth");
  try {
    // validate request body
    authSchema.parse(req.body);
    next(); // Pass to next controller
  } catch (error) {
    if (error instanceof ZodError) {
      // Return error if validation fails
      res.status(400).json({
        message: "Données invalides",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
      return;
    }

    console.error("Erreur inattendue dans validateAuth :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur", error: (error as Error).message });
  }
};
