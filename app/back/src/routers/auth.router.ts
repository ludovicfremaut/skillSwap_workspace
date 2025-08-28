/**
 * ROUTEUR D'AUTHENTIFICATION
 * 
 * Ce routeur définit toutes les routes liées à l'authentification des utilisateurs.
 * Il organise les endpoints pour la connexion, déconnexion, inscription et 
 * vérification du statut d'authentification.
 * 
 * Routes disponibles :
 * - POST /login : Connexion utilisateur avec email/password
 * - POST /logout : Déconnexion utilisateur
 * - POST /register : Inscription de nouveau utilisateur
 * - GET /check : Vérification du statut d'authentification
 * 
 * Middlewares utilisés :
 * - validateAuth : Validation des données d'entrée (email, password)
 * - moderateProfile : Validation et modération des données de profil
 * - verifyToken : Vérification du token JWT pour routes protégées
 * 
 * Sécurité implémentée :
 * - Validation des inputs avant traitement
 * - Vérification des tokens JWT pour routes sensibles
 * - Gestion d'erreurs appropriée pour chaque endpoint
 * - Protection contre les attaques par injection
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validateAuth } from "../middleware/validate-auth";
import { moderateProfile } from "../middleware/validation-register";
import { verifyToken } from "../middleware/auth.middleware";

// Create Express router instance for authentication routes
const authRouter = Router();

// console.log("I'm in the router");

// Public authentication routes
authRouter.post("/login", validateAuth, authController.login); // User login
authRouter.post("/logout", authController.logout); // User logout (no validation needed)

// User registration with validation and profile moderation
authRouter.post(
  "/register",
  validateAuth, // Validate email/password format
  moderateProfile, // Validate and moderate profile data
  authController.register,
);

// Protected route to check current authentication status
authRouter.get("/check", verifyToken, (req, res) => {
  try {
    // If we reach here, token is valid (verified by middleware)
    res.status(200).json({
      authenticated: true,
      user: req.user, // User data attached by verifyToken middleware
    });
  } catch (error) {
    // This should rarely execute as verifyToken handles most errors
    res.status(401).json({
      authenticated: false,
      message: "Non authentifié",
    });
  }
});

export default authRouter;
