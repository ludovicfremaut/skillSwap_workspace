/**
 * PAGE D'ACCUEIL DE SKILLSWAP
 * 
 * Cette page constitue le point d'entrée principal de l'application SkillSwap.
 * Elle orchestre l'affichage de tous les composants nécessaires pour présenter
 * l'application aux utilisateurs visiteurs et connectés.
 * 
 * Structure de la page :
 * - Header : Navigation et authentification
 * - Homepage : Contenu principal avec présentation de l'app
 * - Footer : Informations légales et liens utiles
 * 
 * Fonctionnalités affichées :
 * - Présentation de l'application et de son concept
 * - Appel à l'action pour l'inscription/connexion
 * - Mise en avant des derniers utilisateurs inscrits
 * - Exemples de services et compétences disponibles
 * - Navigation vers les différentes sections de l'app
 * 
 * Responsive :
 * La page s'adapte automatiquement aux différentes tailles d'écran
 * grâce aux classes Tailwind CSS utilisées dans les composants enfants.
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import Homepage from '../components/Homepage';
import Header from '../components/Header';
import Footer from '@/components/Footer';

// Main home page component - entry point of the application
export default function Home() {
  return (
    <div>
      {/* Header with navigation and authentication */}
      <Header />

      {/* Main content area with homepage components */}
      <Homepage />
      
      {/* Footer with legal info and useful links */}
      <Footer />
    </div>
  );
}
