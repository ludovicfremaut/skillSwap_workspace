/**
 * TYPES DE TRANSFERT DE DONNÉES (DTO) POUR L'API
 * 
 * Ce fichier définit les interfaces TypeScript pour les objets de transfert de données
 * (Data Transfer Objects) utilisés dans la communication entre le frontend et le backend
 * de l'application SkillSwap. Il assure la cohérence des données échangées.
 * 
 * Fonctionnalités principales :
 * - Interface RegisterDto pour l'inscription utilisateur
 * - Fonction de mapping des données de formulaire vers DTO backend
 * - Validation de type pour les requêtes API
 * - Transformation des noms de champs (camelCase ↔ snake_case)
 * 
 * Architecture de données :
 * - Frontend : utilise camelCase (firstName, lastName, etc.)
 * - Backend : utilise snake_case (first_name, last_name, etc.)
 * - DTO : interface de conversion entre les deux conventions
 * 
 * Utilisation dans l'application :
 * - Formulaires d'inscription et de mise à jour profil
 * - Validation des données avant envoi API
 * - Transformation automatique des formats de données
 * - Assurance de compatibilité frontend/backend
 * 
 * Sécurité :
 * - Validation de type compile-time avec TypeScript
 * - Protection contre les erreurs de structure de données
 * - Contrôle strict des champs obligatoires
 * 
 * Maintenance :
 * - Point central pour les modifications d'API
 * - Facilite la migration vers de nouvelles versions d'API
 * - Documentation automatique des contrats de données
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

// Data structure expected by backend for user registration
export interface RegisterDto {
  email: string;           // User's email address (unique identifier)
  password: string;        // Hashed password for authentication
  firstname: string;       // User's first name
  lastname: string;        // User's last name
  street: string;          // Street address for location
  zipcode: string;         // Postal code for location matching
  city: string;           // City name for location display
  profile_picture: string; // URL or path to user's avatar image
  description: string;     // User's bio/description text
  availability: string;    // User's availability status or schedule
}

import type { SignupFormData } from "./form.types";

// Transform form data from frontend format to backend DTO format
export function mapFormDataToRegisterDto(form: SignupFormData & { avatarUrl?: string } ): RegisterDto {
  return {
    email: form.email,
    password: form.password,
    firstname: form.firstName,    // camelCase → snake_case conversion
    lastname: form.lastName,      // camelCase → snake_case conversion
    street: form.address,         // field name mapping
    zipcode: form.zip,           // field name mapping
    city: form.city,
    profile_picture: form.avatarUrl ?? "", // use avatar URL if provided, empty string otherwise
    description: form.about,      // field name mapping
    availability: form.availability,
  };
}
