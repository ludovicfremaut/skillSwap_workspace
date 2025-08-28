/**
 * COMPOSANT PAGE D'ACCUEIL PRINCIPALE
 * 
 * Ce composant constitue le cœur de la page d'accueil de l'application SkillSwap.
 * Il présente l'application aux visiteurs et fournit les fonctionnalités principales
 * de découverte et de recherche d'utilisateurs et de compétences.
 * 
 * Fonctionnalités affichées :
 * - Présentation du concept SkillSwap avec slogan motivant
 * - Formulaire de recherche par compétence et localisation
 * - Affichage aléatoire de profils utilisateurs pour la découverte
 * - Visualisation des compétences disponibles sur la plateforme
 * - Appel à l'action pour encourager l'inscription
 * - Mise en avant des derniers membres inscrits
 * 
 * Design responsive :
 * - Version mobile : disposition verticale avec carousel d'images
 * - Version desktop : grille 3 colonnes pour une présentation optimisée
 * - Adaptation automatique selon la taille d'écran
 * 
 * Logique de recherche :
 * - Filtrage en temps réel par compétences
 * - Filtrage optionnel par code postal
 * - Redirection vers page de résultats avec données filtrées
 * 
 * États gérés :
 * - Chargement des données utilisateurs
 * - Gestion des erreurs d'API
 * - Mélange aléatoire des profils affichés
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { CarouselPlugin } from "./ui/CarouselPlugin";
import SearchForm from "./Forms/SearchForm";
import SkillBubble from "./ui/SkillBubble";
import ProfileBubble from "./ui/ProfileBubble";
import WishToRegister from "./WishToRegister";
import { useNavigate } from "react-router-dom";
import { useAllUsers } from "@/hooks/useAllUsers";
import { ProfileCard } from "./ProfileCard";

export default function Homepage() {
  // Fetch all users with custom hook
  const { users, loading, error } = useAllUsers();
  const navigate = useNavigate();
  
  // Create random selection of users for discovery
  const shuffled = [...users].sort(() => 0.5 - Math.random());
  const randomUsers = shuffled.slice(0, 2); // Get 2 random users for desktop

  // Handle search form submission
  function handleSearch({
    skill,
    zipcode,
  }: {
    skill: string;
    zipcode: string;
  }) {
    // Filter users based on search criteria
    const filtered = users.filter((user) => {
      // Check if user has the searched skill
      const hasSkill = user.skills.some((s) =>
        s.name.toLowerCase().includes(skill.toLowerCase()),
      );

      // If zipcode is provided, filter by both skill and location
      if (zipcode.trim()) {
        return hasSkill && user.zipcode === zipcode;
      }

      // Otherwise, filter by skill only
      return hasSkill;
    });

    // Navigate to search results page with filtered data
    navigate("/search", { state: { filteredUsers: filtered } });
  }

  // Loading state
  if (loading) {
    return (
      <p className="text-white text-sm italic text-center mt-10">
        Chargement des utilisateurs...
      </p>
    );
  }

  // Error state
  if (error) {
    return (
      <p className="text-red-500 text-sm italic text-center mt-10">
        {error.message}
      </p>
    );
  }

  return (
    <div className="w-full">
      {/* VERSION MOBILE */}
      <section className="block md:hidden flex flex-col items-center bg-secondary text-white">
        <CarouselPlugin />
        <div className="text-center text-lg p-6 font-bold">
          “Apprenez gratuitement ce que vous ne savez pas encore, en donnant ce
          que vous maîtrisez déjà.”
        </div>
        <SearchForm onSearch={handleSearch} />
        <div className="pt-10 items-start text-lg font-semibold">
          Compétences
        </div>
        <SkillBubble />
        <WishToRegister />
        <div className="pt-8 text-lg font-semibold text-center">
          Nos derniers inscrits
        </div>
        <ProfileBubble />
      </section>

      {/* VERSION DESKTOP */}
      <section className="hidden md:grid grid-cols-3 gap-8 px-8 py-12 bg-secondary text-white">
        {/* Colonne 1 */}
        <div className="space-y-8">
          <h2 className="font-semibold text-center text-2xl">
            Découvrez des profils
          </h2>
          <div className="space-y-4 p-4">
            {randomUsers.map((user) => (
              <ProfileCard key={user.id} user={user} />
            ))}
          </div>
        </div>

        {/* Colonne 2 */}
        <div className="flex flex-col items-center gap-10">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg max-w-md text-center text-lg">
            <p className="italic font-medium">
              “Apprenez gratuitement ce que vous ne savez pas encore, en donnant
              ce que vous maîtrisez déjà.”
            </p>
          </div>
          <div className="w-full max-w-md">
            <SearchForm
              onSearch={handleSearch}
              className="rounded-2xl border-2 border-white shadow-lg bg-accent p-4"
            />
          </div>
          <div className="w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Compétences
            </h2>
            <SkillBubble />
          </div>
        </div>

        {/* Colonne 3 */}
        <div className="space-y-8">
          <div className="bg-white text-black rounded-xl shadow-md p-6">
            <WishToRegister />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Nos derniers inscrits
            </h2>
            <ProfileBubble />
          </div>
        </div>
      </section>
    </div>
  );
}
