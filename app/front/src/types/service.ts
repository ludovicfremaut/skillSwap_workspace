/**
 * TYPES TYPESCRIPT POUR LES SERVICES
 * 
 * Ce fichier définit les interfaces TypeScript pour les services
 * dans l'application SkillSwap côté frontend. Il garantit la cohérence
 * des types pour les échanges de compétences entre utilisateurs.
 * 
 * Type IServiceStatus :
 * Énumération des statuts possibles d'un service :
 * - "en attente" : Service proposé, en attente d'acceptation
 * - "accepté" : Service accepté par le destinataire
 * - "terminé" : Service réalisé et finalisé
 * 
 * Interface IService :
 * Structure complète d'un service avec :
 * - Informations du service (ID, titre, date)
 * - Participants (donneur et receveur avec noms et IDs)
 * - Statut actuel du service
 * - Horodatage pour le suivi
 * 
 * Utilisation :
 * - Typage des composants de gestion de services
 * - Validation des données API
 * - États des services dans les hooks React
 * - Affichage dans les interfaces utilisateur
 * 
 * Correspondance backend :
 * Correspond au modèle Service.model.ts côté backend
 * pour assurer la cohérence des données.
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

// Enumeration of possible service statuses
export type IServiceStatus = "en attente" | "accepté" | "terminé";

// Service interface for frontend TypeScript validation
export interface IService {
  id: number; // Unique service identifier
  title: string; // Service title/description
  giverName: string; // Name of user providing the service
  receiverName: string; // Name of user receiving the service
  giverId: number; // ID of service provider
  receiverId: number; // ID of service receiver
  status: IServiceStatus; // Current service status
  date: string; // Service creation/modification date
}
