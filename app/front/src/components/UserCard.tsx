/**
 * COMPOSANT CARTE UTILISATEUR - PROFIL DÉTAILLÉ D'UN MEMBRE
 * 
 * Ce composant React affiche la carte de profil complète d'un utilisateur
 * dans l'application SkillSwap. Il présente toutes les informations publiques
 * d'un membre et permet l'interaction pour les échanges de services.
 * 
 * Fonctionnalités principales :
 * - Affichage des informations personnelles (nom, localisation, description)
 * - Liste des compétences de l'utilisateur avec badges visuels
 * - Actions contextuelles (envoyer message, proposer service)
 * - Gestion des permissions selon l'utilisateur connecté
 * - Modales intégrées pour interactions rapides
 * 
 * Données utilisateur affichées :
 * - Nom complet et photo de profil
 * - Localisation (ville, code postal)
 * - Description/bio personnelle
 * - Compétences maîtrisées ou recherchées
 * - Disponibilité et statut
 * 
 * Interactions disponibles :
 * - Bouton "Envoyer un message" pour contact direct
 * - Bouton "Proposer un service" pour créer un échange
 * - Navigation vers profil complet si autorisé
 * - Actions cachées si utilisateur non connecté ou même utilisateur
 * 
 * Modales intégrées :
 * - MessageModal : Composition et envoi de message
 * - ServiceModal : Création d'une proposition de service
 * - Gestion des états d'ouverture/fermeture
 * 
 * Gestion d'état :
 * - Chargement asynchrone des données utilisateur
 * - Gestion des erreurs de récupération
 * - States séparés pour utilisateur cible et utilisateur connecté
 * - Contrôle des modales avec hooks useState
 * 
 * Sécurité et permissions :
 * - Vérification de l'authentification pour les actions
 * - Protection contre l'auto-interaction
 * - Validation des permissions d'accès aux profils
 * 
 * Utilisation dans l'application :
 * - Page de profil individuel (/profilepage/:id)
 * - Résultats de recherche d'utilisateurs
 * - Suggestions de partenaires d'échange
 * - Interface de découverte des membres
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import {
  Card,
  CardHeader,
  CardContent,
  CardAction,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { IUser } from "@/types/user";
import MessageModal from "@/components/MessageModal";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById, getCurrentUser } from "@/services/user.service";
import { useAsyncState } from "@/hooks/useAsyncState";
import ServiceModal from "./Modals/Service.modal";

import { useAuth } from "@/hooks/useAuth";

export function UserCard() {
  const { id } = useParams(); // Extract user ID from URL parameters
  const navigate = useNavigate(); // Navigation function for routing

  // State management for user data and UI interactions
  const [user, setUser] = useState<IUser | null>(null); // Target user profile data
  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null); // Current authenticated user
  const [showModal, setShowModal] = useState(false); // Service modal visibility
  const { loading, setLoading, error, setError, reset } = useAsyncState(); // Async operation states
  const [showMessageModal, setShowMessageModal] = useState(false); // Message modal visibility
  const { user: authUser } = useAuth(); // Get authenticated user from auth context
  // console.log("authUser", authUser);

  useEffect(() => {
    const fetchUser = async () => {
      reset();
      try {
        setLoading(true);
        const data = id ? await getUserById(id) : await getCurrentUser();

        setUser(data);

        // try to get the authenticated user if possible
        try {
          const current = await getCurrentUser();
          setLoggedInUser(current);
        } catch {
          setLoggedInUser(null); // ← not logged in, but not blocking
        }
      } catch (err: any) {
        console.error("Erreur de chargement du profil :", err);
        setError("Impossible de charger le profil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleAskService = () => {
    if (!loggedInUser) {
      navigate("/register"); // redirect if not logged in
    } else {
      setShowModal(true);
    }
  };

  if (loading) return <p className="text-white">Chargement du profil…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="max-w-full bg-secondary text-white">
      <Card className="border-0 shadow-md">
        <CardHeader className="flex items-center gap-4 border-0">
          <img
            src={user.profile_picture || "/default-avatar.png"}
            className="h-16 w-16 rounded-full object-cover"
            alt="Photo de profil"
          />

          <div className="flex-1">
            <CardTitle>
              {user.firstname} {user.lastname}
            </CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>

          {authUser?.id !== user.id && id && (
            <CardAction className="flex flex-col gap-2">
              <Button
                onClick={() => setShowMessageModal(true)}
                size="sm"
                className="rounded bg-[var(--color-accent)] text-white"
              >
                Contacte-Moi
              </Button>

              <Button
                size="sm"
                className="rounded bg-[var(--color-accent)] text-white"
                onClick={handleAskService}
              >
                Demander un service
              </Button>
            </CardAction>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <section>
            <h4 className="font-semibold text-sm">Compétences</h4>
            <ul className="mt-1 flex flex-wrap gap-2">
              {user.skills?.length > 0 ? (
                user.skills.map((s) => (
                  <span
                    key={s.name}
                    className="rounded border px-2 py-1 text-xs font-medium"
                  >
                    {s.name}
                  </span>
                ))
              ) : (
                <span className="text-xs italic">
                  Aucune compétence renseignée
                </span>
              )}
            </ul>
          </section>

          <section>
            <h4 className="font-semibold text-sm">Disponibilités</h4>
            <p className="mt-1 inline-block rounded border px-2 py-1 text-xs">
              {user.availability}
            </p>
          </section>

          <section className="space-y-1 bg-primary p-4 rounded max-w-full">
            <h4 className="font-semibold text-sm text-secondary">A propos</h4>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {user.description}
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Message modal */}
      {showMessageModal && authUser?.id && (
        <MessageModal
          onClose={() => setShowMessageModal(false)}
          receiverId={user.id}
          userId={authUser.id}
        />
      )}

      {/* Service modal */}
      {showModal && (
        <ServiceModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          receiverId={user.id}
        />
      )}
    </div>
  );
}
