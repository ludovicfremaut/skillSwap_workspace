import type { IUser } from "@/types/user";
import { getLastUsers } from "@/services/user.service";
import { useAsyncState } from "@/hooks/useAsyncState";
import { useEffect, useState } from "react";

export default function ProfileBubble() {
  const [users, setUsers] = useState<IUser[]>([]);
  const { loading, setLoading, error, setError, reset } = useAsyncState();

  useEffect(() => {
    const fetchUsers = async () => {
      reset();
      try {
        setLoading(true);
        const data = await getLastUsers();
        setUsers(data);
      } catch (err: any) {
        setError("Impossible de charger les profils.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-white">Chargement du profil…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!users) return null;

  return (
    <div className="flex flex-wrap pt-8 justify-center items-center gap-5 pl-2 pr-2">
      {users
        // Solution pour pas afficher tant qu il n y a pas de photo
        // .filter((user) => !!user.profile_picture)
        .map((user) => (
          <div key={user.id} className="flex flex-col items-center">
            <img
              src={user.profile_picture}
              alt={user.firstname}
              className="w-30 h-30 rounded-full object-cover mb-2"
            />
            <div className="text-secondary font-semibold text-center">
              {user.firstname} {user.lastname}
            </div>
          </div>
        ))}
    </div>
  );
}
