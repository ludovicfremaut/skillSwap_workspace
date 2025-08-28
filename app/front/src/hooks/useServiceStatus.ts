import { useState } from "react";
import { updateServiceStatus } from "@/services/service.service";
import type { IServiceStatus } from "@/types/service";

// Hook personnalisé pour gérer le statut d’un service
export function useServiceStatus(
  serviceId: string,
  initialStatus: IServiceStatus,
) {
  const [status, setStatus] = useState<IServiceStatus>(initialStatus);
  const [loading, setLoading] = useState(false);

  const changeStatus = async (newStatus: IServiceStatus) => {
    setLoading(true);
    // console.log(`🔄 Tentative de changement du statut du service ${serviceId} vers "${newStatus}"...`)

    try {
      const response = await updateServiceStatus(serviceId, newStatus);
      setStatus(newStatus);
      // console.log(`Statut mis à jour avec succès : nouveau statut : "${newStatus}"`)
      // console.log("Réponse de l'API :", response)
    } catch (error) {
      console.error("Échec de la mise à jour du statut :", error);
    } finally {
      setLoading(false);
      // console.log("Fin de la tentative de mise à jour du statut")
    }
  };

  return { status, loading, changeStatus };
}
