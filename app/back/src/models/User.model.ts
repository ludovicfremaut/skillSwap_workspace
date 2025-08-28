/**
 * MODÈLE UTILISATEUR SEQUELIZE
 * 
 * Ce modèle définit la structure et les propriétés des utilisateurs dans la base de données.
 * Il gère toutes les informations personnelles des utilisateurs, leur authentification,
 * et leurs relations avec les autres entités de l'application SkillSwap.
 * 
 * Propriétés principales :
 * - Informations personnelles (nom, prénom, adresse)
 * - Authentification (email, mot de passe haché)
 * - Profil (photo, description, disponibilité)
 * - Relations (compétences, services, messages)
 * 
 * Relations Sequelize :
 * - User belongsToMany Skills (many-to-many via table de jointure)
 * - User hasMany Services (one-to-many)
 * - User hasMany Messages (one-to-many)
 * - User belongsTo Role (many-to-one)
 * 
 * Sécurité :
 * - Les mots de passe sont hachés avec Argon2 avant stockage
 * - Validation des données au niveau du modèle
 * - Timestamps automatiques pour audit
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";
import Skill from "./Skill.model";

// User model class extending Sequelize Model
export default class User extends Model {
  declare id: number; // Primary key, auto-incremented
  declare email: string; // Unique email for authentication
  declare password: string; // Hashed password (Argon2)
  declare firstname: string; // User's first name
  declare lastname: string; // User's last name
  declare street: string; // Street address
  declare zipcode: string; // Postal code
  declare city: string; // City name
  declare profile_picture: string; // URL to profile picture
  declare description: string; // User bio/description
  declare availability: string; // Availability status for services
  declare role_id: number | null; // Foreign key to role table

  // Sequelize association methods for skills
  declare addSkill: (skill: Skill) => Promise<void>; // Add single skill
  declare addSkills: (skill: Skill[]) => Promise<void>; // Add multiple skills
}

// Initialize User model with database schema
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Auto-increment primary key
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false, // Email is required for authentication
    },
    firstname: {
      type: DataTypes.TEXT,
      allowNull: false, // First name is required
    },
    lastname: {
      type: DataTypes.TEXT,
      allowNull: false, // Last name is required
    },
    street: {
      type: DataTypes.TEXT,
      allowNull: false, // Street address is required
    },
    zipcode: {
      type: DataTypes.TEXT,
      allowNull: false, // Postal code is required
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false, // City is required
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false, // Password is required (stored hashed)
    },
    profile_picture: {
      type: DataTypes.TEXT,
      allowNull: true, // Profile picture is optional (default avatar generated)
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false, // User description/bio is required
    },
    availability: {
      type: DataTypes.TEXT,
      allowNull: false, // Availability status is required
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Role is optional (default user role)
    },
  },
  {
    sequelize, // Database connection instance
    tableName: "user", // Explicit table name
    timestamps: true, // Enable automatic timestamps
    createdAt: "created_at", // Custom column name for creation timestamp
    updatedAt: "updated_at", // Custom column name for update timestamp
  },
);
