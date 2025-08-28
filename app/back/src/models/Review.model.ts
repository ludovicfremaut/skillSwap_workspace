/**
 * MODÈLE REVIEW (ÉVALUATION) - SYSTÈME D'AVIS ET NOTATION
 * 
 * Ce modèle Sequelize représente les évaluations et commentaires
 * laissés par les utilisateurs de SkillSwap après un échange de services.
 * Il permet de construire un système de réputation et de feedback.
 * 
 * Fonctionnalités principales :
 * - Notation numérique des services reçus (1 à 5 étoiles)
 * - Commentaires textuels détaillés sur l'expérience
 * - Horodatage automatique de la création de l'avis
 * - Lien direct avec le service évalué
 * 
 * Structure de données :
 * - rating : Note numérique obligatoire (INTEGER)
 * - comment : Commentaire textuel détaillé (TEXT)
 * - date : Date de création automatique (DATEONLY)
 * - Relations : Appartient à un User et à un Service
 * 
 * Contraintes et validations :
 * - Rating obligatoire pour note quantitative
 * - Comment obligatoire pour retour qualitatif
 * - Date par défaut = date courante
 * - Pas de modification après création (immutabilité)
 * 
 * Utilisation dans l'application :
 * - Évaluation post-service par le receveur
 * - Construction de la réputation des utilisateurs
 * - Amélioration continue de la qualité des échanges
 * - Modération et détection d'abus potentiels
 * 
 * Relations avec autres modèles :
 * - belongsTo User (auteur de l'évaluation)
 * - belongsTo Service (service évalué)
 * - Permet calcul de notes moyennes par utilisateur
 * 
 * Sécurité et intégrité :
 * - Un seul avis par service pour éviter le spam
 * - Validation côté serveur des notes (1-5)
 * - Modération possible des commentaires inappropriés
 * - Traçabilité complète des évaluations
 * 
 * Performance :
 * - Index sur service_id pour requêtes rapides
 * - Agrégation possible pour statistiques
 * - Pagination pour affichage des listes d'avis
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 * @requires sequelize ORM pour définition du modèle
 */

import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";

// Review model class extending Sequelize Model
export default class Review extends Model {}

// Initialize Review model with schema definition
Review.init(
  {
    rating: {
      type: DataTypes.INTEGER,      // Numeric rating (1-5 stars)
      allowNull: false,             // Required field for quantitative feedback
    },
    comment: {
      type: DataTypes.TEXT,         // Detailed text comment
      allowNull: false,             // Required field for qualitative feedback
    },
    date: {
      type: DataTypes.DATEONLY,     // Date without time for review creation
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_DATE"), // Auto-set to current date
    },
  },
  {
    sequelize,                      // Database connection instance
    tableName: "review",            // Explicit table name in database
  },
);
