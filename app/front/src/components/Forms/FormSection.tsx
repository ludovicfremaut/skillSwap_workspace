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
