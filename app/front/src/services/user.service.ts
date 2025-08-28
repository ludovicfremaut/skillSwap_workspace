/**
 * SERVICE DE GESTION DES UTILISATEURS
 * 
 * Ce service gère toutes les interactions avec l'API utilisateurs du backend.
 * Il fournit les fonctions nécessaires pour récupérer, modifier et gérer
 * les données des utilisateurs dans l'application SkillSwap.
 * 
 * Fonctionnalités principales :
 * - Récupération de profils utilisateurs par ID
 * - Récupération de listes d'utilisateurs (tous, récents, aléatoires)
 * - Gestion du profil de l'utilisateur connecté
 * - Mise à jour des informations utilisateur
 * - Support des opérations de recherche et filtrage
 * 
 * Types d'utilisateurs récupérés :
 * - Utilisateur spécifique par ID (consultation de profil)
 * - Derniers utilisateurs inscrits (affichage d'accueil)
 * - Utilisateurs aléatoires (découverte de profils)
 * - Tous les utilisateurs (recherche et navigation)
 * - Utilisateur connecté (gestion de profil personnel)
 * 
 * Sécurité :
 * - Utilisation de cookies sécurisés pour l'authentification
 * - Configuration withCredentials pour les opérations sensibles
 * - Gestion des erreurs et des réponses API
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import api from "@/api/axios";
import type { IUser } from "@/types/user";

// Get a specific user by their ID
export async function getUserById(id: string): Promise<IUser> {
  const res = await api.get(`/users/${id}`);
  return res.data.data; // Extract user data from API response
}

// Get the latest registered users for homepage display
export async function getLastUsers(): Promise<IUser[]> {
  const res = await api.get("/users/latest");
  return res.data.data; // Returns array of recent users
}

// Get all users in the system
export async function getAllUsers(): Promise<IUser[]> {
  const res = await api.get("/users");
  return res.data.data; // Returns complete user list
}

// Get random users for discovery and homepage
export async function getRandomUsers(): Promise<IUser[]> {
  const res = await api.get("/users/random");
  return res.data.data; // Returns array of random users
}

// Get current authenticated user's profile data
export async function getCurrentUser(): Promise<IUser> {
  const res = await api.get("/users/me", {
    withCredentials: true, // Include authentication cookies
  });
  return res.data; // Returns authenticated user's data
}

// Update user profile information
export async function updateUser(id: number, data: Partial<IUser>): Promise<IUser> {
  const res = await api.put(`/users/${id}`, data, {
    withCredentials: true, // Include authentication cookies for authorization
  });
  return res.data.data; // Returns updated user data
}
