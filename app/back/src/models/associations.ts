/**
 * ASSOCIATIONS SEQUELIZE - RELATIONS ENTRE MODÈLES
 * 
 * Ce fichier définit toutes les relations entre les modèles de données
 * dans l'application SkillSwap. Il utilise Sequelize ORM pour créer
 * les associations et les contraintes de clés étrangères.
 * 
 * Relations définies :
 * 
 * 1. USER ↔ SERVICE (One-to-Many bidirectionnel)
 *    - Un utilisateur peut proposer plusieurs services (provider)
 *    - Un utilisateur peut recevoir plusieurs services (client)
 * 
 * 2. USER ↔ REVIEW (One-to-Many)
 *    - Un utilisateur peut écrire plusieurs avis
 *    - Un avis appartient à un utilisateur (author)
 * 
 * 3. SERVICE ↔ REVIEW (One-to-One)
 *    - Un service peut avoir un avis associé
 *    - Un avis concerne un service spécifique
 * 
 * 4. USER ↔ SKILL (Many-to-Many)
 *    - Un utilisateur peut avoir plusieurs compétences
 *    - Une compétence peut être maîtrisée par plusieurs utilisateurs
 *    - Table de jointure : user_has_skills
 * 
 * 5. USER ↔ ROLE (Many-to-One)
 *    - Un utilisateur a un rôle (user, admin, moderator)
 *    - Un rôle peut être attribué à plusieurs utilisateurs
 * 
 * 6. USER ↔ MESSAGE (One-to-Many bidirectionnel)
 *    - Un utilisateur peut envoyer plusieurs messages
 *    - Un utilisateur peut recevoir plusieurs messages
 * 
 * Avantages de ce système :
 * - Intégrité référentielle garantie
 * - Requêtes relationnelles optimisées
 * - Cascade des suppressions où approprié
 * - Alias clairs pour les relations
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import sequelize from "../database/client";

// Import all models
// Note: No .ts extension with TypeScript in this configuration
// Alternative: add "allowImportingTsExtensions": true in tsconfig.json
// with moduleResolution: "bundler" (not compiled to JS)
import Message from "./Message.model";
import Review from "./Review.model";
import Role from "./Role.model";
import Service from "./Service.model";
import Skill from "./Skill.model";
import User from "./User.model";

// USER ↔ SERVICE ASSOCIATIONS
// One user can receive many services (as client)
User.hasMany(Service, {
  foreignKey: "receiver_id",
  as: "requestedServices", // Services requested by this user
});

// One user can provide many services (as provider)
User.hasMany(Service, {
  foreignKey: "sender_id",
  as: "providedServices", // Services provided by this user
});

// Each service belongs to a receiver (client)
Service.belongsTo(User, {
  foreignKey: "receiver_id",
  as: "client", // User receiving the service
});

// Each service belongs to a sender (provider)
Service.belongsTo(User, {
  foreignKey: "sender_id",
  as: "provider", // User providing the service
});

// USER ↔ REVIEW ASSOCIATIONS
// One user can write many reviews
User.hasMany(Review, {
  foreignKey: "user_id",
  as: "postedReviews", // Reviews written by this user
});

// Each review belongs to one user (author)
Review.belongsTo(User, {
  foreignKey: "user_id",
  as: "author", // User who wrote the review
});

// SERVICE ↔ REVIEW ASSOCIATIONS
// One service can have one review (optional)
Service.hasOne(Review, {
  foreignKey: {
    name: "service_id",
    allowNull: true, // Review is optional
  },
  as: "review", // Review for this service
  onDelete: "CASCADE", // Delete review when service is deleted
});

// Each review belongs to one service
Review.belongsTo(Service, {
  foreignKey: {
    name: "service_id",
    allowNull: false, // Review must be linked to a service
  },
  as: "service", // Service being reviewed
});

// USER ↔ SKILL ASSOCIATIONS (Many-to-Many)
// One user can have many skills through junction table
User.belongsToMany(Skill, {
  as: "skills", // User's skills
  through: "user_has_skills", // Junction table name
  foreignKey: "user_id", // Foreign key for user
  otherKey: "skill_id", // Foreign key for skill
});

// One skill can belong to many users through junction table
Skill.belongsToMany(User, {
  as: "users", // Users having this skill
  through: "user_has_skills", // Junction table name
  foreignKey: "skill_id", // Foreign key for skill
  otherKey: "user_id", // Foreign key for user
});

// USER ↔ ROLE ASSOCIATIONS
// Each user belongs to one role (optional)
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role", // User's role (admin, user, moderator)
  onDelete: "CASCADE", // Delete user when role is deleted
  onUpdate: "CASCADE", // Update user when role is updated
});

// One role can be assigned to many users
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users", // Users with this role
});

// USER ↔ MESSAGE ASSOCIATIONS
// One user can send many messages
User.hasMany(Message, {
  foreignKey: "sender_id",
  as: "sentMessages", // Messages sent by this user
});

// One user can receive many messages
User.hasMany(Message, {
  foreignKey: "receiver_id",
  as: "receivedMessages", // Messages received by this user
});

// Each message belongs to a sender
Message.belongsTo(User, {
  foreignKey: "sender_id",
  as: "sender", // User who sent the message
});

// Each message belongs to a receiver
Message.belongsTo(User, {
  foreignKey: "receiver_id",
  as: "receiver", // User who received the message
});

// Export all models and sequelize instance for use in controllers
export { Message, Review, Role, Service, Skill, User, sequelize };
