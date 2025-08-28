/**
 * SERVICE DE GESTION DES COMPÉTENCES
 * 
 * Ce service gère toutes les interactions avec l'API des compétences du backend.
 * Il fournit les fonctions nécessaires pour récupérer et utiliser les données
 * des compétences dans l'application SkillSwap côté frontend.
 * 
 * Fonctionnalités principales :
 * - Récupération de toutes les compétences disponibles
 * - Données triées alphabétiquement pour faciliter la navigation
 * - Support pour les systèmes de sélection et filtrage
 * - Cache potentiel côté frontend pour les performances
 * 
 * Utilisation dans l'application :
 * - Formulaires de sélection de compétences lors de l'inscription
 * - Systèmes de filtrage et recherche par compétences
 * - Autocomplétion dans les champs de recherche
 * - Affichage des compétences dans les profils utilisateur
 * - Matching entre offres et demandes de services
 * 
 * Performance :
 * - Données relativement statiques pouvant être mises en cache
 * - Requête légère avec seulement ID et nom des compétences
 * - Chargement unique au démarrage de l'application possible
 * 
 * Évolutions futures :
 * - Ajout de fonctions de recherche de compétences
 * - Suggestions de compétences populaires
 * - Catégorisation des compétences
 * - Statistiques d'utilisation des compétences
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import api from "@/api/axios";
import type { ISkill } from "@/types/skill";

// Get all available skills from the backend (sorted alphabetically)
export async function getAllSkills(): Promise<ISkill[]> {
  const res = await api.get("/skills");
  return res.data; // Returns array of skills with id and name
}
