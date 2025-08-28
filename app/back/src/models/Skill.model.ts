/**
 * MODÈLE COMPÉTENCE SEQUELIZE
 * 
 * Ce modèle représente les compétences dans l'application SkillSwap.
 * Les compétences sont les unités de base autour desquelles s'organisent
 * les échanges entre utilisateurs. Elles peuvent être offertes ou demandées.
 * 
 * Structure simple :
 * - ID unique auto-incrémenté
 * - Nom de la compétence (unique)
 * 
 * Relations :
 * - Skill belongsToMany Users (many-to-many via table de jointure)
 * - Une compétence peut être maîtrisée par plusieurs utilisateurs
 * - Un utilisateur peut avoir plusieurs compétences
 * 
 * Exemples de compétences :
 * - "Développement web", "Cuisine", "Jardinage", "Langues étrangères"
 * - "Réparation informatique", "Photographie", "Musique", etc.
 * 
 * Utilisation :
 * - Système de tags pour les services
 * - Recherche d'utilisateurs par compétences
 * - Matching entre offres et demandes
 * - Profils utilisateurs avec compétences multiples
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

// Skill model class extending Sequelize Model
export default class Skill extends Model {
  public id!: number; // Primary key, auto-incremented
  public name!: string; // Skill name (unique identifier)
}

// Initialize Skill model with database schema
Skill.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false, // Skill name is required and must be unique
    },
  },
  {
    sequelize, // Database connection instance
    tableName: "skill", // Explicit table name
  },
);
