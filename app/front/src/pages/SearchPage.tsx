/**
 * PAGE DE RECHERCHE D'UTILISATEURS - DÉCOUVERTE ET FILTRAGE
 * 
 * Cette page React constitue l'interface principale de recherche et découverte
 * d'utilisateurs dans l'application SkillSwap. Elle permet aux membres de trouver
 * des partenaires d'échange selon leurs besoins de compétences et localisation.
 * 
 * Fonctionnalités principales :
 * - Formulaire de recherche avancée par compétence et code postal
 * - Affichage des résultats sous forme de cartes utilisateur
 * - Filtrage en temps réel des utilisateurs selon critères
 * - Navigation depuis la page d'accueil avec résultats pré-filtrés
 * - Interface responsive pour tous les écrans
 * 
 * États de données gérés :
 * - Utilisateurs initiaux (depuis navigation ou tous les utilisateurs)
 * - Résultats filtrés selon critères de recherche actuels
 * - État de chargement pour récupération des données
 * - Gestion des erreurs d'API et états vides
 * 
 * Logique de recherche :
 * - Recherche globale sur tous les utilisateurs de la plateforme
 * - Filtrage local immédiat pour performance optimale
 * - Combinaison possible compétence + localisation
 * - Préservation de l'état entre les recherches successives
 * 
 * Hooks personnalisés utilisés :
 * - useUserSearch : Logique de filtrage et recherche
 * - useAllUsers : Récupération de tous les utilisateurs
 * - useLocation : Gestion des paramètres de navigation
 * 
 * Interface utilisateur :
 * - SearchForm : Composant de saisie des critères
 * - ProfileCard : Affichage de chaque utilisateur trouvé
 * - Header/Footer : Navigation et cohérence de design
 * - Grille responsive pour optimiser l'affichage
 * 
 * Expérience utilisateur :
 * - Résultats instantanés lors de la recherche
 * - Feedback visuel pour les recherches sans résultats
 * - Navigation fluide vers les profils détaillés
 * - Possibilité de contact direct depuis les cartes
 * 
 * Utilisation dans l'application :
 * - Navigation depuis la page d'accueil après recherche
 * - Accès direct pour exploration libre des membres
 * - Point central pour découvrir de nouveaux partenaires
 * - Interface de matching pour échanges de compétences
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import Header from "@/components/Header";
import { ProfileCard } from "@/components/ProfileCard";
import SearchForm from "@/components/Forms/SearchForm";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import type { IUser } from "@/types/user";
import { useUserSearch } from "@/hooks/useUserSearch";
import { useAllUsers } from "@/hooks/useAllUsers";

export default function SearchPage() {
  const location = useLocation(); // Get navigation state and URL parameters
  const initialUsers = location.state?.filteredUsers || []; // Pre-filtered users from navigation
  const { users } = useAllUsers(); // Fetch all users for global search

  // Initialize search hook with initial users or all users
  const { filteredUsers, handleSearch } = useUserSearch(initialUsers);

  // Handle global search across all platform users
  function handleGlobalSearch({
    skill,
    zipcode,
  }: {
    skill: string;
    zipcode: string;
  }) {
    handleSearch({ skill, zipcode }, users); // Search with full user database
  }

  return (
    <>
      <Header />
      <section className="flex flex-col items-center min-h-screen bg-secondary text-white m-0 pt-5">
        <div className="text-center p-6 pb-2 font-semibold text-lg">
          “Des nouvelles compétences à portée de clics proches de chez vous.”
        </div>

        <div className="pb-6 w-full flex justify-center">
          <SearchForm
            className="w-full max-w-2xl"
            onSearch={handleGlobalSearch}
          />
        </div>

        <div className="bg-primary text-secondary border border-white rounded-xl shadow w-full max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {filteredUsers.length === 0 ? (
              <div className="col-span-full text-center text-secondary">
                Aucune compétence trouvée pour cette recherche.
              </div>
            ) : (
              filteredUsers.map((user: IUser) => (
                <ProfileCard key={user.id} user={user} />
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
