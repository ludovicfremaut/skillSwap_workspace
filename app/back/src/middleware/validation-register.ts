import { Request, Response, NextFunction } from "express";
import leoProfanity from "leo-profanity";
import badWords from "french-badwords-list";

leoProfanity.add(badWords.array);

export const moderateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { description = "" } = req.body;

    // Check description
    if (leoProfanity.check(description)) {
      res.status(400).json({ error: "Description non appropriée" });
      return;
    }

    next(); // Call next() to continue the middleware chain
  } catch (error) {
    console.error("Erreur lors de la vérification de la description :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
