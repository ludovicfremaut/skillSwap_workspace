/**
 * HOOK D'AUTHENTIFICATION REACT
 * 
 * Ce hook personnalisé gère l'état d'authentification global de l'application.
 * Il fournit toutes les fonctionnalités nécessaires pour la gestion des sessions
 * utilisateur, incluant la connexion, déconnexion et vérification du statut.
 * 
 * Fonctionnalités principales :
 * - Gestion de l'état d'authentification (connecté/déconnecté)
 * - Stockage des données utilisateur en mémoire
 * - Fonctions de connexion et déconnexion
 * - Vérification automatique de l'authentification au chargement
 * - Mise à jour automatique de l'état après les actions d'auth
 * 
 * États gérés :
 * - isAuthenticated : boolean indiquant si l'utilisateur est connecté
 * - user : objet contenant les données de l'utilisateur connecté ou null
 * 
 * Fonctions exposées :
 * - login : connexion avec email/password
 * - logout : déconnexion et nettoyage de l'état
 * - checkAuthentication : vérification manuelle du statut
 * 
 * Utilisation :
 * Ce hook doit être utilisé dans les composants nécessitant une authentification
 * ou devant afficher des informations différentes selon l'état de connexion.
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { useState, useEffect, useCallback } from "react";
import * as authService from "@/services/auth.service";
import type { IUser } from "@/types/user";

// Custom hook for managing authentication state and operations
export function useAuth() {
  // Authentication state - tracks if user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // User data state - stores current user information
  const [user, setUser] = useState<IUser | null>(null);

  // Function to check current authentication status with backend
  const checkAuthentication = useCallback(async () => {
    try {
      // console.log("Vérification de l'authentification...");

      // Call backend to verify authentication status
      const data = await authService.checkAuth();
      // console.log("Réponse de checkAuth :", data);

      // Update authentication state based on backend response
      setIsAuthenticated(data.authenticated);
      // console.log("Etat mis a jour :", data.authenticated);

      setUser(data.user || null); // Update user data if available
    } catch (error) {
      console.log("Erreur de checkAuth :", error);

      // On error, assume user is not authenticated
      setIsAuthenticated(false);
    }
  }, []);

  // Check authentication status on component mount
  useEffect(() => {
    // console.log("useEffect déclenché");

    checkAuthentication();
  }, [checkAuthentication]);

  // Login function with email and password
  const login = async (credentials: { email: string; password: string }) => {
    try {
      // console.log("Tentative de login..."); // Debug log

      // Attempt login with provided credentials
      const response = await authService.login(credentials);

      // console.log("Login réussi:", response); // Success log
      await checkAuthentication(); // Refresh auth state after successful login
      return response;
    } catch (error) {
      console.error("Erreur login:", error);
      throw error; // Re-throw error for component handling
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call backend logout endpoint
      await authService.logout();
      // Clear local authentication state
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erreur logout :", error);
    }
  };

  // Return authentication state and functions for component use
  return {
    isAuthenticated, // Current authentication status
    user, // Current user data
    login, // Login function
    logout, // Logout function
    checkAuthentication, // Manual auth check function
  };
}
