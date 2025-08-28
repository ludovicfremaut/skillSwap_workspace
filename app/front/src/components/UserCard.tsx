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
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { loading, setLoading, error, setError, reset } = useAsyncState();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const { user: authUser } = useAuth(); // get authenticated user
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
