/**
 * ROUTEUR DE GESTION DES UTILISATEURS
 * 
 * Ce routeur définit toutes les routes liées à la gestion des utilisateurs
 * dans l'application SkillSwap. Il organise les endpoints pour la consultation,
 * modification et recherche d'utilisateurs, ainsi que l'accès à leurs données associées.
 * 
 * Types de routes :
 * - Routes publiques : consultation de profils, recherche d'utilisateurs
 * - Routes protégées : profil personnel, données sensibles
 * - Routes CRUD : opérations de base sur les utilisateurs
 * - Routes relationnelles : accès aux services, messages, avis
 * 
 * Endpoints disponibles :
 * - GET /me : Profil de l'utilisateur connecté (protégé)
 * - GET /random : 6 utilisateurs aléatoires pour l'accueil
 * - GET /latest : 6 derniers utilisateurs inscrits
 * - GET /limit : Pagination des utilisateurs (10 par 10)
 * - GET /search : Recherche par compétence et localisation
 * - CRUD complet : GET /, GET /:id, PUT /:id, DELETE /:id
 * - Relations : services, messages, avis d'un utilisateur
 * 
 * Sécurité :
 * - Authentification JWT pour routes sensibles
 * - Contrôle d'accès aux données personnelles
 * - Validation des permissions utilisateur
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Router } from "express";
import userController from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth.middleware";

// Create Express router instance for user routes
const userRouter = Router();

// console.log("I'm in the router");

// Protected route: get authenticated user's profile data
userRouter.get("/me", verifyToken, userController.getCurrentUser);

// Public routes for user discovery and display
userRouter.get("/random", userController.getSixRandomUsers); // Random users for homepage
userRouter.get("/latest", userController.getSixLatestUsers); // Recently joined users
userRouter.get("/limit", userController.getTenUsers); // Paginated user list

// Search functionality
userRouter.get("/search", userController.getUsersBySkillAndZipcode); // Search by skill/location

// Standard CRUD operations for users
userRouter.get("/", userController.getAllUsers); // Get all users with skills
userRouter.get("/:id", userController.getOneUser); // Get specific user profile
userRouter.put("/:id", userController.updateUser); // Update user information
userRouter.delete("/:id", userController.deleteUser); // Delete user account

// Related data routes - User's services
userRouter.get("/:id/services", userController.getUserServices); // Get user's services

// Advanced route with raw SQL for richer service data (protected)
userRouter.get(
  "/:id/services-raw",
  verifyToken, // Requires authentication for detailed service data
  userController.getUsersServicesRaw,
);

// Related data routes - User's communications
userRouter.get("/:id/messages", userController.getUserMessages); // Get user's messages

// Related data routes - User's reviews and ratings
userRouter.get("/:id/reviews", userController.getUserReviews); // Get user's reviews

export default userRouter;
