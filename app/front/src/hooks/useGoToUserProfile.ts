/**
 * HOOK DE NAVIGATION VERS PROFIL UTILISATEUR
 * 
 * Ce hook personnalisé React fournit une fonction réutilisable pour naviguer
 * vers la page de profil d'un utilisateur spécifique dans l'application SkillSwap.
 * Il encapsule la logique de navigation et assure la cohérence des routes.
 * 
 * Fonctionnalités principales :
 * - Navigation programmatique vers les profils utilisateur
 * - Gestion automatique des routes avec paramètres ID
 * - Interface simple et réutilisable dans toute l'application
 * - Intégration avec React Router pour la gestion d'historique
 * 
 * Utilisation dans l'application :
 * - Cartes utilisateur avec boutons "Voir le profil"
 * - Résultats de recherche d'utilisateurs
 * - Listes de contacts et discussions
 * - Navigation depuis les services et évaluations
 * - Suggestions d'utilisateurs recommandés
 * 
 * Avantages :
 * - Centralisation de la logique de navigation
 * - Réduction du code répétitif dans les composants
 * - Facilite la maintenance des routes
 * - Améliore la cohérence de l'expérience utilisateur
 * 
 * Route cible :
 * - Pattern : /profilepage/:id
 * - Paramètre : ID numérique de l'utilisateur
 * - Gestion automatique de l'historique de navigation
 * 
 * Sécurité :
 * - Validation de l'ID utilisateur au niveau du composant ProfilePage
 * - Gestion des erreurs pour utilisateurs inexistants
 * - Respect des permissions d'accès aux profils
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { useNavigate } from "react-router-dom";

/**
 * Custom hook for navigating to user profile pages
 * Returns a function that redirects to a specific user's ProfilePage
 */
export function useGoToUserProfile() {
  const navigate = useNavigate(); // React Router navigation function

  // Return navigation function that takes user ID and navigates to profile
  return (id: number) => {
    navigate(`/profilepage/${id}`); // Navigate to user profile with ID parameter
  };
}
