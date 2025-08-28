import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import type { IService, IServiceStatus } from "@/types/service";
import { useServiceStatus } from "@/hooks/useServiceStatus";


const statusLabels: Record<IServiceStatus | "completed", string> = {
  pending: "En attente",
  accepted: "Accepté",
  done: "Terminé",
  completed: "Terminé", // Pour gérer le cas où le back retourne "completed"
};

// Composant d'affichage d'un service individuel (titre, donneur, receveur, date, statut, actions)
interface ServiceCardProps {
  service: IService;
  currentUserId: number;
  onStatusUpdate?: (newStatus: IServiceStatus) => void;
}

export function ServiceCard({
  service,
  currentUserId,
  onStatusUpdate,
}: ServiceCardProps) {
  // Destructuration des propriétés du service
  const {
    id,
    giverName = "Inconnu",
    receiverName = "Inconnu",
    giverId,
    receiverId,
    title = "Sans titre",
    date,
  } = service;

  // Hook custom pour gérer localement le statut du service
  const { status, loading, changeStatus } = useServiceStatus(
    id,
    service.status
  );

  // On identifie le rôle de l'utilisateur connecté
  const isGiver = currentUserId === giverId;
  const isReceiver = currentUserId === receiverId;

  // Attribution de style différent selon le statut
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "done":
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Quand l'utilisateur clique sur un bouton d'action
  const handleStatusChange = (newStatus: IServiceStatus) => {
    changeStatus(newStatus); // MAJ via API
    console.log(
      `Tentative de mise à jour du service ID ${id} vers le statut : "${newStatus}"`
    );
    onStatusUpdate?.(newStatus); // Callback pour actualiser en parent si besoin
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-blue-300">
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Badge className={getBadgeStyle(status)}>
            {statusLabels[status] || "Inconnu"}
          </Badge>
        </div>

        <div className="text-sm text-gray-600">
          Donneur : <strong>{giverName}</strong>
        </div>
        <div className="text-sm text-gray-600">
          Receveur : <strong>{receiverName}</strong>
        </div>
        <div className="text-xs text-muted-foreground">
          Créé le :{" "}
          {date && !isNaN(new Date(date).getTime())
            ? format(new Date(date), "dd MMMM yyyy à HH:mm", { locale: fr })
            : "Date inconnue"}
        </div>

        {/* Si l'utilisateur est le receveur et que le service est en attente, il peut l'accepter */}
        {status === "pending" && isReceiver && (
          <Button
            onClick={() => handleStatusChange("accepted")}
            disabled={loading}
            className="mt-2"
          >
            Accepter le service
          </Button>
        )}

        {/* Si l'utilisateur est le receveur et que le service est accepté, il peut le terminer */}
        {status === "accepted" && isReceiver && (
          <Button
            onClick={() => handleStatusChange("done")}
            disabled={loading}
            className="mt-2 bg-green-600 hover:bg-green-700"
          >
            Marquer comme terminé
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
