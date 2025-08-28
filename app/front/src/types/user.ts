/**
 * TYPES TYPESCRIPT POUR LES UTILISATEURS
 * 
 * Ce fichier définit les interfaces TypeScript pour les utilisateurs
 * dans l'application SkillSwap côté frontend. Il assure la cohérence
 * des types entre les composants React et les appels API.
 * 
 * Interface IUser :
 * Structure complète d'un utilisateur avec toutes ses propriétés :
 * - Informations personnelles (nom, prénom, email)
 * - Profil public (photo, description, disponibilité)
 * - Localisation (code postal, ville)
 * - Relations (compétences associées)
 * - Identifiants techniques pour les services
 * 
 * Utilisation :
 * - Typage des props des composants React
 * - Validation des réponses API
 * - Autocomplétion dans l'IDE
 * - Détection d'erreurs de type à la compilation
 * 
 * Correspondance backend :
 * Cette interface correspond au modèle User.model.ts côté backend
 * et assure la cohérence des données entre frontend et API.
 * 
 * Évolutions futures :
 * - Ajout de champs pour les statistiques utilisateur
 * - Types pour les préférences utilisateur
 * - Interfaces pour les rôles et permissions
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

// Main user interface for frontend TypeScript validation
export interface IUser {
  id: number; // Unique user identifier (primary key)
  firstname: string; // User's first name
  lastname: string; // User's last name
  email: string; // User's email address (unique)
  profile_picture: string; // URL to profile picture
  skills: { name: string; id: number }[]; // Array of user's skills with names and IDs
  availability: string; // User's availability status for services
  description: string; // User's bio/description
  zipcode: string; // Postal code for location-based searches
  city: string; // City name for location display
  sender_id: number; // ID when user is sender in services/messages
  receiver_id: number; // ID when user is receiver in services/messages
}
