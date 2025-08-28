/**
 * CONFIGURATION PRINCIPALE DE L'APPLICATION EXPRESS
 * 
 * Ce fichier configure l'application Express principale pour SkillSwap.
 * Il définit tous les middlewares nécessaires, les paramètres CORS,
 * la gestion des cookies, et organise toutes les routes de l'API.
 * 
 * Fonctionnalités configurées :
 * - Gestion des variables d'environnement
 * - Middlewares de sécurité (CORS, cookies)
 * - Parsing des données JSON et URL-encoded
 * - Routage vers les différents modules (auth, users, skills, services, messages)
 * - Authentification pour les routes protégées
 * 
 * Structure des routes :
 * - /api/auth : Authentification (login, register, logout)
 * - /api/users : Gestion des utilisateurs
 * - /api/skills : Gestion des compétences
 * - /api/services : Gestion des services offerts/demandés
 * - /api/messages : Système de messagerie (route protégée)
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import "dotenv/config"; // Load environment variables from .env file
import express from "express";
import authRouter from "./src/routers/auth.router";
import userRouter from "./src/routers/user.router";
import skillRouter from "./src/routers/skill.router";
import cookieParser from "cookie-parser";
import cors from "cors";
import serviceRouter from "./src/routers/service.router";
import messageRouter from "./src/routers/message.router";
import { verifyToken } from "./src/middleware/auth.middleware";

// Create Express application instance
const app = express();

// Enable cookie parsing for authentication tokens
app.use(cookieParser());

// Configure CORS to allow frontend communication
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend development server URL
    credentials: true, // Allow cookies to be sent with requests
  }),
);

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Public routes (no authentication required)
app.use("/api/auth", authRouter); // Authentication endpoints
app.use("/api/users", userRouter); // User management endpoints
app.use("/api/skills", skillRouter); // Skills management endpoints

// Semi-protected routes
app.use("/api/services", serviceRouter); // Services management endpoints

// Protected routes (authentication required)
app.use("/api/messages", verifyToken, messageRouter); // Messaging system endpoints

export default app;