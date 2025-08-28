/**
 * SERVICE D'AUTHENTIFICATION
 * 
 * Ce service gère toutes les interactions avec l'API d'authentification du backend.
 * Il fournit les fonctions nécessaires pour l'inscription, la connexion, la déconnexion
 * et la vérification du statut d'authentification des utilisateurs.
 * 
 * Fonctionnalités :
 * - Inscription de nouveaux utilisateurs avec validation complète
 * - Connexion utilisateur avec gestion des cookies sécurisés
 * - Déconnexion et suppression des tokens d'authentification
 * - Vérification de l'état d'authentification actuel
 * 
 * Sécurité :
 * - Utilisation de cookies HttpOnly pour les tokens JWT
 * - Configuration withCredentials pour inclure les cookies
 * - Communication sécurisée avec l'API backend
 * 
 * Types exportés :
 * - RegisterDto : Interface pour les données d'inscription
 * - LoginDto : Interface pour les données de connexion
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

// Authentication service for API communication
import api from "@/api/axios";

// Interface for user registration data
export interface RegisterDto {
  email: string; // User email (unique identifier)
  password: string; // Plain text password (will be hashed on backend)
  firstname: string; // User's first name
  lastname: string; // User's last name
  street: string; // Street address
  zipcode: string; // Postal code
  city: string; // City name
  profile_picture: string; // Profile picture URL
  description: string; // User bio/description
  availability: string; // Availability status for services
}

// Interface for user login credentials
export interface LoginDto {
  email: string; // User email
  password: string; // Plain text password
}

// Register a new user account
export async function register(dto: RegisterDto) {
  // Send registration data to backend API
  const { data } = await api.post("/auth/register", dto, {
    withCredentials: true, // Include cookies in request
  });
  return data;
}

// Login existing user
export async function login(dto: LoginDto) {
  // Send login credentials to backend API
  const { data } = await api.post("/auth/login", dto, {
    withCredentials: true, // Include cookies for token storage
  });
  return data;
}

// Logout current user
export async function logout() {
  // Send logout request to clear authentication cookies
  await api.post("/auth/logout", {}, { withCredentials: true });
}

// Check if user is currently authenticated
export async function checkAuth() {
  const { data } = await api.get("/auth/check", { withCredentials: true });
  return data; // Expected format: { authenticated: boolean, user?: ... }
}
