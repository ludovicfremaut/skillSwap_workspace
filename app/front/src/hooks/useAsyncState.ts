/**
 * HOOK DE GESTION D'ÉTAT ASYNCHRONE
 * 
 * Ce hook personnalisé React fournit une gestion standardisée des états
 * de chargement et d'erreur pour les opérations asynchrones dans l'application
 * SkillSwap. Il simplifie la gestion des requêtes API et des promesses.
 * 
 * Fonctionnalités principales :
 * - État de chargement (loading) pour afficher des spinners/loaders
 * - État d'erreur avec message personnalisable
 * - Fonction de réinitialisation pour nettoyer les états
 * - Interface cohérente pour toutes les opérations async
 * 
 * États gérés :
 * - loading : boolean pour indiquer une opération en cours
 * - error : string|null pour stocker les messages d'erreur
 * - Fonctions de contrôle pour modifier ces états
 * 
 * Utilisation typique :
 * - Formulaires avec validation et soumission
 * - Chargement de données depuis l'API
 * - Opérations CRUD avec feedback utilisateur
 * - Gestion d'erreurs réseau et validation
 * 
 * Avantages :
 * - Réduction du code répétitif (boilerplate)
 * - Consistance dans la gestion des états async
 * - Facilite les tests unitaires
 * - Améliore l'expérience utilisateur avec feedback
 * 
 * Pattern d'utilisation :
 * 1. Appeler setLoading(true) avant l'opération
 * 2. Effectuer l'opération asynchrone
 * 3. Gérer le succès ou setError() en cas d'échec
 * 4. Toujours terminer par setLoading(false)
 * 5. Utiliser reset() pour nettoyer entre les opérations
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { useState } from "react";

// Custom hook for managing async operation states (loading, error)
export function useAsyncState() {
  const [loading, setLoading] = useState(false); // Tracks if async operation is in progress
  const [error, setError] = useState<string | null>(null); // Stores error message if operation fails
  
  // Reset both loading and error states to initial values
  const reset = () => {
    setLoading(false);
    setError(null);
  };

  // Return state variables and control functions
  return {
    loading,    // Current loading state
    error,      // Current error message (null if no error)
    setLoading, // Function to update loading state
    setError,   // Function to set error message
    reset,      // Function to reset all states
  };
}
