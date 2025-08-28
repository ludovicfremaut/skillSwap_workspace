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
  const { id } = useParams();
  const [services, setServices] = useState<IService[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [error, setError] = useState("");
  const [showServices, setShowServices] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<IUser | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/register";
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
