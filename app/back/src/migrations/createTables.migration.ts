/**
 * MIGRATION DE CRÉATION DES TABLES - SCHÉMA DE BASE DE DONNÉES
 * 
 * Ce script de migration crée l'ensemble de la structure de base de données
 * pour l'application SkillSwap. Il utilise Sequelize ORM pour synchroniser
 * les modèles définis avec la base de données PostgreSQL.
 * 
 * Fonctionnalités principales :
 * - Suppression complète des tables existantes (environnement développement)
 * - Création automatique de toutes les tables selon les modèles Sequelize
 * - Génération des contraintes de clés étrangères et indexes
 * - Initialisation d'une base de données propre pour développement
 * 
 * Tables créées automatiquement :
 * - Users : Utilisateurs avec authentification et profils
 * - Roles : Rôles et permissions des utilisateurs
 * - Skills : Compétences disponibles dans l'application
 * - Services : Services échangés entre utilisateurs
 * - Messages : Système de messagerie entre utilisateurs
 * - Reviews : Évaluations et commentaires sur services
 * - Tables de liaison many-to-many (UserSkills, etc.)
 * 
 * Opérations de migration :
 * 1. DROP CASCADE : Suppression complète des tables existantes
 * 2. SYNC : Création des tables selon modèles Sequelize
 * 3. CONSTRAINTS : Application automatique des contraintes
 * 4. INDEXES : Création des index pour performance
 * 
 * Sécurité et précautions :
 * - ATTENTION : Script destructif qui efface toutes les données
 * - À utiliser uniquement en développement local
 * - Jamais en production sans sauvegarde préalable
 * - Cascade activé pour suppression des dépendances
 * 
 * Utilisation :
 * - Initialisation d'un environnement de développement neuf
 * - Reset complet de la base pour tests d'intégration
 * - Mise à jour majeure de schéma en développement
 * - Correction de problèmes de structure de données
 * 
 * Architecture générée :
 * - Relations one-to-many entre entités principales
 * - Tables de jointure pour relations many-to-many
 * - Contraintes d'intégrité référentielle
 * - Types de données optimisés (PostgreSQL)
 * 
 * Performance :
 * - Index automatiques sur clés primaires et étrangères
 * - Optimisation PostgreSQL pour requêtes complexes
 * - Structure normalisée pour éviter la redondance
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 * @requires sequelize Configuration ORM pour connexion PostgreSQL
 * @warning Script destructif - Development only
 */

import {
  Message,
  Review,
  Role,
  Service,
  Skill,
  User,
  sequelize,
} from "../models/associations";

console.log("Suppression des tables existantes...");
await sequelize.drop({ cascade: true }); // DESTRUCTIVE: Remove all existing tables

console.log("Définition des tables...");
await sequelize.sync(); // Create tables based on Sequelize models

console.log("Migration ok ! Fermeture de la connexion ...");
await sequelize.close(); // Close database connection
