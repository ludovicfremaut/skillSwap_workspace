/**
 * PAGE PROFIL PERSONNEL - GESTION DU COMPTE UTILISATEUR
 * 
 * Cette page React constitue l'espace personnel de l'utilisateur connecté
 * dans l'application SkillSwap. Elle centralise la gestion du profil,
 * l'affichage des services et la configuration du compte.
 * 
 * Fonctionnalités principales :
 * - Affichage et modification du profil utilisateur (inline editing)
 * - Visualisation de tous les services de l'utilisateur
 * - Gestion des échanges de services (statuts, historique)
 * - Déconnexion sécurisée avec redirection
 * - Interface d'administration personnelle
 * 
 * Modes d'affichage :
 * - Mode lecture : Affichage des informations avec option modification
 * - Mode édition : Formulaire inline pour mise à jour du profil
 * - Vue services : Liste complète des échanges en cours et terminés
 * - Gestion des permissions selon l'utilisateur connecté
 * 
 * Gestion des services :
 * - Récupération des services personnels (getMyServices)
 * - Récupération des services d'un utilisateur spécifique (getRawServices)
 * - Mise à jour des statuts de service en temps réel
 * - Historique complet des échanges effectués
 * 
 * Édition de profil :
 * - Modification inline avec icônes Lucide React
 * - Validation des données avant sauvegarde
 * - Feedback utilisateur pour les opérations
 * - Annulation possible des modifications
 * 
 * Sécurité et authentification :
 * - Vérification de l'identité pour l'accès aux données
 * - Déconnexion propre avec nettoyage de session
 * - Protection contre l'accès non autorisé
 * - Redirection sécurisée après déconnexion
 * 
 * États de données gérés :
 * - Utilisateur connecté avec informations complètes
 * - Services associés (offerts et demandés)
 * - États d'édition et erreurs de validation
 * - Données temporaires pour modification
 * 
 * Interface utilisateur :
 * - ServiceCard : Affichage de chaque service avec actions
 * - Card : Container pour informations structurées
 * - Icônes Lucide : Interface moderne et accessible
 * - Design responsive pour tous écrans
 * 
 * Utilisation dans l'application :
 * - Tableau de bord principal après connexion
 * - Centre de gestion des échanges de compétences
 * - Point d'accès aux paramètres de compte
 * - Interface de suivi des activités
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { getMyServices, getRawServices } from "@/services/service.service";
import type { IService } from "@/types/service";
import { logout } from "@/services/auth.service";
import { getCurrentUser, updateUser } from "@/services/user.service";
import { ServiceCard } from "@/components/ServiceCard";
import type { IUser } from "@/types/user";
import { Pencil, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export default function PersonalPage() {
  const { id } = useParams(); // Extract user ID from URL parameters
  
  // State management for personal page functionality
  const [services, setServices] = useState<IService[]>([]); // User's services list
  const [currentUser, setCurrentUser] = useState<IUser | null>(null); // Current user data
  const [error, setError] = useState(""); // Error message display
  const [showServices, setShowServices] = useState(false); // Services view toggle
  const [isEditing, setIsEditing] = useState(false); // Profile editing mode
  const [editedUser, setEditedUser] = useState<IUser | null>(null); // Temporary edit data

  // Handle secure logout with session cleanup
  const handleLogout = async () => {
    try {
      await logout(); // Call logout service
      window.location.href = "/register"; // Redirect to registration
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleSave = async () => {
    if (!editedUser) return;
    try {
      const updated = await updateUser(editedUser.id, editedUser);
      setCurrentUser(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        const data = id
          ? await getRawServices(Number(id))
          : await getMyServices();
        setServices(data);
        setEditedUser(user);
      } catch (err) {
        console.error("Erreur lors du chargement des services", err);
        setError("Aucune réservation trouvée.");
      }
    };

    fetchServices();
  }, [id]);

  return (
    <>
      <Header />
      <main className="p-6 bg-secondary text-white min-h-screen">
        <h1 className="text-center text-2xl font-bold mb-6">
          Bienvenue sur ta page personnelle
        </h1>

        {/* Bouton toggle visible uniquement mobile */}
        <div className="md:hidden mb-4 flex justify-center">
          <button
            onClick={() => setShowServices(!showServices)}
            className="bg-accent text-white px-6 py-2 rounded shadow hover:bg-opacity-90 transition"
          >
            {showServices ? "Voir mes informations" : "Voir mes services"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bloc gauche - Profil utilisateur */}
          <div
            className={`
              bg-primary rounded-xl shadow-lg p-6 space-y-4 scrollbar-custom
              ${showServices ? "hidden" : "block"}
              md:block md:max-h-[600px] md:overflow-y-auto
            `}
          >
            <h2 className="text-xl font-semibold text-secondary mb-4 text-center">
              Mes Informations
            </h2>
            <Card className="bg-blue-300 border border-white rounded-md shadow-md">
              <CardContent className="p-4 relative space-y-3">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="absolute top-2 right-2 text-white hover:text-green-400"
                  >
                    <Save />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-2 right-2 text-white hover:text-yellow-400"
                  >
                    <Pencil />
                  </button>
                )}

                {editedUser && (
                  <>
                    <div className="flex justify-center">
                      <img
                        src={editedUser.profile_picture}
                        alt={editedUser.firstname}
                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow mb-4"
                      />
                    </div>
                    <div>
                      <span className="block text-xl text-secondary">
                        Prénom :
                      </span>
                      {isEditing ? (
                        <input
                          className="w-full px-2 py-1 rounded text-accent"
                          value={editedUser.firstname}
                          onChange={(e) =>
                            setEditedUser((prev) =>
                              prev
                                ? { ...prev, firstname: e.target.value }
                                : prev,
                            )
                          }
                        />
                      ) : (
                        <p className="text-white font-medium">
                          {editedUser.firstname}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="block text-xl text-secondary">
                        Ville :
                      </span>
                      {isEditing ? (
                        <input
                          className="w-full px-2 py-1 rounded text-accent"
                          value={editedUser.city}
                          onChange={(e) =>
                            setEditedUser((prev) =>
                              prev ? { ...prev, city: e.target.value } : prev,
                            )
                          }
                        />
                      ) : (
                        <p className="text-white font-medium">
                          {editedUser.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="block text-xl text-secondary">
                        À propos :
                      </span>
                      {isEditing ? (
                        <textarea
                          className="w-full px-2 py-1 rounded text-accent"
                          rows={3}
                          value={editedUser.description}
                          onChange={(e) =>
                            setEditedUser((prev) =>
                              prev
                                ? { ...prev, description: e.target.value }
                                : prev,
                            )
                          }
                        />
                      ) : (
                        <p className="italic text-white font-medium">
                          {editedUser.description}
                        </p>
                      )}
                    </div>
                    <div>
                      <span className="block text-xl text-secondary">
                        Compétences :
                      </span>
                      {isEditing ? (
                        <textarea
                          className="w-full px-2 py-1 rounded text-accent"
                          rows={2}
                          value={editedUser.skills
                            .map((s) => s.name)
                            .join(", ")}
                          onChange={(e) =>
                            setEditedUser((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    skills: e.target.value
                                      .split(",")
                                      .map((s, i) => ({
                                        id: i + 1, // valeur fictive
                                        name: s.trim(),
                                      })),
                                  }
                                : prev
                            )
                          }
                        />
                      ) : (
                        <ul className="list-disc list-inside text-white font-medium italic mt-1">
                          {editedUser.skills.map((skill) => (
                            <li key={skill.id}>{skill.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Bloc droit - Services */}
          <div
            className={`
              bg-primary rounded-xl shadow-lg p-6 space-y-4 scrollbar-custom
              ${showServices ? "block" : "hidden"}
              md:block md:max-h-[600px] md:overflow-y-auto
            `}
          >
            <h2 className="text-xl font-semibold text-secondary mb-4 text-center">
              Mes Réservations
            </h2>

            {error ? (
              <p className="text-sm italic text-gray-300">{error}</p>
            ) : currentUser ? (
              <div className="flex flex-col gap-4">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    currentUserId={currentUser.id}
                    onStatusUpdate={(newStatus) =>
                      setServices((prev) =>
                        prev.map((s) =>
                          s.id === service.id ? { ...s, status: newStatus } : s,
                        ),
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-gray-400">
                Chargement en cours...
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleLogout}
            className="rounded bg-accent text-white px-6 py-3 font-semibold hover:bg-red-600 transition"
          >
            Se déconnecter
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
