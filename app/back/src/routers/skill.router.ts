/**
 * ROUTEUR DE GESTION DES COMPÉTENCES
 * 
 * Ce routeur définit les routes liées à la gestion des compétences
 * dans l'application SkillSwap. Il est volontairement simple car
 * les compétences sont principalement en lecture seule.
 * 
 * Routes disponibles :
 * - GET / : Récupération de toutes les compétences disponibles
 * 
 * Fonctionnalités :
 * - Liste complète des compétences pour les formulaires de sélection
 * - Données triées alphabétiquement pour faciliter la navigation
 * - Endpoint public accessible sans authentification
 * - Support pour les systèmes de filtrage et recherche
 * 
 * Utilisation frontend :
 * - Sélection de compétences lors de l'inscription
 * - Filtres de recherche par compétences
 * - Autocomplétion dans les formulaires
 * - Affichage des compétences dans les profils
 * 
 * Évolutions futures possibles :
 * - Ajout de compétences par les utilisateurs
 * - Catégorisation des compétences
 * - Statistiques d'utilisation des compétences
 * - Suggestions de compétences populaires
 * 
 * Sécurité :
 * - Route publique, pas d'authentification requise
 * - Lecture seule, pas de risque de modification
 * - Données cachées côté frontend pour les performances
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Router } from "express";
import skillController from "../controllers/skill.controller";

// Create Express router instance for skill routes
const skillRouter = Router();

// Public route to get all available skills (sorted alphabetically)
skillRouter.get("/", skillController.getAllSkills);

export default skillRouter;
