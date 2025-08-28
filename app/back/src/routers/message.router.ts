/**
 * ROUTEUR DE GESTION DES MESSAGES
 * 
 * Ce routeur définit toutes les routes liées au système de messagerie
 * dans l'application SkillSwap. Il permet aux utilisateurs de communiquer
 * directement pour organiser leurs échanges de compétences.
 * 
 * Routes disponibles :
 * - GET /last-conversations/:userId : Dernières conversations d'un utilisateur
 * - GET /:userId/:contactId : Conversation complète entre deux utilisateurs
 * - POST /:contactId : Envoi d'un nouveau message à un contact
 * 
 * Fonctionnalités :
 * - Messagerie privée entre utilisateurs authentifiés
 * - Historique complet des conversations
 * - Envoi de messages en temps réel
 * - Liste des dernières conversations actives
 * - Tri chronologique des messages
 * 
 * Sécurité implémentée :
 * - Authentification JWT obligatoire (middleware appliqué dans app.ts)
 * - Vérification des permissions d'accès aux conversations
 * - Protection contre l'accès non autorisé aux messages privés
 * - Validation des paramètres utilisateur
 * 
 * Utilisation dans l'application :
 * - Négociation des services entre utilisateurs
 * - Coordination des échanges de compétences
 * - Support et assistance entre membres
 * - Feedback après réalisation des services
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Router } from "express";
import messageController from "../controllers/message.controller";

// Create Express router instance for message routes
const messageRouter = Router();

// Get latest conversations for a user (list of recent contacts)
messageRouter.get("/last-conversations/:userId", messageController.getLatestMessagesForUser);

// Get complete conversation between two users (message history)
messageRouter.get("/:userId/:contactId", messageController.getConversation);

// Send a new message to a contact
messageRouter.post("/:contactId", messageController.createMessage);

export default messageRouter;