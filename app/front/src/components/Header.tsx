/**
 * COMPOSANT HEADER PRINCIPAL
 * 
 * Ce composant constitue l'en-tête principal de l'application SkillSwap.
 * Il gère la navigation, l'authentification utilisateur, et l'affichage
 * adaptatif selon l'état de connexion de l'utilisateur.
 * 
 * Fonctionnalités principales :
 * - Affichage du logo et du titre de l'application
 * - Navigation responsive (desktop/mobile avec menu burger)
 * - Gestion de l'état d'authentification utilisateur
 * - Menu dynamique selon l'état de connexion
 * - Boutons de navigation vers les pages principales
 * - Fonction de déconnexion
 * 
 * États gérés :
 * - Menu mobile ouvert/fermé
 * - Données de l'utilisateur connecté
 * - État d'authentification global
 * 
 * Navigation disponible :
 * - Recherche (toujours accessible)
 * - Mon profil (utilisateur connecté)
 * - Connexion/Inscription (utilisateur non connecté)
 * - Déconnexion (utilisateur connecté)
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./ui/Logo";
import { useAuth } from "@/hooks/useAuth";
import { getCurrentUser } from "@/services/user.service";
import type { IUser } from "@/types/user";

export default function Header() {
  // State for mobile menu toggle
  const [open, setOpen] = useState(false);
  // State for authenticated user data
  const [authUser, setAuthUser] = useState<IUser | null>(null);
  
  // Hooks for navigation and authentication
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // Fetch current user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        // console.log("Données complètes de l'utilisateur:", user);
        // console.log("Prénom de l'utilisateur:", user.firstname);
        setAuthUser(user);
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur : ", error);
      }
    };
    fetchUser();
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false); // Close mobile menu
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // console.log("Etat d'authentification : ", isAuthenticated);

  return (
    <header className="header-container relative flex flex-col w-full">
      <div className="flex justify-between items-center p-2 bg-white text-white">
        {/* Conteneur logo + titre côte à côte */}
        <div className="flex items-center">
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/" className="flex flex-col ml-0">
            <h1 className="text-secondary font-semibold text-4xl leading-none">
              SkillSwap
            </h1>
            <h2 className="text-secondary text-lg leading-none">
              Partagez vos talents, découvrez ceux des autres
            </h2>
          </Link>
        </div>

        {/* Bouton burger pour le menu mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center ml-4"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          <span className="block w-8 h-1 bg-secondary mb-1 rounded"></span>
          <span className="block w-8 h-1 bg-secondary mb-1 rounded"></span>
          <span className="block w-8 h-1 bg-secondary rounded"></span>
        </button>

        {/* Menu en version desktop */}

        {/* Message de bienvenue dynamique */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          {isAuthenticated && authUser && (
            <span className="text-secondary font-extrabold text-3xl">
              Bonjour {authUser.firstname} 👋
            </span>
          )}
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-4">
            <Button
              asChild
              className="bg-accent hover:bg-secondary text-white px-3 py-1 text-lg font-semibold"
            >
              <Link to="/search">Rechercher</Link>
            </Button>

            {isAuthenticated ? (
              <>
                <Button
                  asChild
                  className="bg-accent hover:bg-secondary text-white px-3 py-1 text-lg font-semibold"
                >
                  <Link to={`/personalpage/${authUser?.id}`}>Mon profil</Link>
                </Button>

                <Button
                  asChild
                  className="bg-accent hover:bg-secondary text-white px-3 py-1 text-lg font-semibold"
                >
                  <Link to={`/messages/${authUser?.id}`}>Messagerie</Link>
                </Button>

                <Button
                  asChild
                  className="bg-accent hover:bg-secondary text-white px-3 py-1 text-lg font-semibold"
                >
                  <button onClick={handleLogout}>Se déconnecter</button>
                </Button>
              </>
            ) : (
              <Button
                asChild
                className="bg-accent hover:bg-secondary text-white px-3 py-1 text-lg font-semibold"
              >
                <Link to="/register">Se connecter / S'enregistrer</Link>
              </Button>
            )}
          </ul>
        </nav>
      </div>

      {/* Menu mobile (visible quand on clique sur le burger) */}
      {open && (
        <nav className="md:hidden bg-secondary text-white w-full z-10 absolute left-0 top-20">
          <ul className="flex flex-col items-center gap-4 py-4">
            {isAuthenticated && authUser && (
              <li className="text-white font-extrabold text-lg">
                Bonjour {authUser.firstname} 👋
              </li>
            )}
            <li>
              <Link to="/search" onClick={() => setOpen(false)}>
                Rechercher
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                {/* Menu pour utilisateurs connectés */}
                <li>
                  <Link
                    to={`/personalpage/${authUser?.id}`}
                    onClick={() => setOpen(false)}
                  >
                    Mon profil
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/messages/${authUser?.id}`}
                    onClick={() => setOpen(false)}
                  >
                    Messagerie
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Se déconnecter</button>
                </li>
              </>
            ) : (
              /* Menu pour utilisateurs non connectés */
              <li>
                <Link to="/register" onClick={() => setOpen(false)}>
                  Se connecter / S'enregistrer
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
