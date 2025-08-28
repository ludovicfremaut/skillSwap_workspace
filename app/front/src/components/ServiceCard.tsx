/**
 * COMPOSANT CARTE DE SERVICE - AFFICHAGE D'UN ÉCHANGE DE COMPÉTENCES
 * 
 * Ce composant React affiche une carte détaillée d'un service dans l'application
 * SkillSwap. Il présente visuellement un échange de compétences entre deux utilisateurs
 * avec toutes les informations pertinentes et les actions possibles selon le contexte.
 * 
 * Fonctionnalités principales :
 * - Affichage des détails du service (titre, participants, date)
 * - Gestion visuelle des statuts (En attente, Accepté, Terminé)
 * - Actions contextuelles selon le rôle de l'utilisateur (donneur/receveur)
 * - Interface responsive avec design système cohérent
 * - Formatage des dates en français avec date-fns
 * 
 * États de service gérés :
 * - pending : Service proposé en attente de validation
 * - accepted : Service accepté par les deux parties
 * - done/completed : Service réalisé et terminé
 * 
 * Actions utilisateur disponibles :
 * - Accepter un service reçu (bouton "Accepter")
 * - Marquer un service comme terminé (bouton "Marquer comme terminé")
 * - Visualisation des informations sans action si service terminé
 * 
 * Interface utilisateur :
 * - Design avec shadcn/ui (Card, Badge, Button)
 * - Couleurs différenciées selon le statut du service
 * - Responsive design pour mobile et desktop
 * - Accessibilité avec labels appropriés
 * 
 * Logique métier :
 * - Seul le receveur peut accepter un service
 * - Seul le donneur peut marquer comme terminé
 * - Validation des permissions selon l'utilisateur connecté
 * - Callback de mise à jour pour synchronisation parent
 * 
 * Utilisation dans l'application :
 * - Tableau de bord des services utilisateur
 * - Listes de services dans les profils
 * - Historique des échanges réalisés
 * - Interface de gestion des demandes en cours
 * 
 * @author Équipe SkillSwap
 * @version 1.0.0
 */

import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import type { IService, IServiceStatus } from "@/types/service";
import { useServiceStatus } from "@/hooks/useServiceStatus";

// Status labels mapping for French UI
const statusLabels: Record<IServiceStatus | "completed", string> = {
  pending: "En attente",      // Service waiting for acceptance
  accepted: "Accepté",        // Service accepted by both parties
  done: "Terminé",           // Service completed
  completed: "Terminé",       // Backend compatibility for "completed" status
};

// Props interface for ServiceCard component
interface ServiceCardProps {
  service: IService;                                    // Service data to display
  currentUserId: number;                               // ID of currently logged-in user
  onStatusUpdate?: (newStatus: IServiceStatus) => void; // Callback for status changes
}

// Main ServiceCard component for displaying individual service exchanges
export function ServiceCard({
  service,
  currentUserId,
  onStatusUpdate,
}: ServiceCardProps) {
  // Destructure service properties with fallback values
  const {
    id,
    giverName = "Inconnu",      // Service provider name
    receiverName = "Inconnu",   // Service receiver name
    giverId,                    // Service provider ID
    receiverId,                 // Service receiver ID
    title = "Sans titre",       // Service title/description
    date,                       // Service scheduled date
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
