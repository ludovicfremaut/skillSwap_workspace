/**
 * SECTION FORMULAIRES - INSCRIPTION ET CONNEXION COMBINÉES
 * 
 * Ce composant React orchestre l'affichage des formulaires d'inscription
 * et de connexion dans l'application SkillSwap. Il adapte l'interface
 * selon la taille d'écran avec un design responsive optimal.
 * 
 * Fonctionnalités principales :
 * - Affichage simultané des deux formulaires sur desktop (2 colonnes)
 * - Bascule mobile entre inscription et connexion avec bouton toggle
 * - Interface adaptive selon la taille d'écran
 * - Design cohérent avec la charte graphique de l'application
 * - Gestion d'état local pour le mode d'affichage mobile
 * 
 * Comportement responsive :
 * - Desktop (md+) : Grille 2 colonnes côte à côte
 * - Mobile : Un seul formulaire visible avec bascule
 * - Tablet : Adaptation automatique selon l'espace disponible
 * - Interfaces tactiles optimisées
 * 
 * Design et styles :
 * - Couleurs variables CSS pour cohérence thématique
 * - Formulaire inscription sur fond primary (contraste élevé)
 * - Formulaire connexion sur fond secondary
 * - Bordures et ombres pour définition visuelle
 * - Espacement harmonieux pour lisibilité
 * 
 * Gestion d'état :
 * - showSignup : Boolean pour contrôler l'affichage mobile
 * - Classes conditionnelles pour visibility responsive
 * - État persistant durant la session de navigation
 * 
 * Composants enfants :
 * - SignupForm : Formulaire complet d'inscription
 * - LoginForm : Formulaire de connexion simple
 * - Intégration transparente avec validation et soumission
 * 
 * Expérience utilisateur :
 * - Transition fluide entre les modes d'affichage
 * - Call-to-action clairs pour chaque action
 * - Titles explicites pour guider l'utilisateur
 * - Interface intuitive pour tous niveaux
 * 
 * Utilisation dans l'application :
 * - Page Register comme composant principal
 * - Point d'entrée unique pour authentification
 * - Conversion des visiteurs en utilisateurs actifs
 * - Onboarding simplifié et efficace
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

/**
 * Section d’inscription / connexion
 * - Desktop : 2 colonnes (Inscription | Connexion)
 * - Mobile : bascule via un bouton
 */
export default function FormSection() {
  const [showSignup, setShowSignup] = useState(true);

  const showSignupCol = showSignup ? "block" : "hidden md:block";
  const showLoginCol = showSignup ? "hidden md:block" : "block";

  return (
    <section className="py-10 bg-[var(--color-secondary)] text-white">
      {/* TITRES */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-3xl font-bold">Ça commence ici&nbsp;!</h1>
        <h2 className="text-xl font-semibold mt-2">
          Inscrivez-vous pour partager vos compétences
        </h2>
      </div>

      {/* GRILLE INSCRIPTION / CONNEXION */}
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Formulaire d'inscription */}
          <div className={`${showSignupCol} md:bg-primary md:text-black md:rounded-xl md:p-6 md:shadow-md md:border md:border-white`}>
            <SignupForm />
          </div>

          {/* Formulaire de connexion dans une card */}
          <div className={showLoginCol}>
            <div className="md:bg-primary md:text-black md:rounded-xl md:p-6 md:shadow-md md:border md:border-white">
              <LoginForm />
            </div>
          </div>
        </div>

        {/* Bouton de bascule visible uniquement en mobile */}
        <button
          onClick={() => setShowSignup(!showSignup)}
          className="mt-8 md:hidden block w-full text-center underline hover:text-[var(--color-accent)]"
        >
          {showSignup
            ? "Déjà un compte ? Se connecter"
            : "Pas encore inscrit ? Créer un compte"}
        </button>
      </div>
    </section>
  );
}
