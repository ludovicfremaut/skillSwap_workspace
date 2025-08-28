/**
 * MIDDLEWARE DE VALIDATION DES DONNÉES D'AUTHENTIFICATION
 * 
 * Ce middleware valide les données d'authentification (email et mot de passe)
 * avant qu'elles soient traitées par les contrôleurs. Il utilise Zod pour
 * effectuer une validation stricte et renvoie des erreurs détaillées.
 * 
 * Fonctionnalités :
 * - Validation des champs email et password selon le schéma défini
 * - Validation du format email (RFC 5322)
 * - Validation de la complexité du mot de passe
 * - Retour d'erreurs détaillées avec champs concernés
 * - Protection contre les données malformées ou malveillantes
 * 
 * Utilisation :
 * - Routes de connexion (/login)
 * - Routes d'inscription (/register)
 * - Toute route nécessitant des identifiants
 * 
 * Avantages de Zod :
 * - Validation type-safe avec TypeScript
 * - Messages d'erreur personnalisables
 * - Validation synchrone et performante
 * - Parsing automatique des données
 * 
 * Gestion d'erreurs :
 * - Erreurs de validation : 400 Bad Request avec détails
 * - Erreurs serveur : 500 Internal Server Error
 * - Format standardisé pour les erreurs côté frontend
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import authSchema from "../schemas/auth.schema";

// Middleware to validate authentication data (email, password)
export const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // console.log("Je suis dans validateAuth");
  
  try {
    // Validate request body against auth schema (email, password format)
    authSchema.parse(req.body);
    
    next(); // Data is valid, proceed to next middleware/controller
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      // Return detailed validation errors to frontend
      res.status(400).json({
        message: "Données invalides",
        errors: error.errors.map((err) => ({
          field: err.path.join("."), // Field path (e.g., "email", "password")
          message: err.message, // Error message for this field
        })),
      });
      return;
    }

    // Handle unexpected errors
    console.error("Erreur inattendue dans validateAuth :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur", error: (error as Error).message });
  }
};
