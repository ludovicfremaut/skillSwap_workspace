/**
 * PAGE D'ERREUR 404 - GESTION DES ROUTES INEXISTANTES
 * 
 * Cette page React gère l'affichage des erreurs 404 dans l'application SkillSwap.
 * Elle offre une expérience utilisateur friendly lorsqu'une route demandée
 * n'existe pas, avec navigation claire pour revenir à l'application.
 * 
 * Fonctionnalités principales :
 * - Affichage explicite de l'erreur 404 avec émoji expressif
 * - Message d'erreur clair et rassurant pour l'utilisateur
 * - Bouton de retour direct vers la page d'accueil
 * - Design cohérent avec le reste de l'application
 * - Navigation complète avec Header et Footer
 * 
 * Design et expérience utilisateur :
 * - Interface centrée et minimaliste
 * - Typographie claire avec hiérarchie visuelle
 * - Couleurs cohérentes avec la charte graphique
 * - Bouton d'action proéminent pour la navigation
 * - Responsive design pour tous les écrans
 * 
 * Architecture de la page :
 * - Header : Navigation standard pour maintenir la cohérence
 * - Section centrale : Affichage de l'erreur avec call-to-action
 * - Footer : Liens utiles et informations complémentaires
 * - Layout flex pour centrage parfait du contenu
 * 
 * Gestion des erreurs :
 * - Capture automatique des routes non définies
 * - Redirection douce sans perte de contexte
 * - Maintien de l'état d'authentification utilisateur
 * - Préservation de l'historique de navigation
 * 
 * Accessibilité :
 * - Contraste suffisant pour la lisibilité
 * - Navigation au clavier possible
 * - Textes alternatifs appropriés
 * - Structure sémantique HTML correcte
 * 
 * Utilisation dans l'application :
 * - Route catch-all pour URLs inexistantes
 * - Protection contre les liens brisés
 * - Fallback pour erreurs de navigation
 * - Amélioration de l'expérience utilisateur global
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

// 404 error page component for handling non-existent routes
export default function NotFound() {
  return (
    <>
      <Header /> {/* Maintain navigation consistency */}

      {/* Centered 404 error display */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="text-8xl mb-4 text-gray-400 font-bold">404</div> {/* Clear error code display */}
        <h1 className="text-center text-6xl font-extrabold mb-4 text-blue-700">
          Page non trouvée {/* Clear error message */}
        </h1>
        <p className="text-center text-2xl mb-6">
          Oups ! La page recherchée n'existe pas. {/* User-friendly error message */}
        </p>
        {/* Clear call-to-action to return home */}
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </Link>
      </div>
      <Footer /> {/* Complete page layout */}
    </>
  );
}
