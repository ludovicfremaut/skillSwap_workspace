/**
 * TYPES TYPESCRIPT POUR LES MESSAGES
 * 
 * Ce fichier définit les interfaces TypeScript pour le système de messagerie
 * dans l'application SkillSwap côté frontend. Il structure les données
 * des messages échangés entre utilisateurs.
 * 
 * Interface IMessage :
 * Structure complète d'un message avec :
 * - Identifiant unique du message
 * - Références aux utilisateurs expéditeur et destinataire
 * - Horodatage d'envoi et de dernière modification
 * - Contenu textuel du message
 * 
 * Utilisation dans l'application :
 * - Affichage des conversations entre utilisateurs
 * - Historique complet des échanges de messages
 * - Tri chronologique des conversations
 * - Interface de messagerie en temps réel
 * - Notifications de nouveaux messages
 * 
 * Fonctionnalités supportées :
 * - Conversations bidirectionnelles
 * - Historique persistant des messages
 * - Horodatage précis des échanges
 * - Modification et édition de messages
 * - Recherche dans l'historique des conversations
 * 
 * Correspondance backend :
 * Cette interface correspond exactement au modèle Message.model.ts
 * côté backend pour garantir la cohérence des données API.
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

// Message interface for frontend TypeScript validation
export interface IMessage {
  id: number; // Unique message identifier (primary key)
  sender_id: number; // ID of user sending the message
  receiver_id: number; // ID of user receiving the message
  sending_date: Date; // Timestamp when message was sent
  updated_at: Date; // Timestamp when message was last modified
  body: string; // Message content/text
}
