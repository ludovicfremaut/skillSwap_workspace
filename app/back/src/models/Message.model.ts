/**
 * MODÈLE MESSAGE SEQUELIZE
 * 
 * Ce modèle représente les messages échangés entre utilisateurs dans l'application SkillSwap.
 * Il constitue la base du système de messagerie privée permettant aux utilisateurs
 * de communiquer pour organiser leurs échanges de compétences et services.
 * 
 * Structure du message :
 * - Expéditeur et destinataire (relations avec User)
 * - Contenu du message (body)
 * - Horodatage d'envoi et de dernière modification
 * - Gestion automatique des timestamps
 * 
 * Relations :
 * - Message belongsTo User (sender_id) : L'expéditeur du message
 * - Message belongsTo User (receiver_id) : Le destinataire du message
 * - Permet de créer des conversations bidirectionnelles
 * 
 * Fonctionnalités :
 * - Messagerie privée entre utilisateurs
 * - Historique complet des conversations
 * - Tri chronologique des messages
 * - Support pour les notifications (futures évolutions)
 * 
 * Sécurité :
 * - Seuls les participants d'une conversation peuvent y accéder
 * - Messages privés non modifiables après envoi
 * - Contrôle d'accès au niveau du contrôleur
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

// Message model class extending Sequelize Model
export default class Message extends Model {}

// Initialize Message model with database schema
Message.init(
  {
    sender_id: {
      type: DataTypes.INTEGER, // Foreign key to User table (sender)
      allowNull: false, // Sender is required
    },
    receiver_id: {
      type: DataTypes.INTEGER, // Foreign key to User table (receiver)
      allowNull: false, // Receiver is required
    },    
    sending_date: {
      type: DataTypes.DATE, // When the message was sent
      allowNull: false,
      defaultValue: DataTypes.NOW, // Auto-set to current timestamp
    },
    updated_at: {
      type: DataTypes.DATE, // When the message was last modified
      allowNull: false,
      defaultValue: DataTypes.NOW, // Auto-set to current timestamp
    },
    body: {
      type: DataTypes.TEXT, // Message content
      allowNull: false, // Message content is required
    },
  },
  {
    sequelize, // Database connection instance
    tableName: "message", // Explicit table name
  },
);
