/**
 * SERVICE DE GESTION DES SERVICES ET PRESTATIONS
 * 
 * Ce service gère toutes les interactions avec l'API des services du backend,
 * incluant la récupération, la création et la gestion des statuts des services
 * proposés et demandés par les utilisateurs de SkillSwap.
 * 
 * Fonctionnalités principales :
 * - Récupération des services de l'utilisateur connecté
 * - Récupération des services d'un utilisateur spécifique (format brut)
 * - Mise à jour du statut des services (pending/accepted/done)
 * - Gestion des cookies d'authentification pour les requêtes sécurisées
 * 
 * Types de services gérés :
 * - Services offerts (compétences que l'utilisateur propose)
 * - Services demandés (compétences que l'utilisateur recherche)
 * - Gestion du cycle de vie des échanges de services
 * 
 * Statuts de service :
 * - pending : Service en attente de validation
 * - accepted : Service accepté et en cours
 * - done : Service terminé et validé
 * 
 * Sécurité :
 * - Authentification JWT via cookies sécurisés
 * - Vérification des permissions pour accéder aux services
 * - Protection contre l'accès non autorisé aux données utilisateur
 * 
 * Utilisation dans l'application :
 * - Tableau de bord utilisateur pour voir ses services
 * - Gestion des demandes et offres de services
 * - Suivi de l'avancement des échanges
 * - Profils utilisateur pour afficher les services disponibles
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import api from "@/api/axios";
import type { IService } from "@/types/service";

// Get current user's services with authentication
export async function getMyServices(): Promise<IService[]> {
  const res = await api.get("/services/me", {
    withCredentials: true, // Send JWT cookie for authentication
  });

  return res.data.data; // Return raw service data without status conversion
}

// Get specific user's services in raw format (public access)
export async function getRawServices(userID: number): Promise<IService[]> {
  const res = await api.get(`/users/${userID}/services-raw`);
  return res.data.data; // Return user's services in raw format
}

// Update service status (workflow management)
export async function updateServiceStatus(
  serviceId: string,
  newStatus: "pending" | "accepted" | "done"
) {
  const res = await api.post(
    `/services/${serviceId}/status`,
    { newStatus }, // New status to apply
    { withCredentials: true } // Authentication required for updates
  );
  return res.data; // Return update confirmation
}
