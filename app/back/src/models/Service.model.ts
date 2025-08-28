/**
 * MODÈLE SERVICE SEQUELIZE
 * 
 * Ce modèle représente les services proposés ou demandés par les utilisateurs
 * dans l'application SkillSwap. Un service est une offre ou une demande de
 * compétence qui peut être échangée entre utilisateurs.
 * 
 * Structure du service :
 * - Objet/description du service proposé ou demandé
 * - Statut du service (ouvert, en cours, terminé, etc.)
 * - Relations avec les utilisateurs (demandeur et potentiel prestataire)
 * - Horodatage automatique de création
 * 
 * Relations :
 * - Service belongsTo User (sender_id) : L'utilisateur qui propose/demande
 * - Service belongsTo User (receiver_id) : L'utilisateur qui accepte le service
 * - Service peut avoir des messages associés
 * - Service peut avoir des avis/reviews
 * 
 * États possibles :
 * - "open" : Service disponible
 * - "pending" : Service en négociation
 * - "active" : Service en cours
 * - "completed" : Service terminé
 * - "cancelled" : Service annulé
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

// Interface defining the structure of Service attributes
interface ServiceAttributes {
  id: number; // Primary key, auto-incremented
  object: string; // Service description/title
  status: string; // Current status of the service
  sender_id: number; // ID of user who created the service
  receiver_id: number; // ID of user who accepted the service
  date: Date; // Creation timestamp
}

// Service model class extending Sequelize Model
export default class Service extends Model<ServiceAttributes> {}

// Initialize Service model with database schema
Service.init(
  {
    object: {
      type: DataTypes.TEXT,
      allowNull: false, // Service description is required
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false, // Status is required (open, pending, active, completed, cancelled)
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false, // Creation date is required
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"), // Auto-set to current timestamp
    },
  },
  {
    sequelize, // Database connection instance
    tableName: "service", // Explicit table name
  },
);
