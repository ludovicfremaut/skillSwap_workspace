/**
 * TYPES TYPESCRIPT POUR LES CONVERSATIONS
 * 
 * Ce fichier définit les interfaces TypeScript pour les conversations
 * dans l'application SkillSwap côté frontend. Il structure les données
 * des discussions groupées entre utilisateurs pour l'affichage optimisé.
 * 
 * Interface IConversation :
 * Structure d'une conversation avec :
 * - Identifiant unique de la conversation
 * - Dernier message échangé pour prévisualisation
 * - Références aux participants (expéditeur/destinataire)
 * - Contenu du dernier message pour affichage rapide
 * - Informations de l'interlocuteur pour l'interface
 * 
 * Utilisation dans l'application :
 * - Liste des conversations récentes (inbox)
 * - Prévisualisation des derniers messages
 * - Navigation rapide vers conversations complètes
 * - Tri par activité récente
 * - Interface de messagerie compacte
 * 
 * Optimisation :
 * - Évite le chargement complet des messages pour les listes
 * - Permet l'affichage rapide des conversations actives
 * - Structure adaptée pour les notifications temps réel
 * - Compatible avec pagination et lazy loading
 * 
 * Relations avec autres types :
 * - IMessage : pour le dernier message affiché
 * - IUser : pour les informations de l'interlocuteur
 * - Complémentaire à l'interface de messages détaillés
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import type { IUser } from "./user";
import type { IMessage } from "./message";

// Interface for conversation overview with last message preview
export interface IConversation {
  id: number;                // Unique conversation identifier
  lastMessage: IMessage;     // Most recent message in conversation
  sender_id: number;         // ID of message sender
  receiver_id: number;       // ID of message receiver
  body: string;             // Content of last message for quick preview
  user: IUser;              // Information about the conversation partner
}
