import { useState, useEffect, useCallback } from "react";
import * as authService from "@/services/auth.service";
import type { IUser } from "@/types/user";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const checkAuthentication = useCallback(async () => {
    try {
      // console.log("Vérification de l'authentification...");

      const data = await authService.checkAuth();
      // console.log("Réponse de checkAuth :", data);

      setIsAuthenticated(data.authenticated);
      // console.log("Etat mis a jour :", data.authenticated);

      setUser(data.user || null); // Update user if necessary
    } catch (error) {
      console.log("Erreur de checkAuth :", error);

      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    // console.log("useEffect déclenché");

    checkAuthentication();
  }, [checkAuthentication]);

  // Adding the login function
  const login = async (credentials: { email: string; password: string }) => {
    try {
      // console.log("Tentative de login..."); // Log de début

      const response = await authService.login(credentials);

      // console.log("Login réussi:", response); // Log de debug
      await checkAuthentication(); // Check auth state after login
      return response;
    } catch (error) {
      console.error("Erreur login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erreur logout :", error);
    }
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuthentication, // in case to refresh manually
  };
}
