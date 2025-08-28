/**
 * ROUTEUR DE GESTION DES SERVICES
 * 
 * Ce routeur définit toutes les routes liées à la gestion des services
 * dans l'application SkillSwap. Les services représentent les échanges
 * de compétences entre utilisateurs et nécessitent une authentification.
 * 
 * Routes disponibles :
 * - POST / : Création d'un nouveau service (proposition d'échange)
 * - POST /:id/status : Mise à jour du statut d'un service
 * - GET /me : Récupération des services de l'utilisateur connecté
 * 
 * Fonctionnalités :
 * - Proposition de services entre utilisateurs
 * - Gestion des statuts (en attente, accepté, terminé, annulé)
 * - Consultation de l'historique personnel des services
 * - Suivi de l'évolution des échanges
 * 
 * Sécurité implémentée :
 * - Authentification JWT obligatoire pour toutes les routes
 * - Vérification des permissions utilisateur
 * - Protection contre l'accès non autorisé aux données
 * - Validation des données d'entrée
 * 
 * Flux d'utilisation :
 * 1. Un utilisateur propose un service à un autre
 * 2. Le destinataire peut accepter, refuser ou ignorer
 * 3. Les deux parties peuvent suivre l'évolution du service
 * 4. Le service peut être marqué comme terminé ou annulé
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Router } from "express";
import { serviceController } from "../controllers/service.controller";
import { verifyToken } from "../middleware/auth.middleware";

// Create Express router instance for service routes
const serviceRouter = Router();

// Create a new service proposal (protected route)
serviceRouter.post("/", verifyToken, serviceController.createService);

// Update service status (accept, complete, cancel) (protected route)
serviceRouter.post("/:id/status", verifyToken, serviceController.updateStatus);

// Get all services for authenticated user (sent and received) (protected route)
serviceRouter.get("/me", verifyToken, serviceController.getAllForLoggedUser);

export default serviceRouter;
