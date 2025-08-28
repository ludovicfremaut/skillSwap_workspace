/**
 * MODÈLE ROLE - SYSTÈME DE PERMISSIONS ET RÔLES UTILISATEUR
 * 
 * Ce modèle Sequelize définit les rôles d'utilisateurs dans l'application
 * SkillSwap. Il permet de gérer les permissions et niveaux d'accès
 * selon le statut de chaque membre de la communauté.
 * 
 * Fonctionnalités principales :
 * - Définition des rôles avec noms explicites
 * - Attribution de permissions selon le niveau
 * - Gestion hiérarchique des accès
 * - Extensibilité pour nouveaux rôles futurs
 * 
 * Rôles disponibles dans l'application :
 * - Admin : Accès complet à toutes les fonctionnalités
 * - Modérateur : Gestion du contenu et modération
 * - Membre : Utilisateur standard avec accès normal
 * - Invité : Accès limité pour découverte de l'app
 * 
 * Structure de données :
 * - id : Identifiant unique auto-incrémenté (PRIMARY KEY)
 * - name : Nom du rôle en français (TEXT, obligatoire)
 * - Relations : hasMany Users pour attribution multiple
 * 
 * Hiérarchie des permissions :
 * - Admin > Modérateur > Membre > Invité
 * - Permissions héritées du niveau supérieur
 * - Contrôle d'accès basé sur le rôle (RBAC)
 * 
 * Utilisation dans l'application :
 * - Middleware d'authentification pour protection routes
 * - Interface d'administration pour gestion utilisateurs
 * - Affichage conditionnel selon permissions
 * - Audit et traçabilité des actions sensibles
 * 
 * Sécurité :
 * - Validation stricte des rôles attribués
 * - Protection contre l'escalade de privilèges
 * - Logs des changements de rôles
 * - Révocation possible des permissions
 * 
 * Performance :
 * - Cache des rôles pour éviter requêtes répétées
 * - Index sur name pour recherches rapides
 * - Relations optimisées avec les utilisateurs
 * 
 * Extensibilité :
 * - Facilité d'ajout de nouveaux rôles
 * - Support pour permissions granulaires futures
 * - Compatible avec systèmes d'autorisation complexes
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 * @requires sequelize ORM pour définition du modèle
 */

import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

// Role model class with TypeScript interface
export default class Role extends Model {
  public id!: number;     // Unique role identifier (auto-increment)
  public name!: string;   // Role name in French (Admin, Modérateur, etc.)
}

// Initialize Role model with schema definition
Role.init(
  {
    name: {
      type: DataTypes.TEXT,         // Role name as text field
      allowNull: false,             // Required field for role identification
    },
  },
  {
    sequelize,                      // Database connection instance
    tableName: "role",              // Explicit table name in database
  },
);
