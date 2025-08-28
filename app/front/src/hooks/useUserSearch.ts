/**
 * HOOK DE RECHERCHE ET FILTRAGE D'UTILISATEURS
 * 
 * Ce hook personnalisé React gère la logique de recherche et de filtrage
 * des utilisateurs dans l'application SkillSwap. Il permet de trouver
 * des utilisateurs en fonction de leurs compétences et leur localisation.
 * 
 * Fonctionnalités principales :
 * - Filtrage par compétence (correspondance exacte, insensible à la casse)
 * - Filtrage par code postal (correspondance exacte)
 * - Filtrage combiné compétence + localisation
 * - Réinitialisation et mise à jour des résultats en temps réel
 * 
 * Logique de filtrage :
 * - Si compétence ET code postal : les deux critères doivent correspondre
 * - Si compétence uniquement : filtre sur les compétences seulement
 * - Si code postal uniquement : filtre sur la localisation seulement
 * - Si aucun critère : retourne tous les utilisateurs
 * 
 * Utilisation dans l'application :
 * - Page de recherche d'utilisateurs
 * - Système de matching pour trouver des partenaires d'échange
 * - Filtres avancés dans les listes d'utilisateurs
 * - Suggestions d'utilisateurs proches géographiquement
 * 
 * Performance :
 * - Recherche côté client pour une réactivité optimale
 * - Mise à jour immédiate des résultats lors de la saisie
 * - Optimisation possible avec debounce pour les grandes listes
 * 
 * Évolutions futures :
 * - Recherche floue pour les compétences similaires
 * - Filtrage par distance géographique approximative
 * - Tri par pertinence et proximité
 * - Historique des recherches récentes
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { useState } from "react";
import type { IUser } from "@/types/user";

// Custom hook for searching and filtering users by skill and location
export function useUserSearch(initialUsers: IUser[]) {
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(initialUsers);

  // Filter users based on skill and/or zipcode criteria
  function handleSearch(
    { skill, zipcode }: { skill: string; zipcode: string },
    usersToFilter: IUser[] = initialUsers,
  ) {
    // Debug logging for search parameters (commented for production)
    // console.log("Recherche lancée :", skill, zipcode, usersToFilter);

    setFilteredUsers(
      usersToFilter.filter((user) => {
        // Check if user has the specified skill (case-insensitive)
        const hasSkill = user.skills.some(
          (s) => s.name.trim().toLowerCase() === skill.trim().toLowerCase(),
        );
        // Check if user's zipcode matches exactly
        const hasZip = user.zipcode.trim() === zipcode.trim();
        
        // Debug logging for individual user matching (commented for production)
        // console.log(user.firstname, "hasSkill:", hasSkill, "hasZip:", hasZip);
        
        // Apply filtering logic based on available criteria
        if (skill && zipcode) return hasSkill && hasZip; // Both criteria must match
        if (skill) return hasSkill; // Only skill filtering
        if (zipcode) return hasZip; // Only location filtering
        return true; // No criteria = show all users
      }),
    );
  }
  
  // Return filtering state and control functions
  return { filteredUsers, handleSearch, setFilteredUsers };
}
